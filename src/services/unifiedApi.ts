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
      // Gemini API availability checked
    } catch (error) {
      console.error('Failed to check Gemini availability:', error);
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
      if (this.geminiAvailable) {
        // Try Gemini API first
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
      console.error('Gemini API failed, using fallback:', error);
      // If it's a CSP blocking error, mark Gemini as unavailable
      if (error.message === 'CSP_BLOCKED') {
        console.warn('Gemini API blocked by CSP, switching to fallback mode');
        this.geminiAvailable = false;
      }
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): UnifiedResponse[] {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced fallback responses with more comprehensive coverage
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return [{
        recipient_id: 'user',
        text: "Hello! I'm Manu, your AI assistant from Maninfini Automation. I can help you with information about our services, pricing, and more. How can I assist you today?",
      }];
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
      return [{
        recipient_id: 'user',
        text: "At Maninfini Automation, we offer comprehensive digital solutions including:\n\n🤖 Process Automation (RPA, AI-powered workflows)\n🌐 Web Development (Custom websites, e-commerce)\n🎨 Graphic Design (Brand identity, marketing materials)\n📱 WhatsApp Integration (Business API, chatbots)\n💼 Virtual Office Solutions\n\nWhich service interests you most?",
      }];
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('quote')) {
      return [{
        recipient_id: 'user',
        text: "Our pricing is tailored to your specific needs and project requirements. We offer flexible pricing models including project-based, retainer, and hourly rates. To provide you with an accurate quote, I'd recommend scheduling a consultation to discuss your requirements. Would you like to book a consultation?",
      }];
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return [{
        recipient_id: 'user',
        text: "You can reach us through multiple channels:\n\n📧 Email: info@maninfini.com\n📞 Phone: +91-XXXXXXXXXX\n💬 WhatsApp: +91-XXXXXXXXXX\n🌐 Website: www.maninfini.com\n\nWe typically respond within 2-4 hours during business days.",
      }];
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('book') || lowerMessage.includes('meeting') || lowerMessage.includes('appointment')) {
      return [{
        recipient_id: 'user',
        text: "Great! I'd be happy to help you schedule a consultation. Our team will understand your business needs, analyze your current processes, and propose customized solutions. Please provide your preferred contact method and best time for a call.",
      }];
    }
    
    if (lowerMessage.includes('automation') || lowerMessage.includes('rpa') || lowerMessage.includes('process')) {
      return [{
        recipient_id: 'user',
        text: "Our automation services help businesses streamline operations and reduce manual work:\n\n• Robotic Process Automation (RPA)\n• AI-powered workflow automation\n• Data processing and analysis\n• Custom automation solutions\n• Integration with existing systems\n\nWhat specific process would you like to automate?",
      }];
    }
    
    if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('development') || lowerMessage.includes('app')) {
      return [{
        recipient_id: 'user',
        text: "Our web development services include:\n\n• Custom website development\n• E-commerce solutions\n• Responsive design\n• SEO optimization\n• Website maintenance\n• Performance optimization\n• Mobile app development\n\nWhat type of website or application do you need?",
      }];
    }
    
    if (lowerMessage.includes('design') || lowerMessage.includes('graphic') || lowerMessage.includes('logo') || lowerMessage.includes('brand')) {
      return [{
        recipient_id: 'user',
        text: "Our graphic design services cover:\n\n• Brand identity design\n• Logo creation\n• Marketing materials\n• Social media graphics\n• Print design\n• UI/UX design\n• Brochures and flyers\n\nWhat design project do you have in mind?",
      }];
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('chatbot') || lowerMessage.includes('messaging')) {
      return [{
        recipient_id: 'user',
        text: "Our WhatsApp integration services include:\n\n• WhatsApp Business API setup\n• Custom chatbot development\n• Automated responses\n• Lead generation\n• Customer support automation\n• Integration with CRM systems\n• Multi-language support\n\nHow can WhatsApp automation help your business?",
      }];
    }
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('examples') || lowerMessage.includes('projects')) {
      return [{
        recipient_id: 'user',
        text: "I'd be happy to show you our portfolio! We have worked on various projects across different industries. You can view our work on our website or I can arrange for our team to share specific examples based on your interests. What type of projects are you most interested in seeing?",
      }];
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('expertise')) {
      return [{
        recipient_id: 'user',
        text: "Our team has extensive experience in digital transformation and automation. We've successfully delivered projects for clients across various industries including manufacturing, healthcare, retail, and technology. We stay updated with the latest technologies and best practices to ensure optimal solutions for our clients.",
      }];
    }
    
    if (lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('how long') || lowerMessage.includes('time')) {
      return [{
        recipient_id: 'user',
        text: "Project timelines vary based on complexity and requirements. Simple websites might take 2-4 weeks, while complex automation projects can take 1-3 months. We'll provide a detailed timeline during our consultation based on your specific needs and requirements.",
      }];
    }
    
    if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('stack') || lowerMessage.includes('tools')) {
      return [{
        recipient_id: 'user',
        text: "We use modern technologies and tools including:\n\n• Web: React, Node.js, Python, PHP\n• Automation: UiPath, Automation Anywhere, Python\n• Design: Adobe Creative Suite, Figma\n• Database: MySQL, MongoDB, PostgreSQL\n• Cloud: AWS, Azure, Google Cloud\n\nWe choose the best technology stack for each project's specific requirements.",
      }];
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('after')) {
      return [{
        recipient_id: 'user',
        text: "Yes, we provide ongoing support and maintenance services. This includes regular updates, bug fixes, performance monitoring, and feature enhancements. We offer different support packages to meet your needs and ensure your solutions continue to work optimally.",
      }];
    }
    
    if (lowerMessage.includes('team') || lowerMessage.includes('people') || lowerMessage.includes('staff')) {
      return [{
        recipient_id: 'user',
        text: "Our team consists of experienced professionals including developers, designers, automation specialists, and project managers. We have expertise in various technologies and industries, ensuring we can handle projects of any complexity.",
      }];
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('office')) {
      return [{
        recipient_id: 'user',
        text: "We are based in India and serve clients globally. We can work remotely and have experience collaborating with international clients. Our team is available across different time zones to ensure smooth communication and project delivery.",
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
      if (this.geminiAvailable) {
        return await geminiApi.getModelStatus();
      }
      return false;
    } catch (error) {
      console.error('Failed to check model status:', error);
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