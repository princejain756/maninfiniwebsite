const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const natural = require('natural');
const fs = require('fs-extra');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(compression());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173', 'https://maninfini.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Initialize NLP components
const tokenizer = new natural.WordTokenizer();
let classifier = new natural.BayesClassifier();
const tfidf = new natural.TfIdf();

// Knowledge base storage
const KNOWLEDGE_BASE_PATH = path.join(__dirname, 'data', 'knowledge-base.json');
const TRAINING_DATA_PATH = path.join(__dirname, 'data', 'training-data.json');

// Ensure data directory exists
fs.ensureDirSync(path.join(__dirname, 'data'));

// Load or initialize knowledge base
let knowledgeBase = {
  intents: {},
  responses: {},
  lastUpdated: new Date().toISOString(),
  websiteContent: {},
  faqs: [],
  services: []
};

// Load existing knowledge base if it exists
async function loadKnowledgeBase() {
  try {
    if (await fs.pathExists(KNOWLEDGE_BASE_PATH)) {
      knowledgeBase = await fs.readJson(KNOWLEDGE_BASE_PATH);
      console.log('✅ Knowledge base loaded successfully');
    } else {
      await fs.writeJson(KNOWLEDGE_BASE_PATH, knowledgeBase);
      console.log('✅ New knowledge base created');
    }
  } catch (error) {
    console.error('❌ Error loading knowledge base:', error);
  }
}

// Save knowledge base
async function saveKnowledgeBase() {
  try {
    knowledgeBase.lastUpdated = new Date().toISOString();
    await fs.writeJson(KNOWLEDGE_BASE_PATH, knowledgeBase, { spaces: 2 });
    console.log('✅ Knowledge base saved');
  } catch (error) {
    console.error('❌ Error saving knowledge base:', error);
  }
}

// Train the classifier with current knowledge
function trainClassifier() {
  // Create a new classifier instance instead of clearing
  classifier = new natural.BayesClassifier();
  
  // Add basic intents
  classifier.addDocument('hello hi hey greetings', 'greeting');
  classifier.addDocument('bye goodbye see you later', 'goodbye');
  classifier.addDocument('thanks thank you', 'thanks');
  classifier.addDocument('help support assistance', 'help');
  
  // Add service-related intents
  classifier.addDocument('automation rpa process automation', 'automation');
  classifier.addDocument('web development website design', 'web_development');
  classifier.addDocument('graphic design logo brand', 'graphic_design');
  classifier.addDocument('whatsapp integration bot', 'whatsapp');
  classifier.addDocument('ecommerce inventory management', 'ecommerce');
  classifier.addDocument('pricing cost rates fees', 'pricing');
  classifier.addDocument('contact reach get in touch', 'contact');
  classifier.addDocument('portfolio work examples', 'portfolio');
  classifier.addDocument('team about us who are you', 'team');
  classifier.addDocument('technologies tech stack tools', 'technologies');
  
  // Add custom intents from knowledge base
  Object.keys(knowledgeBase.intents).forEach(intent => {
    knowledgeBase.intents[intent].examples.forEach(example => {
      classifier.addDocument(example, intent);
    });
  });
  
  classifier.train();
  console.log('✅ Classifier trained successfully');
}

// Generate response based on intent and context
function generateResponse(intent, userMessage) {
  const responses = knowledgeBase.responses[intent] || [];
  
  if (responses.length === 0) {
    // Fallback responses
    const fallbacks = {
      greeting: ['Hello! How can I help you today?', 'Hi there! Welcome to Maninfini. How can I assist you?'],
      goodbye: ['Goodbye! Feel free to reach out if you need anything else.', 'See you later! Have a great day.'],
      thanks: ['You\'re welcome!', 'Glad I could help!'],
      help: ['I can help you with information about our services, pricing, portfolio, and more. What would you like to know?'],
      automation: ['We specialize in business process automation and RPA solutions. Our automation services help businesses streamline operations and reduce manual work.'],
      web_development: ['We offer custom web development services including e-commerce platforms, responsive websites, and web applications.'],
      graphic_design: ['Our graphic design services include logo design, brand identity, marketing materials, and creative design solutions.'],
      whatsapp: ['We provide WhatsApp Business API integration and chatbot development services.'],
      ecommerce: ['We build complete e-commerce solutions with inventory management, payment gateways, and multi-channel selling.'],
      pricing: ['Our pricing varies based on project requirements. Please contact us for a detailed quote tailored to your needs.'],
      contact: ['You can reach us via WhatsApp, email, or through our contact form on the website.'],
      portfolio: ['You can view our portfolio and case studies on our website. We have worked with various industries and clients.'],
      team: ['Our team consists of experienced developers, designers, and automation specialists dedicated to delivering quality solutions.'],
      technologies: ['We use modern technologies including React, Node.js, Python, and various automation tools depending on project requirements.']
    };
    
    return fallbacks[intent] ? fallbacks[intent][Math.floor(Math.random() * fallbacks[intent].length)] : 
           'I\'m not sure about that. Could you please rephrase your question or ask about our services, pricing, or contact information?';
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }
    
    // Classify the intent
    const intent = classifier.classify(message.toLowerCase());
    
    // Generate response
    const response = generateResponse(intent, message);
    
    // Log the interaction for learning
    await logInteraction(message, intent, response);
    
    res.json({
      response,
      intent,
      confidence: classifier.getClassifications(message.toLowerCase())[0]?.value || 0,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      response: 'Sorry, I encountered an error. Please try again.',
      error: 'Internal server error'
    });
  }
});

