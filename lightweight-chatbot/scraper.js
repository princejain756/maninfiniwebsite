const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const cron = require('node-cron');

// Configuration
const WEBSITE_URL = 'https://maninfini.com'; // Update with your actual domain
const CHATBOT_API_URL = 'http://localhost:3001/api/learn';
const SCRAPING_INTERVAL = process.env.NODE_ENV === 'development' ? '*/30 * * * *' : '0 */12 * * *'; // Every 30 minutes in dev, 12 hours in production

// Content extraction patterns
const PATTERNS = {
  faqs: {
    selectors: [
      '[data-faq]',
      '.faq-item',
      '.faq',
      '[class*="faq"]',
      '[class*="FAQ"]'
    ],
    questionSelectors: ['h3', 'h4', '.question', '.faq-question'],
    answerSelectors: ['p', '.answer', '.faq-answer', 'div']
  },
  services: {
    selectors: [
      '[data-service]',
      '.service-item',
      '.service',
      '[class*="service"]',
      'section[id*="service"]'
    ],
    titleSelectors: ['h2', 'h3', '.service-title', '.title'],
    descriptionSelectors: ['p', '.description', '.service-desc']
  },
  content: {
    selectors: [
      'main',
      'article',
      '.content',
      '.main-content',
      'section'
    ]
  }
};

// Extract FAQs from HTML
function extractFAQs($, url) {
  const faqs = [];
  
  PATTERNS.faqs.selectors.forEach(selector => {
    $(selector).each((i, element) => {
      const $element = $(element);
      let question = '';
      let answer = '';
      
      // Try to find question
      PATTERNS.faqs.questionSelectors.forEach(qSelector => {
        const $question = $element.find(qSelector).first();
        if ($question.length && !question) {
          question = $question.text().trim();
        }
      });
      
      // Try to find answer
      PATTERNS.faqs.answerSelectors.forEach(aSelector => {
        const $answer = $element.find(aSelector).first();
        if ($answer.length && !answer) {
          answer = $answer.text().trim();
        }
      });
      
      // If no structured FAQ found, try to extract from any text
      if (!question && !answer) {
        const text = $element.text().trim();
        if (text.length > 50 && text.length < 500) {
          // Try to split by common question indicators
          const lines = text.split('\n').filter(line => line.trim());
          if (lines.length >= 2) {
            question = lines[0].trim();
            answer = lines.slice(1).join(' ').trim();
          }
        }
      }
      
      if (question && answer && question.length > 10 && answer.length > 20) {
        faqs.push({
          question: question.replace(/\s+/g, ' '),
          answer: answer.replace(/\s+/g, ' '),
          source: url,
          extractedAt: new Date().toISOString()
        });
      }
    });
  });
  
  return faqs;
}

// Extract services from HTML
function extractServices($, url) {
  const services = [];
  
  PATTERNS.services.selectors.forEach(selector => {
    $(selector).each((i, element) => {
      const $element = $(element);
      let title = '';
      let description = '';
      
      // Try to find title
      PATTERNS.services.titleSelectors.forEach(tSelector => {
        const $title = $element.find(tSelector).first();
        if ($title.length && !title) {
          title = $title.text().trim();
        }
      });
      
      // Try to find description
      PATTERNS.services.descriptionSelectors.forEach(dSelector => {
        const $desc = $element.find(dSelector).first();
        if ($desc.length && !description) {
          description = $desc.text().trim();
        }
      });
      
      if (title && description && title.length > 5 && description.length > 20) {
        services.push({
          title: title.replace(/\s+/g, ' '),
          description: description.replace(/\s+/g, ' '),
          source: url,
          extractedAt: new Date().toISOString()
        });
      }
    });
  });
  
  return services;
}

// Extract general content for intent learning
function extractContent($, url) {
  const content = [];
  
  PATTERNS.content.selectors.forEach(selector => {
    $(selector).each((i, element) => {
      const $element = $(element);
      const text = $element.text().trim();
      
      if (text.length > 100 && text.length < 2000) {
        content.push({
          text: text.replace(/\s+/g, ' '),
          source: url,
          extractedAt: new Date().toISOString()
        });
      }
    });
  });
  
  return content;
}

// Scrape a single page
async function scrapePage(url) {
  try {
    console.log(`🔍 Scraping: ${url}`);
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ManinfiniBot/1.0)'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract different types of content
    const faqs = extractFAQs($, url);
    const services = extractServices($, url);
    const content = extractContent($, url);
    
    console.log(`✅ Extracted from ${url}: ${faqs.length} FAQs, ${services.length} services, ${content.length} content blocks`);
    
    return { faqs, services, content };
    
  } catch (error) {
    console.error(`❌ Error scraping ${url}:`, error.message);
    return { faqs: [], services: [], content: [] };
  }
}

