import { websiteCrawler } from './websiteCrawler';

export interface GeminiMessage {
  text: string;
  sender: string;
  metadata?: Record<string, any>;
}

export interface GeminiResponse {
  recipient_id: string;
  text: string;
  buttons?: Array<{
    title: string;
    payload: string;
  }>;
  image?: string;
  attachment?: {
    type: string;
    payload: {
      template_type: string;
      elements: Array<{
        title: string;
        subtitle: string;
        image_url?: string;
        buttons?: Array<{
          type: string;
          title: string;
          payload: string;
        }>;
      }>;
    };
  };
  custom?: Record<string, any>;
}

export interface GeminiWebhookPayload {
  sender: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface GeminiWebhookResponse {
  responses: GeminiResponse[];
  session_id?: string;
}

class GeminiApiService {
  private apiKey: string;
  private baseUrl: string;
  private sessionId: string;
  private conversationHistory: GeminiMessage[] = [];
  private userPreferences: Record<string, any> = {};

  constructor() {
    // Get API key from environment variables
    let apiKey = '';
    
    // Try Vite's import.meta.env first (for Vite projects)
    if (import.meta.env?.VITE_GEMINI_API_KEY) {
      apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    }
    // Fallback to process.env (for Create React App)
    else if (typeof process !== 'undefined' && process.env?.REACT_APP_GEMINI_API_KEY) {
      apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    }
    // Try direct environment variable
    else if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
      apiKey = process.env.GEMINI_API_KEY;
    }
    
    this.apiKey = apiKey;
    // DEBUG: Check if API key is loaded
    console.log('[GeminiApi] API key loaded:', !!apiKey, 'Length:', apiKey?.length || 0);
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async makeGeminiRequest(prompt: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Gemini API request failed:', error);
      // Check if it's a network error (CSP blocking)
      if (error instanceof TypeError && error.message.includes('NetworkError')) {
        console.warn('Gemini API blocked by CSP, using fallback mode');
        throw new Error('CSP_BLOCKED');
      }
      throw error;
    }
  }

  private async buildContextualPrompt(message: string): Promise<string> {
    // Get comprehensive website content for context
    const websiteContext = await websiteCrawler.getWebsiteContext();
    
    const companyContext = `
You are Manu, an AI assistant for Maninfini Automation, a comprehensive digital solutions company.

COMPLETE WEBSITE CONTEXT:
${websiteContext}

RESPONSE FORMATTING GUIDELINES:
1. Use emojis appropriately to make responses visually appealing
2. Format responses with clear sections using line breaks
3. Use bullet points (•) for lists
4. Keep responses concise but informative
5. Always end with a relevant question to continue the conversation
6. When mentioning services, be specific about what we offer
7. Include contact information when relevant: +91 97412 66370 or mitesh@maninfini.com

IMPORTANT INSTRUCTIONS:
1. You have access to ALL the above website content and should use it to provide accurate, detailed responses
2. Always provide specific information based on the website content when available
3. If asked about services, pricing, features, or company information, refer to the detailed content above
4. Provide helpful, accurate information about Maninfini's services, products, and capabilities
5. Help users understand how our solutions can benefit their business
6. Be professional, friendly, and knowledgeable about all our services
7. If asked about specific technical details, refer to the relevant service descriptions above
8. Always encourage users to contact us for detailed consultations and custom quotes
9. Use the website content to answer questions about team members, company history, and achievements
10. Format responses beautifully with emojis, bullet points, and clear structure

Previous conversation context:
${this.conversationHistory.slice(-5).map(msg => `${msg.sender}: ${msg.text}`).join('\n')}

User preferences: ${JSON.stringify(this.userPreferences)}

Current user message: ${message}

Please provide a helpful, well-formatted, contextual response based on the comprehensive website information above. Use emojis, bullet points, and clear formatting. Be specific and detailed when possible, and always represent Maninfini Automation professionally.`;

    return companyContext;
  }

