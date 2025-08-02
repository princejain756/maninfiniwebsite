export interface RasaMessage {
  text: string;
  sender: string;
  metadata?: Record<string, any>;
}

export interface RasaResponse {
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

export interface RasaWebhookPayload {
  sender: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface RasaWebhookResponse {
  responses: RasaResponse[];
  session_id?: string;
}

class RasaApiService {
  private baseUrl: string;
  private sessionId: string;

  constructor() {
    // Handle different environment variable systems
    let rasaUrl = 'http://localhost:5005';
    
    // Try Vite's import.meta.env first (for Vite projects)
    if (import.meta.env?.VITE_RASA_URL) {
      rasaUrl = import.meta.env.VITE_RASA_URL;
    }
    // Fallback to process.env (for Create React App)
    else if (typeof process !== 'undefined' && process.env?.REACT_APP_RASA_URL) {
      rasaUrl = process.env.REACT_APP_RASA_URL;
    }
    
    this.baseUrl = rasaUrl;
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Rasa API request failed:', error);
      throw error;
    }
  }

  async sendMessage(message: string, sender: string = 'user'): Promise<RasaResponse[]> {
    const payload: RasaWebhookPayload = {
      sender,
      message,
      metadata: {
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      const response = await this.makeRequest('/webhooks/rest/webhook', payload);
      return response || [];
    } catch (error) {
      console.error('Failed to send message to Rasa:', error);
      // Enhanced fallback responses based on message content
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): RasaResponse[] {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based fallback responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return [{
        recipient_id: 'user',
        text: "Hello! I'm AdBert, your AI assistant from Maninfini Automation. I can help you with information about our services, pricing, and more. How can I assist you today?",
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
    
    // Default fallback response
    return [{
      recipient_id: 'user',
      text: "I apologize, but I'm having trouble processing your request right now. However, I can help you with information about our services, pricing, or help you schedule a consultation. What would you like to know about Maninfini Automation?",
    }];
  }

  async getModelStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/status`);
      if (response.ok) {
        const data = await response.json();
        return data.model_file && data.model_file.length > 0;
      }
      return false;
    } catch (error) {
      console.error('Failed to check Rasa model status:', error);
      return false;
    }
  }

  async trainModel(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/model/train`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: 'domain.yml',
          config: 'config.yml',
          training_files: ['data/nlu.yml', 'data/stories.yml'],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Model training initiated:', data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to train Rasa model:', error);
      return false;
    }
  }

  async getIntentConfidence(message: string): Promise<{ intent: string; confidence: number }> {
    try {
      const response = await this.makeRequest('/model/parse', { text: message });
      return {
        intent: response.intent?.name || 'out_of_scope',
        confidence: response.intent?.confidence || 0,
      };
    } catch (error) {
      console.error('Failed to get intent confidence:', error);
      // Fallback intent detection
      return this.getFallbackIntent(message);
    }
  }

  private getFallbackIntent(message: string): { intent: string; confidence: number } {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return { intent: 'greet', confidence: 0.8 };
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
    
    return { intent: 'out_of_scope', confidence: 0.3 };
  }

  async getEntities(message: string): Promise<any[]> {
    try {
      const response = await this.makeRequest('/model/parse', { text: message });
      return response.entities || [];
    } catch (error) {
      console.error('Failed to get entities:', error);
      return [];
    }
  }

  // Intelligent conversation management
  async getContextualResponse(
    message: string,
    conversationHistory: RasaMessage[],
    userPreferences?: Record<string, any>
  ): Promise<RasaResponse[]> {
    const enhancedMessage = this.enhanceMessageWithContext(
      message,
      conversationHistory,
      userPreferences
    );

    return this.sendMessage(enhancedMessage);
  }

  private enhanceMessageWithContext(
    message: string,
    conversationHistory: RasaMessage[],
    userPreferences?: Record<string, any>
  ): string {
    // Add context from conversation history
    const recentMessages = conversationHistory.slice(-3);
    const contextKeywords = this.extractContextKeywords(recentMessages);
    
    // Add user preferences context
    const preferenceContext = userPreferences ? this.extractPreferenceContext(userPreferences) : '';
    
    // Enhance message with context
    let enhancedMessage = message;
    
    if (contextKeywords.length > 0) {
      enhancedMessage = `${contextKeywords.join(' ')} ${message}`;
    }
    
    if (preferenceContext) {
      enhancedMessage = `${preferenceContext} ${enhancedMessage}`;
    }
    
    return enhancedMessage;
  }

  private extractContextKeywords(messages: RasaMessage[]): string[] {
    const keywords: string[] = [];
    
    messages.forEach(msg => {
      if (msg.text.toLowerCase().includes('automation')) keywords.push('automation');
      if (msg.text.toLowerCase().includes('web')) keywords.push('web_development');
      if (msg.text.toLowerCase().includes('design')) keywords.push('graphic_design');
      if (msg.text.toLowerCase().includes('whatsapp')) keywords.push('whatsapp_integration');
      if (msg.text.toLowerCase().includes('price') || msg.text.toLowerCase().includes('cost')) keywords.push('pricing');
      if (msg.text.toLowerCase().includes('contact')) keywords.push('contact');
      if (msg.text.toLowerCase().includes('quote')) keywords.push('quote_request');
    });
    
    return [...new Set(keywords)]; // Remove duplicates
  }

  private extractPreferenceContext(preferences: Record<string, any>): string {
    const contextParts: string[] = [];
    
    if (preferences.industry) contextParts.push(`industry:${preferences.industry}`);
    if (preferences.budget) contextParts.push(`budget:${preferences.budget}`);
    if (preferences.timeline) contextParts.push(`timeline:${preferences.timeline}`);
    if (preferences.service) contextParts.push(`service:${preferences.service}`);
    
    return contextParts.join(' ');
  }

  // Advanced features
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

export const rasaApi = new RasaApiService();
export default rasaApi; 