// Generate intents from extracted content
function generateIntents(faqs, services, content) {
  const intents = {};
  
  // Generate intents from FAQs
  faqs.forEach((faq, index) => {
    const intentName = `faq_${index}`;
    intents[intentName] = {
      examples: [
        faq.question.toLowerCase(),
        faq.question.toLowerCase().replace(/\?/g, ''),
        faq.question.toLowerCase().replace(/what|how|when|where|why/gi, '').trim()
      ].filter(example => example.length > 5),
      responses: [faq.answer]
    };
  });
  
  // Generate intents from services
  services.forEach((service, index) => {
    const intentName = `service_${service.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const keywords = service.title.toLowerCase().split(' ').filter(word => word.length > 2);
    
    intents[intentName] = {
      examples: [
        service.title.toLowerCase(),
        `tell me about ${service.title.toLowerCase()}`,
        `what is ${service.title.toLowerCase()}`,
        `information about ${service.title.toLowerCase()}`,
        ...keywords.map(keyword => `about ${keyword}`)
      ],
      responses: [service.description]
    };
  });
  
  return intents;
}

// Send learned content to chatbot
async function sendToChatbot(content, type) {
  try {
    const response = await axios.post(CHATBOT_API_URL, {
      content,
      type
    }, {
      timeout: 5000
    });
    
    console.log(`✅ Sent ${type} to chatbot:`, response.data);
    return response.data;
    
  } catch (error) {
    console.error(`❌ Error sending ${type} to chatbot:`, error.message);
    return null;
  }
}

// Main scraping function
async function scrapeWebsite() {
  console.log('🚀 Starting website scraping...');
  
  const pages = [
    '/',
    '/services',
    '/about',
    '/contact',
    '/portfolio',
    '/blog'
  ];
  
  let allFaqs = [];
  let allServices = [];
  let allContent = [];
  
  // Scrape each page
  for (const page of pages) {
    const url = `${WEBSITE_URL}${page}`;
    const result = await scrapePage(url);
    
    allFaqs.push(...result.faqs);
    allServices.push(...result.services);
    allContent.push(...result.content);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Remove duplicates
  allFaqs = removeDuplicates(allFaqs, 'question');
  allServices = removeDuplicates(allServices, 'title');
  allContent = removeDuplicates(allContent, 'text');
  
  console.log(`📊 Total extracted: ${allFaqs.length} FAQs, ${allServices.length} services, ${allContent.length} content blocks`);
  
  // Generate intents from content
  const intents = generateIntents(allFaqs, allServices, allContent);
  
  // Send to chatbot
  if (allFaqs.length > 0) {
    await sendToChatbot(allFaqs, 'faq');
  }
  
  if (allServices.length > 0) {
    await sendToChatbot(allServices, 'service');
  }
  
  if (Object.keys(intents).length > 0) {
    await sendToChatbot(intents, 'intent');
  }
  
  // Save scraped data for reference
  const dataPath = path.join(__dirname, 'data', 'scraped-content.json');
  await fs.writeJson(dataPath, {
    faqs: allFaqs,
    services: allServices,
    content: allContent,
    intents,
    lastScraped: new Date().toISOString()
  }, { spaces: 2 });
  
  console.log('✅ Scraping completed successfully');
}

// Remove duplicates from array based on key
function removeDuplicates(array, key) {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key].toLowerCase().trim();
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// Manual scraping function
async function manualScrape() {
  console.log('🔧 Manual scraping triggered');
  await scrapeWebsite();
}

// Schedule automatic scraping
cron.schedule(SCRAPING_INTERVAL, async () => {
  console.log('🔄 Scheduled scraping started');
  await scrapeWebsite();
  console.log('✅ Scheduled scraping completed');
});

// Handle command line arguments
if (process.argv.includes('--manual')) {
  manualScrape().then(() => {
    console.log('✅ Manual scraping completed');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Manual scraping failed:', error);
    process.exit(1);
  });
} else {
  console.log('🤖 Content scraper initialized');
  console.log(`⏰ Scheduled to run every 12 hours`);
  console.log(`🌐 Target website: ${WEBSITE_URL}`);
  console.log(`🤖 Chatbot API: ${CHATBOT_API_URL}`);
  
  // Run initial scrape
  manualScrape().catch(console.error);
}

// Export for testing
module.exports = {
  scrapeWebsite,
  extractFAQs,
  extractServices,
  extractContent,
  generateIntents
}; 