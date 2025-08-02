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
      const response = await fetch(`${this.baseUrl}/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`, {
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
            maxOutputTokens: 1024,
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

  private buildContextualPrompt(message: string): string {
    const companyContext = `
You are Manu, an AI assistant for Maninfini Automation, a digital solutions company. 

Company Information:
- Name: Maninfini Automation
- Services: Process Automation (RPA, AI-powered workflows), Web Development, Graphic Design, WhatsApp Integration, Virtual Office Solutions
- Contact: info@maninfini.com, www.maninfini.com
- Focus: Digital transformation and automation solutions

Your role is to:
1. Provide helpful, accurate information about Maninfini's services
2. Answer questions about pricing, processes, and capabilities
3. Help schedule consultations and gather requirements
4. Be professional, friendly, and knowledgeable
5. Always represent Maninfini positively
6. If you don't know something specific, suggest contacting the team directly

Previous conversation context:
${this.conversationHistory.slice(-5).map(msg => `${msg.sender}: ${msg.text}`).join('\n')}

User preferences: ${JSON.stringify(this.userPreferences)}

Current user message: ${message}

Please provide a helpful, contextual response that addresses the user's question while promoting Maninfini's services appropriately. Keep responses concise but informative.`;

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
      const prompt = this.buildContextualPrompt(message);
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

        return [{
          recipient_id: 'user',
          text: botResponse,
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

  private getFallbackResponse(message: string): GeminiResponse[] {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based fallback responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return [{
        recipient_id: 'user',
        text: "Hello! I'm Manu, your AI assistant from Maninfini Automation. I can help you with information about our services, pricing, and more. How can I assist you today?",
      }];
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return [{
        recipient_id: 'user',
        text: "At Maninfini Automation, we offer comprehensive digital solutions including:\n\n🤖 Process Automation (RPA, AI-powered workflows)\n🌐 Web Development (Custom websites, e-commerce)\n🎨 Graphic Design (Brand identity, marketing materials)\n📱 WhatsApp Integration (Business API, chatbots)\n💼 Virtual Office Solutions\n\nWhich service interests you most?",
      }];
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return [{
        recipient_id: 'user',
        text: "Our pricing is tailored to your specific needs and project requirements. We offer flexible pricing models including project-based, retainer, and hourly rates. To provide you with an accurate quote, I'd recommend scheduling a consultation to discuss your requirements. Would you like to book a consultation?",
      }];
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return [{
        recipient_id: 'user',
        text: "You can reach us through multiple channels:\n\n📧 Email: info@maninfini.com\n📞 Phone: +91-XXXXXXXXXX\n💬 WhatsApp: +91-XXXXXXXXXX\n🌐 Website: www.maninfini.com\n\nWe typically respond within 2-4 hours during business days.",
      }];
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('book') || lowerMessage.includes('meeting')) {
      return [{
        recipient_id: 'user',
        text: "Great! I'd be happy to help you schedule a consultation. Our team will understand your business needs, analyze your current processes, and propose customized solutions. Please provide your preferred contact method and best time for a call.",
      }];
    }
    
    if (lowerMessage.includes('automation') || lowerMessage.includes('rpa')) {
      return [{
        recipient_id: 'user',
        text: "Our automation services help businesses streamline operations and reduce manual work:\n\n• Robotic Process Automation (RPA)\n• AI-powered workflow automation\n• Data processing and analysis\n• Custom automation solutions\n• Integration with existing systems\n\nWhat specific process would you like to automate?",
      }];
    }
    
    if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
      return [{
        recipient_id: 'user',
        text: "Our web development services include:\n\n• Custom website development\n• E-commerce solutions\n• Responsive design\n• SEO optimization\n• Website maintenance\n• Performance optimization\n\nWhat type of website do you need?",
      }];
    }
    
    if (lowerMessage.includes('design') || lowerMessage.includes('graphic')) {
      return [{
        recipient_id: 'user',
        text: "Our graphic design services cover:\n\n• Brand identity design\n• Logo creation\n• Marketing materials\n• Social media graphics\n• Print design\n• UI/UX design\n\nWhat design project do you have in mind?",
      }];
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('chatbot')) {
      return [{
        recipient_id: 'user',
        text: "Our WhatsApp integration services include:\n\n• WhatsApp Business API setup\n• Custom chatbot development\n• Automated responses\n• Lead generation\n• Customer support automation\n• Integration with CRM systems\n\nHow can WhatsApp automation help your business?",
      }];
    }
    
    // Default fallback response
    return [{
      recipient_id: 'user',
      text: "I apologize, but I'm having trouble processing your request right now. However, I can help you with information about our services, pricing, or help you schedule a consultation. What would you like to know about Maninfini Automation?",
    }];
  }

  async getModelStatus(): Promise<boolean> {
    try {
      // Test the API with a simple request
      const response = await this.makeGeminiRequest("Hello");
      return response.candidates && response.candidates.length > 0;
    } catch (error) {
      console.error('Failed to check Gemini model status:', error);
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