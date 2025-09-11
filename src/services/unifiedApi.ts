import { geminiApi, GeminiMessage, GeminiResponse } from './geminiApi';

export interface UnifiedMessage {
  text: string;
  sender: string;
  metadata?: Record<string, any>;
}

export interface UnifiedResponse {
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

class UnifiedApiService {
  private conversationHistory: UnifiedMessage[] = [];
  private userPreferences: Record<string, string> = {};
  private sessionId: string;
  private geminiAvailable: boolean = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.checkGeminiAvailability();
  }

  private generateSessionId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async checkGeminiAvailability(): Promise<void> {
    try {
      this.geminiAvailable = await geminiApi.getModelStatus();
    } catch (error) {
      console.error('[UnifiedApi] Failed to check Gemini availability:', error);
      this.geminiAvailable = false;
    }
  }

  async sendMessage(message: string, sender: string = 'user'): Promise<UnifiedResponse[]> {
    // Add message to conversation history
    const userMessage: UnifiedMessage = {
      text: message,
      sender,
      metadata: {
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
      },
    };
    this.conversationHistory.push(userMessage);

    try {
      // Always check Gemini availability fresh for each message
      const isGeminiAvailable = await geminiApi.getModelStatus();
      
      if (isGeminiAvailable) {
        // Try Gemini API
        const geminiResponses = await geminiApi.sendMessage(message, sender);
        return geminiResponses.map(response => ({
          recipient_id: response.recipient_id,
          text: response.text,
          buttons: response.buttons,
          image: response.image,
          attachment: response.attachment,
          custom: response.custom,
        }));
      } else {
        // Use fallback responses
        return this.getFallbackResponse(message);
      }
    } catch (error) {
      console.error('[UnifiedApi] Gemini API failed, using fallback:', error);
      // If it's a CSP blocking error, mark Gemini as unavailable
      if (error.message === 'CSP_BLOCKED') {
        console.warn('[UnifiedApi] Gemini API blocked by CSP, switching to fallback mode');
        this.geminiAvailable = false;
      }
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): UnifiedResponse[] {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced fallback responses with beautiful formatting
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
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
      return [{
        recipient_id: 'user',
        text: "🚀 **Maninfini Automation Services**\n\nWe're your one-stop digital transformation partner:\n\n🤖 **Process Automation**\n• RPA & AI-powered workflows\n• Custom automation solutions\n• System integrations\n\n🌐 **Web Development**\n• Custom websites & web apps\n• E-commerce solutions\n• Responsive design\n\n🎨 **Graphic Design**\n• Brand identity & logos\n• Marketing materials\n• UI/UX design\n\n📱 **WhatsApp Integration**\n• Business API setup\n• Custom chatbots\n• Automated customer support\n\nWhich service interests you most?",
        buttons: [
          { title: '🤖 Automation Details', payload: 'automation_details' },
          { title: '🌐 Web Development', payload: 'web_services' },
          { title: '💬 Get Quote', payload: 'whatsapp_quote' }
        ]
      }];
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('quote')) {
      return [{
        recipient_id: 'user',
        text: "💰 **Flexible Pricing for Every Need**\n\n✨ We offer competitive pricing tailored to your requirements:\n\n📊 **Pricing Models:**\n• 💼 Project-based pricing\n• 🔄 Monthly retainer packages\n• ⏰ Hourly consulting rates\n• 📈 Custom enterprise solutions\n\n💡 **Get Your Custom Quote:**\nEvery project is unique! Let's discuss your specific needs.",
        buttons: [
          { title: '💬 Get Quote on WhatsApp', payload: 'whatsapp_pricing' },
          { title: '📞 Schedule Consultation', payload: 'call_pricing' },
          { title: '📧 Email Quote Request', payload: 'email_pricing' }
        ]
      }];
    }
    
    // Add more enhanced responses following the same pattern...
    // Default fallback response
    return [{
      recipient_id: 'user',
      text: "🤔 I understand you're asking about **" + message + "**\n\n✨ I'm here to help you with:\n• 🤖 Process automation solutions\n• 🌐 Web development projects\n• 🎨 Creative design services\n• 📱 WhatsApp business integration\n\n💡 Choose how you'd like to continue!",
      buttons: [
        { title: '💬 Chat on WhatsApp', payload: 'whatsapp_general' },
        { title: '📞 Schedule Call', payload: 'call_general' },
        { title: '🚀 Explore Services', payload: 'services' }
      ]
    }];
  }

  async getModelStatus(): Promise<boolean> {
    try {
      // Always check Gemini status directly, don't rely on cached availability
      const status = await geminiApi.getModelStatus();
      this.geminiAvailable = status; // Update cached status
      return status;
    } catch (error) {
      console.error('[UnifiedApi] Failed to check model status:', error);
      this.geminiAvailable = false;
      return false;
    }
  }

  async getIntentConfidence(message: string): Promise<{ intent: string; confidence: number }> {
    try {
      if (this.geminiAvailable) {
        return await geminiApi.getIntentConfidence(message);
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
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
      return { intent: 'ask_services', confidence: 0.9 };
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('quote')) {
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
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('examples')) {
      return { intent: 'ask_portfolio', confidence: 0.9 };
    }
    
    return { intent: 'out_of_scope', confidence: 0.3 };
  }

  async getEntities(message: string): Promise<any[]> {
    try {
      if (this.geminiAvailable) {
        return await geminiApi.getEntities(message);
      }
      return [];
    } catch (error) {
      console.error('Failed to get entities:', error);
      return [];
    }
  }

  async getContextualResponse(
    message: string,
    conversationHistory: UnifiedMessage[],
    userPreferences?: Record<string, string>
  ): Promise<UnifiedResponse[]> {
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
      ask_portfolio: [
        "Show me automation projects",
        "I want to see web development work",
        "Can you show design examples?",
        "What industries do you work with?"
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
      if (this.geminiAvailable) {
        return await geminiApi.analyzeSentiment(message);
      }
      // Fallback sentiment analysis
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'like', 'happy'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'poor', 'worst', 'disappointed'];
      
      const lowerMessage = message.toLowerCase();
      const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;
      
      if (positiveCount > negativeCount) return 'positive';
      if (negativeCount > positiveCount) return 'negative';
      return 'neutral';
    } catch (error) {
      console.error('Failed to analyze sentiment:', error);
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
  getConversationHistory(): UnifiedMessage[] {
    return [...this.conversationHistory];
  }

  // Get user preferences
  getUserPreferences(): Record<string, string> {
    return { ...this.userPreferences };
  }

  // Check if Gemini is available
  isGeminiAvailable(): boolean {
    return this.geminiAvailable;
  }
}

export const unifiedApi = new UnifiedApiService();
export default unifiedApi; 