  async sendMessage(message: string, sender: string = 'user'): Promise<GeminiResponse[]> {
    // Add message to conversation history
    const userMessage: GeminiMessage = {
      text: message,
      sender,
      metadata: {
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
      },
    };
    this.conversationHistory.push(userMessage);

    try {
      const prompt = await this.buildContextualPrompt(message);
      const response = await this.makeGeminiRequest(prompt);
      
      if (response.candidates && response.candidates[0] && response.candidates[0].content) {
        const botResponse = response.candidates[0].content.parts[0].text;
        
        // Add bot response to conversation history
        const botMessage: GeminiMessage = {
          text: botResponse,
          sender: 'bot',
          metadata: {
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
          },
        };
        this.conversationHistory.push(botMessage);

        // Generate relevant action buttons based on response content
        const buttons = this.generateActionButtons(botResponse, message);

        return [{
          recipient_id: 'user',
          text: botResponse,
          buttons: buttons,
        }];
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Failed to get response from Gemini:', error);
      // Enhanced fallback responses based on message content
      return this.getFallbackResponse(message);
    }
  }

  private generateActionButtons(botResponse: string, userMessage: string): Array<{title: string; payload: string}> {
    const buttons: Array<{title: string; payload: string}> = [];
    const lowerResponse = botResponse.toLowerCase();
    const lowerMessage = userMessage.toLowerCase();

    // Add relevant buttons based on response content
    if (lowerResponse.includes('service') || lowerResponse.includes('automation') || lowerResponse.includes('development')) {
      buttons.push({ title: '💬 Get Quote on WhatsApp', payload: 'whatsapp_quote' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('price') || lowerResponse.includes('cost') || lowerResponse.includes('quote')) {
      buttons.push({ title: '💬 Chat for Pricing', payload: 'whatsapp_pricing' });
      buttons.push({ title: '📧 Email Quote Request', payload: 'email_quote' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('portfolio') || lowerResponse.includes('work') || lowerResponse.includes('project')) {
      buttons.push({ title: '🎨 View Portfolio', payload: 'portfolio' });
      buttons.push({ title: '💬 Discuss Project', payload: 'whatsapp_project' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('contact') || lowerResponse.includes('reach') || lowerResponse.includes('team')) {
      buttons.push({ title: '💬 WhatsApp Chat', payload: 'whatsapp_contact' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('automation') || lowerResponse.includes('rpa')) {
      buttons.push({ title: '🤖 Learn More About Automation', payload: 'automation_details' });
      buttons.push({ title: '📊 See Automation Examples', payload: 'automation_examples' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('web') || lowerResponse.includes('website') || lowerResponse.includes('development')) {
      buttons.push({ title: '🌐 Web Development Services', payload: 'web_services' });
      buttons.push({ title: '💻 See Website Examples', payload: 'website_examples' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('design') || lowerResponse.includes('graphic') || lowerResponse.includes('logo')) {
      buttons.push({ title: '🎨 Design Services', payload: 'design_services' });
      buttons.push({ title: '👀 View Design Portfolio', payload: 'design_portfolio' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    if (lowerResponse.includes('whatsapp') || lowerResponse.includes('chatbot') || lowerResponse.includes('messaging')) {
      buttons.push({ title: '📱 WhatsApp Integration Demo', payload: 'contact_us' });
      buttons.push({ title: '🤖 Chatbot Examples', payload: 'chatbot_examples' });
      buttons.push({ title: '📞 Contact Us', payload: 'contact_us' });
    }

    // Always add a general contact button if no specific buttons were added
    if (buttons.length === 0) {
      buttons.push({ title: '� Contact Us', payload: 'contact_us' });
    }

    // Limit to maximum 3 buttons for better UX
    return buttons.slice(0, 3);
  }

  private getFallbackResponse(message: string): GeminiResponse[] {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based fallback responses with beautiful formatting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return [{
        recipient_id: 'user',
        text: "👋 Hello! I'm Manu, your AI assistant from Maninfini Automation.\n\n✨ I can help you with:\n• 🤖 Process Automation & RPA\n• 🌐 Web Development Solutions\n• 🎨 Graphic Design Services\n• 📱 WhatsApp Integration\n• 💼 Virtual Office Solutions\n\nHow can I assist you today?",
        buttons: [
          { title: '🚀 Our Services', payload: 'services' },
          { title: '💰 Get Pricing', payload: 'pricing' },
          { title: '💬 Chat on WhatsApp', payload: 'whatsapp_general' }
        ]
      }];
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return [{
        recipient_id: 'user',
        text: "🚀 **Maninfini Automation Services**\n\nWe're your one-stop digital transformation partner:\n\n🤖 **Process Automation**\n• RPA & AI-powered workflows\n• Custom automation solutions\n• System integrations\n\n🌐 **Web Development**\n• Custom websites & web apps\n• E-commerce solutions\n• Responsive design\n\n🎨 **Graphic Design**\n• Brand identity & logos\n• Marketing materials\n• UI/UX design\n\n📱 **WhatsApp Integration**\n• Business API setup\n• Custom chatbots\n• Automated customer support\n\n💼 **Virtual Office Solutions**\n• Remote work tools\n• Document management\n• Cloud solutions\n\nWhich service interests you most?",
        buttons: [
          { title: '🤖 Automation Details', payload: 'automation_details' },
          { title: '🌐 Web Development', payload: 'web_services' },
          { title: '💬 Get Quote', payload: 'whatsapp_quote' }
        ]
      }];
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return [{
        recipient_id: 'user',
        text: "💰 **Flexible Pricing for Every Need**\n\n✨ We offer competitive pricing tailored to your requirements:\n\n📊 **Pricing Models:**\n• 💼 Project-based pricing\n• 🔄 Monthly retainer packages\n• ⏰ Hourly consulting rates\n• 📈 Custom enterprise solutions\n\n🎯 **What's Included:**\n• Free consultation & requirement analysis\n• Detailed project roadmap\n• Quality assurance & testing\n• Post-launch support & maintenance\n\n💡 **Get Your Custom Quote:**\nEvery project is unique! Let's discuss your specific needs for an accurate quote.",
        buttons: [
          { title: '💬 Get Quote on WhatsApp', payload: 'whatsapp_pricing' },
          { title: '📞 Contact Us', payload: 'contact_us' },
          { title: '📧 Email Quote Request', payload: 'email_pricing' }
        ]
      }];
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return [{
        recipient_id: 'user',
        text: "📞 **Let's Connect!**\n\nReady to transform your business? Here's how to reach us:\n\n💬 **WhatsApp:** +91 97412 66370\n📧 **Email:** mitesh@maninfini.com\n📞 **Phone:** +91 97412 66370\n🌐 **Website:** www.maninfini.com\n\n⚡ **Quick Response Promise:**\n• WhatsApp: Instant replies during business hours\n• Email: Response within 2-4 hours\n• Phone: Available 9 AM - 7 PM IST\n\nWhat's the best way for you to connect?",
        buttons: [
          { title: '💬 WhatsApp Now', payload: 'whatsapp_contact' },
          { title: '📞 Contact Us', payload: 'contact_us' },
          { title: '📧 Send Email', payload: 'email_contact' }
        ]
      }];
    }
    
    if (lowerMessage.includes('automation') || lowerMessage.includes('rpa')) {
      return [{
        recipient_id: 'user',
        text: "🤖 **Process Automation Excellence**\n\nTransform your business with intelligent automation:\n\n⚡ **Our Automation Services:**\n• 🔄 Robotic Process Automation (RPA)\n• 🧠 AI-powered workflow automation\n• 📊 Data processing & analysis\n• 🔗 System integrations\n• 📈 Performance monitoring\n\n🎯 **Benefits You'll See:**\n• ⏱️ 70% reduction in manual tasks\n• 💰 Significant cost savings\n• 🎯 99.9% accuracy in processes\n• 📈 Improved productivity\n• 😊 Better employee satisfaction\n\n💡 **Industries We Serve:**\nManufacturing, Healthcare, Finance, Retail, Education, and more!\n\nReady to automate your processes?",
        buttons: [
          { title: '📊 See Automation Examples', payload: 'automation_examples' },
          { title: '💬 Discuss My Process', payload: 'whatsapp_automation' },
          { title: '📞 Contact Us', payload: 'contact_us' }
        ]
      }];
    }
    
    if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
      return [{
        recipient_id: 'user',
        text: "🌐 **Modern Web Development**\n\nCreate stunning digital experiences that drive results:\n\n✨ **Our Web Services:**\n• 💻 Custom website development\n• 🛒 E-commerce solutions\n• 📱 Mobile-responsive design\n• ⚡ Fast-loading, SEO-optimized sites\n• 🔒 Secure & scalable architecture\n\n🛠️ **Technologies We Use:**\n• React, Node.js, Python\n• WordPress, Shopify\n• AWS, Google Cloud\n• Modern design frameworks\n\n🎯 **What You Get:**\n• Professional design that converts\n• Mobile-first responsive layout\n• SEO optimization included\n• Fast loading speeds\n• Ongoing support & maintenance\n\nWhat type of website do you need?",
        buttons: [
          { title: '💻 See Website Examples', payload: 'website_examples' },
          { title: '💬 Discuss My Project', payload: 'whatsapp_webdev' },
          { title: '📞 Contact Us', payload: 'contact_us' }
        ]
      }];
    }
    
    if (lowerMessage.includes('design') || lowerMessage.includes('graphic')) {
      return [{
        recipient_id: 'user',
        text: "🎨 **Creative Design Solutions**\n\nMake your brand stand out with professional design:\n\n✨ **Design Services:**\n• 🎯 Brand identity & logo design\n• 📱 Social media graphics\n• 📄 Marketing materials\n• 🖼️ Print design\n• 💻 UI/UX design\n• 📦 Packaging design\n\n🎯 **Our Design Process:**\n• 🔍 Brand research & analysis\n• 💭 Concept development\n• 🎨 Design creation\n• 🔄 Revisions & refinement\n• 📦 Final delivery in all formats\n\n🏆 **Why Choose Us:**\n• Award-winning creative team\n• Fast turnaround times\n• Unlimited revisions\n• All file formats included\n• Copyright ownership transfer\n\nWhat design project can we help you with?",
        buttons: [
          { title: '🎨 View Design Portfolio', payload: 'design_portfolio' },
          { title: '💬 Discuss Design Needs', payload: 'whatsapp_design' },
          { title: '📞 Contact Us', payload: 'contact_us' }
        ]
      }];
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('chatbot')) {
      return [{
        recipient_id: 'user',
        text: "📱 **WhatsApp Business Integration**\n\nConnect with customers like never before:\n\n🚀 **WhatsApp Solutions:**\n• 📞 WhatsApp Business API setup\n• 🤖 Custom chatbot development\n• 📨 Automated responses\n• 📊 Lead generation & nurturing\n• 💬 Multi-agent customer support\n• 📈 Analytics & reporting\n\n✨ **Features Include:**\n• 24/7 automated responses\n• Product catalog integration\n• Payment processing\n• Multi-language support\n• CRM integration\n• Broadcasting campaigns\n\n📈 **Results You'll See:**\n• 80% faster response times\n• 60% increase in customer engagement\n• 45% boost in sales conversions\n• Reduced support costs\n\nReady to revolutionize your customer communication?",
        buttons: [
          { title: '📱 See WhatsApp Demo', payload: 'whatsapp_demo' },
          { title: '💬 Setup My WhatsApp Bot', payload: 'whatsapp_setup' },
          { title: '📞 Get Integration Guide', payload: 'call_whatsapp' }
        ]
      }];
    }
    
    // Default fallback response
    return [{
      recipient_id: 'user',
      text: "🤔 I understand you're asking about **" + message + "**\n\n✨ I'm here to help you with:\n• 🤖 Process automation solutions\n• 🌐 Web development projects\n• 🎨 Creative design services\n• 📱 WhatsApp business integration\n• 💼 Virtual office solutions\n\n💡 **Quick Actions:**\nChoose how you'd like to continue, and I'll provide detailed information tailored to your needs!",
      buttons: [
        { title: '💬 Chat on WhatsApp', payload: 'whatsapp_general' },
        { title: '📞 Contact Us', payload: 'contact_us' },
        { title: '🚀 Explore Services', payload: 'services' }
      ]
    }];
  }

  async getModelStatus(): Promise<boolean> {
    try {
      console.log('[GeminiApi] Testing API with simple request...');
      console.log('[GeminiApi] API Key present:', !!this.apiKey);
      console.log('[GeminiApi] API Key length:', this.apiKey?.length || 0);
      
      // Test the API with a simple request
      const response = await this.makeGeminiRequest("Hello");
      console.log('[GeminiApi] Test request response:', response);
      
      const isAvailable = response.candidates && response.candidates.length > 0;
      console.log('[GeminiApi] Model status result:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.error('[GeminiApi] Failed to check Gemini model status:', error);
      return false;
    }
  }

  async getIntentConfidence(message: string): Promise<{ intent: string; confidence: number }> {
    try {
      const prompt = `Analyze the following message and determine the user's intent. Respond with only a JSON object containing "intent" and "confidence" (0-1). Message: "${message}"`;
      const response = await this.makeGeminiRequest(prompt);
      
      if (response.candidates && response.candidates[0]) {
        const text = response.candidates[0].content.parts[0].text;
        try {
          const parsed = JSON.parse(text);
          return {
            intent: parsed.intent || 'out_of_scope',
            confidence: parsed.confidence || 0.5,
          };
        } catch {
          // Fallback intent detection
          return this.getFallbackIntent(message);
        }
      }
      return this.getFallbackIntent(message);
    } catch (error) {
      console.error('Failed to get intent confidence:', error);
      return this.getFallbackIntent(message);
    }
  }

  private getFallbackIntent(message: string): { intent: string; confidence: number } {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return { intent: 'greet', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return { intent: 'ask_services', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return { intent: 'ask_pricing', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return { intent: 'ask_contact', confidence: 0.8 };
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('book') || lowerMessage.includes('meeting')) {
      return { intent: 'book_consultation', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('automation') || lowerMessage.includes('rpa')) {
      return { intent: 'ask_automation', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
      return { intent: 'ask_web_development', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('design') || lowerMessage.includes('graphic')) {
      return { intent: 'ask_design', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('chatbot')) {
      return { intent: 'ask_whatsapp', confidence: 0.9 };
    }
    
    return { intent: 'out_of_scope', confidence: 0.3 };
  }

  async getEntities(message: string): Promise<any[]> {
    try {
      const prompt = `Extract entities from this message. Respond with only a JSON array of objects with "entity" and "value" fields. Message: "${message}"`;
      const response = await this.makeGeminiRequest(prompt);
      
      if (response.candidates && response.candidates[0]) {
        const text = response.candidates[0].content.parts[0].text;
        try {
          const parsed = JSON.parse(text);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    } catch (error) {
      console.error('Failed to get entities:', error);
      return [];
    }
  }

  async getContextualResponse(
    message: string,
    conversationHistory: GeminiMessage[],
    userPreferences?: Record<string, any>
  ): Promise<GeminiResponse[]> {
    // Update internal conversation history and preferences
    this.conversationHistory = [...conversationHistory];
    if (userPreferences) {
      this.userPreferences = { ...userPreferences };
    }

    return this.sendMessage(message);
  }

  async getSuggestedResponses(intent: string, confidence: number): Promise<string[]> {
    const suggestions: Record<string, string[]> = {
      ask_services: [
        "Tell me more about automation",
        "What about web development?",
        "I'm interested in graphic design",
        "How about WhatsApp integration?"
      ],
      ask_automation: [
        "What are the benefits?",
        "How much does it cost?",
        "Can you show me examples?",
        "I want to book a consultation"
      ],
      ask_web_development: [
        "What technologies do you use?",
        "How long does development take?",
        "Do you provide maintenance?",
        "Can you show me your portfolio?"
      ],
      ask_design: [
        "What design services do you offer?",
        "How much for a logo design?",
        "Do you do brand identity?",
        "Can I see your design portfolio?"
      ],
      ask_whatsapp: [
        "How does WhatsApp integration work?",
        "What are the costs?",
        "Can you customize the chatbot?",
        "How long does setup take?"
      ],
      ask_pricing: [
        "I need a quote",
        "What's included?",
        "Are there different packages?",
        "Can you explain the pricing?"
      ],
      book_consultation: [
        "What's your contact information?",
        "How long does the consultation take?",
        "What should I prepare?",
        "What are your available times?"
      ]
    };

    return suggestions[intent] || [];
  }

  async analyzeSentiment(message: string): Promise<'positive' | 'negative' | 'neutral'> {
    try {
      const prompt = `Analyze the sentiment of this message. Respond with only "positive", "negative", or "neutral". Message: "${message}"`;
      const response = await this.makeGeminiRequest(prompt);
      
      if (response.candidates && response.candidates[0]) {
        const text = response.candidates[0].content.parts[0].text.toLowerCase().trim();
        if (text.includes('positive')) return 'positive';
        if (text.includes('negative')) return 'negative';
        return 'neutral';
      }
      return 'neutral';
    } catch (error) {
      console.error('Failed to analyze sentiment:', error);
      // Fallback sentiment analysis
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'like', 'happy'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'poor', 'worst', 'disappointed'];
      
      const lowerMessage = message.toLowerCase();
      const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;
      
      if (positiveCount > negativeCount) return 'positive';
      if (negativeCount > positiveCount) return 'negative';
      return 'neutral';
    }
  }

  // Reset conversation state
  resetConversation(): void {
    this.conversationHistory = [];
    this.userPreferences = {};
    this.sessionId = this.generateSessionId();
  }

  // Get conversation history
  getConversationHistory(): GeminiMessage[] {
    return [...this.conversationHistory];
  }

  // Get user preferences
  getUserPreferences(): Record<string, any> {
    return { ...this.userPreferences };
  }
}

export const geminiApi = new GeminiApiService();
export default geminiApi;