// Log interactions for learning
async function logInteraction(message, intent, response) {
  try {
    const logEntry = {
      message,
      intent,
      response,
      timestamp: new Date().toISOString()
    };
    
    const logPath = path.join(__dirname, 'data', 'interactions.json');
    let interactions = [];
    
    if (await fs.pathExists(logPath)) {
      interactions = await fs.readJson(logPath);
    }
    
    interactions.push(logEntry);
    
    // Keep only last 1000 interactions to manage memory
    if (interactions.length > 1000) {
      interactions = interactions.slice(-1000);
    }
    
    await fs.writeJson(logPath, interactions, { spaces: 2 });
  } catch (error) {
    console.error('Error logging interaction:', error);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    knowledgeBaseSize: Object.keys(knowledgeBase.intents).length,
    lastUpdated: knowledgeBase.lastUpdated
  });
});

// Get knowledge base stats
app.get('/api/stats', (req, res) => {
  res.json({
    intents: Object.keys(knowledgeBase.intents).length,
    responses: Object.keys(knowledgeBase.responses).length,
    faqs: knowledgeBase.faqs.length,
    services: knowledgeBase.services.length,
    lastUpdated: knowledgeBase.lastUpdated
  });
});

// Auto-learning endpoint (called by scraper)
app.post('/api/learn', async (req, res) => {
  try {
    const { content, type } = req.body;
    
    if (!content || !type) {
      return res.status(400).json({ error: 'Missing content or type' });
    }
    
    // Process new content based on type
    switch (type) {
      case 'faq':
        knowledgeBase.faqs.push(...content);
        break;
      case 'service':
        knowledgeBase.services.push(...content);
        break;
      case 'intent':
        Object.assign(knowledgeBase.intents, content);
        break;
      case 'response':
        Object.assign(knowledgeBase.responses, content);
        break;
      default:
        return res.status(400).json({ error: 'Invalid content type' });
    }
    
    // Retrain classifier with new data
    trainClassifier();
    
    // Save updated knowledge base
    await saveKnowledgeBase();
    
    res.json({ 
      success: true, 
      message: `Learned ${type} content successfully`,
      stats: {
        intents: Object.keys(knowledgeBase.intents).length,
        responses: Object.keys(knowledgeBase.responses).length,
        faqs: knowledgeBase.faqs.length,
        services: knowledgeBase.services.length
      }
    });
    
  } catch (error) {
    console.error('Learning error:', error);
    res.status(500).json({ error: 'Learning failed' });
  }
});

// Manual scraping trigger endpoint
app.post('/api/scrape', async (req, res) => {
  try {
    console.log('🔄 Manual scraping triggered via API');
    
    // Import and run the scraper
    const { scrapeWebsite } = require('./scraper.js');
    await scrapeWebsite();
    
    res.json({ 
      success: true, 
      message: 'Manual scraping completed successfully',
      stats: {
        intents: Object.keys(knowledgeBase.intents).length,
        responses: Object.keys(knowledgeBase.responses).length,
        faqs: knowledgeBase.faqs.length,
        services: knowledgeBase.services.length
      }
    });
    
  } catch (error) {
    console.error('Manual scraping error:', error);
    res.status(500).json({ error: 'Manual scraping failed' });
  }
});

// Schedule automatic retraining (every 6 hours)
cron.schedule('0 */6 * * *', async () => {
  console.log('🔄 Scheduled retraining started');
  trainClassifier();
  await saveKnowledgeBase();
  console.log('✅ Scheduled retraining completed');
});

// Initialize and start server
async function startServer() {
  await loadKnowledgeBase();
  trainClassifier();
  
  app.listen(PORT, () => {
    console.log(`🚀 Lightweight chatbot server running on port ${PORT}`);
    console.log(`📊 Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
    console.log(`🧠 Knowledge base: ${Object.keys(knowledgeBase.intents).length} intents`);
  });
}

startServer().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down gracefully...');
  await saveKnowledgeBase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Shutting down gracefully...');
  await saveKnowledgeBase();
  process.exit(0);
}); 