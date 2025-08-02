import * as React from "react";
import { PromptBox } from "./chatgpt-prompt-input";
import { cn } from "@/lib/utils";
import { unifiedApi, UnifiedMessage, UnifiedResponse } from "@/services/unifiedApi";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import { Loader2, Send, Bot, User, Sparkles, MessageSquare, X, Settings, Brain, Crown, Zap, Search, Code, Lightbulb, Image, Star, Gift } from "lucide-react";

interface IntelligentChatbotProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  confidence?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  suggestedResponses?: string[];
  buttons?: Array<{
    title: string;
    payload: string;
  }>;
  isTyping?: boolean;
}

// Join Automation Pro Popup Component
const JoinAutomationProPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  const features = [
    { icon: Image, title: "Create Images", description: "Generate stunning visuals with AI" },
    { icon: Search, title: "Web Search", description: "Search the web with researched responses" },
    { icon: Code, title: "Code Samples", description: "Get code examples and solutions" },
    { icon: Lightbulb, title: "Deep Research", description: "Comprehensive analysis and insights" },
    { icon: Brain, title: "Thoughtful Answers", description: "Detailed, well-reasoned responses" },
  ];

  const benefits = [
    "🎯 First-served customer priority",
    "💰 Exclusive discounts on our products",
    "⚡ Priority support and faster responses",
    "🔒 Early access to new features",
    "📈 Advanced analytics and insights"
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-[#303030] rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-full">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Join Automation Pro</h2>
              <p className="text-white/90 text-sm">Unlock advanced AI capabilities</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Premium Features
            </h3>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-500" />
              Exclusive Benefits
            </h3>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-yellow-700 dark:text-yellow-300">Limited Time Offer</span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Get <strong>50% off</strong> your first month and be among the first to experience our advanced AI features!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
              onClick={() => {
                // Here you would integrate with your payment/registration system
                window.open('https://wa.me/919741266370?text=Hi! I want to join Automation Pro for advanced AI features. Please provide details about the 50% off offer.', '_blank');
                onClose();
              }}
            >
              <Crown className="w-4 h-4 mr-2" />
              Join Automation Pro
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function IntelligentChatbot({ 
  className, 
  title = "Manu Assistant", 
  subtitle = "Intelligent conversation with Gemini AI & fallback" 
}: IntelligentChatbotProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [apiConnected, setApiConnected] = React.useState(false);
  const [conversationHistory, setConversationHistory] = React.useState<UnifiedMessage[]>([]);
  const [userPreferences, setUserPreferences] = React.useState<Record<string, string>>({});
  const [showJoinPopup, setShowJoinPopup] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  // Check API connection on mount
  React.useEffect(() => {
    checkApiConnection();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const checkApiConnection = async () => {
    try {
      const isConnected = await unifiedApi.getModelStatus();
      setApiConnected(isConnected);
      if (!isConnected) {
        console.warn('API not connected, using fallback responses');
      }
    } catch (error) {
      console.error('Failed to check API connection:', error);
      setApiConnected(false);
      console.log('Using fallback mode - API is not available');
    }
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (duration: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const processUserMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    addMessage({
      text: message,
      sender: 'user',
    });

    setIsLoading(true);

    try {
      // Update conversation history
      const userUnifiedMessage: UnifiedMessage = {
        text: message,
        sender: 'user',
        metadata: { timestamp: new Date().toISOString() }
      };

      const updatedHistory = [...conversationHistory, userUnifiedMessage];
      setConversationHistory(updatedHistory);

      // Simulate typing
      await simulateTyping();

      let responses: UnifiedResponse[];

      if (apiConnected) {
        try {
          responses = await unifiedApi.sendMessage(message, 'user');
        } catch (error) {
          console.error('API call failed, using fallback:', error);
          responses = getFallbackResponse(message);
        }
      } else {
        responses = getFallbackResponse(message);
      }

      // Add bot responses
      for (const response of responses) {
        addMessage({
          text: response.text,
          sender: 'bot',
          buttons: response.buttons,
        });
      }

      // Update conversation history with bot responses
      const botUnifiedMessages: UnifiedMessage[] = responses.map(response => ({
        text: response.text,
        sender: 'bot',
        metadata: { 
          timestamp: new Date().toISOString(),
        }
      }));
      setConversationHistory(prev => [...prev, ...botUnifiedMessages]);

    } catch (error) {
      console.error('Error processing message:', error);
      addMessage({
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: 'bot',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (message: string): UnifiedResponse[] => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return [{
        recipient_id: 'user',
        text: "Hello! I'm AdBert, your AI assistant. How can I help you today?",
        buttons: [
          { title: 'Tell me about your services', payload: 'services' },
          { title: 'What can you do?', payload: 'capabilities' },
          { title: 'I need help with automation', payload: 'automation' }
        ]
      }];
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('help')) {
      return [{
        recipient_id: 'user',
        text: "I can help you with various automation services! We offer web development, AI integration, process automation, and more. Would you like to learn about our specific services?",
        buttons: [
          { title: 'Show me your portfolio', payload: 'portfolio' },
          { title: 'What are your prices?', payload: 'pricing' },
          { title: 'Contact sales team', payload: 'contact' }
        ]
      }];
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return [{
        recipient_id: 'user',
        text: "Our pricing varies based on project complexity and requirements. For detailed pricing information and personalized quotes, I'd recommend speaking with our sales team directly.",
        buttons: [
          { title: '💬 Get Pricing on WhatsApp', payload: 'whatsapp_pricing' },
          { title: '📞 Schedule a Call', payload: 'call_pricing' },
          { title: '📧 Email Quote Request', payload: 'email_pricing' }
        ]
      }];
    }
    
    if (lowerMessage.includes('web development') || lowerMessage.includes('website') || lowerMessage.includes('web app')) {
      return [{
        recipient_id: 'user',
        text: "We specialize in modern web development! We create responsive websites, web applications, and e-commerce solutions using the latest technologies. Would you like to see our work or discuss your project?",
        buttons: [
          { title: '🎨 View Portfolio', payload: 'portfolio' },
          { title: '💬 Discuss Project', payload: 'whatsapp_webdev' },
          { title: '📞 Schedule Call', payload: 'call_webdev' }
        ]
      }];
    }
    
    if (lowerMessage.includes('automation') || lowerMessage.includes('process')) {
      return [{
        recipient_id: 'user',
        text: "We help businesses automate their processes to save time and increase efficiency! From workflow automation to AI-powered solutions, we can transform your operations. What type of automation are you looking for?",
        buttons: [
          { title: '🤖 AI Automation', payload: 'ai_automation' },
          { title: '⚡ Process Automation', payload: 'process_automation' },
          { title: '💬 Get Consultation', payload: 'whatsapp_automation' }
        ]
      }];
    }
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('examples')) {
      return [{
        recipient_id: 'user',
        text: "I'd be happy to show you our portfolio! We have examples of web development, automation solutions, and AI integrations. Would you like to see specific types of projects?",
        buttons: [
          { title: '🌐 Web Development', payload: 'portfolio_web' },
          { title: '🤖 AI Solutions', payload: 'portfolio_ai' },
          { title: '💬 Chat on WhatsApp', payload: 'whatsapp_portfolio' }
        ]
      }];
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
      return [{
        recipient_id: 'user',
        text: "Great! Here are the best ways to reach our team. We're here to help with your project needs!",
        buttons: [
          { title: '💬 WhatsApp Chat', payload: 'whatsapp_contact' },
          { title: '📞 Call Us', payload: 'call_contact' },
          { title: '📧 Email Us', payload: 'email_contact' }
        ]
      }];
    }
    
    // For advanced features that require Automation Pro
    if (lowerMessage.includes('image generation') || lowerMessage.includes('create image') || lowerMessage.includes('generate image')) {
      return [{
        recipient_id: 'user',
        text: "Image generation is an advanced AI feature available in Automation Pro! With Automation Pro, you can create stunning visuals, generate custom graphics, and design assets using AI. Would you like to learn more about this premium feature?",
        buttons: [
          { title: '👑 Learn About Automation Pro', payload: 'automation_pro' },
          { title: '💬 Chat on WhatsApp', payload: 'whatsapp_automation_pro' },
          { title: '🔍 See Other Features', payload: 'other_features' }
        ]
      }];
    }
    
    if (lowerMessage.includes('web search') || lowerMessage.includes('search web') || lowerMessage.includes('research')) {
      return [{
        recipient_id: 'user',
        text: "Web search and research capabilities are part of our Automation Pro features! This allows you to get real-time information, search the web, and perform deep research. Would you like to explore this premium feature?",
        buttons: [
          { title: '👑 Learn About Automation Pro', payload: 'automation_pro' },
          { title: '💬 Chat on WhatsApp', payload: 'whatsapp_automation_pro' },
          { title: '🔍 See Other Features', payload: 'other_features' }
        ]
      }];
    }
    
    // Default helpful response
    return [{
      recipient_id: 'user',
      text: "I understand you're asking about " + message + ". I can help you with information about our services, pricing, portfolio, and more. What would you like to know?",
      buttons: [
        { title: '💬 Chat on WhatsApp', payload: 'whatsapp_general' },
        { title: '📞 Call Us', payload: 'call_general' },
        { title: '🌐 Our Services', payload: 'services' }
      ]
    }];
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get('message') as string;
    
    if (message.trim()) {
      await processUserMessage(message);
      // Reset form
      const textarea = event.currentTarget.querySelector('textarea');
      if (textarea) {
        textarea.value = '';
      }
    }
  };

  const handleSuggestedResponse = async (response: string) => {
    await processUserMessage(response);
  };

  const handleQuickAction = async (action: string) => {
    const actionMessages = {
      services: "Tell me about your automation services",
      pricing: "What are your pricing plans?",
      contact: "How can I contact your team?",
      portfolio: "Show me your work portfolio"
    };
    
    const message = actionMessages[action];
    if (message) {
      await processUserMessage(message);
    }
  };

  const handleButtonClick = async (payload: string) => {
    const whatsappNumber = '+91 97412 66370';
    const email = 'mitesh@maninfini.com';
    
    switch (payload) {
      case 'whatsapp_pricing':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your pricing for web development and automation services. Can you provide me with a quote?`, '_blank');
        break;
      case 'whatsapp_webdev':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'm interested in web development services. Can you tell me more about your web development packages and pricing?`, '_blank');
        break;
      case 'whatsapp_automation':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'm interested in automation services for my business. Can you help me understand what automation solutions you offer?`, '_blank');
        break;
      case 'whatsapp_portfolio':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'd like to see your portfolio of web development and automation projects. Can you share some examples?`, '_blank');
        break;
      case 'whatsapp_contact':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'd like to discuss a project with your team. When would be a good time to chat?`, '_blank');
        break;
      case 'whatsapp_automation_pro':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'm interested in Automation Pro features like image generation and web search. Can you tell me more about the pricing and features?`, '_blank');
        break;
      case 'whatsapp_general':
        window.open(`https://wa.me/${whatsappNumber}?text=Hi! I have a question about your services. Can you help me?`, '_blank');
        break;
      case 'call_pricing':
      case 'call_webdev':
      case 'call_automation':
      case 'call_contact':
      case 'call_general':
        window.open('tel:+91 97412 66370', '_self');
        break;
      case 'email_pricing':
        window.open(`mailto:${email}?subject=Pricing Inquiry&body=Hi! I would like to know about your pricing for web development and automation services.`, '_self');
        break;
      case 'email_contact':
        window.open(`mailto:${email}?subject=Project Inquiry&body=Hi! I would like to discuss a project with your team.`, '_self');
        break;
      case 'automation_pro':
        setShowJoinPopup(true);
        break;
      case 'portfolio_web':
        addMessage({
          text: "Here are some of our web development projects:",
          sender: 'bot',
        });
        // You can add more specific portfolio information here
        break;
      case 'portfolio_ai':
        addMessage({
          text: "Here are some of our AI and automation projects:",
          sender: 'bot',
        });
        // You can add more specific portfolio information here
        break;
      case 'ai_automation':
        addMessage({
          text: "We offer AI-powered automation solutions including chatbots, data processing, and intelligent workflows. Would you like to discuss your specific needs?",
          sender: 'bot',
        });
        break;
      case 'process_automation':
        addMessage({
          text: "We help automate business processes like data entry, reporting, customer service, and workflow management. What processes would you like to automate?",
          sender: 'bot',
        });
        break;
      case 'other_features':
        addMessage({
          text: "Our services include web development, mobile apps, AI integration, process automation, and custom software solutions. What interests you most?",
          sender: 'bot',
        });
        break;
      default:
        // For other payloads, just process them as regular messages
        await processUserMessage(payload);
        break;
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationHistory([]);
    setUserPreferences({});
  };

  // Handle Tools and Plus button clicks
  const handleToolsClick = () => {
    setShowJoinPopup(true);
  };

  const handlePlusClick = () => {
    setShowJoinPopup(true);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Join Automation Pro Popup */}
      <JoinAutomationProPopup 
        isOpen={showJoinPopup} 
        onClose={() => setShowJoinPopup(false)} 
      />

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 h-[600px] bg-white dark:bg-[#303030] rounded-2xl shadow-2xl border border-border/50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-6 h-6 text-primary" />
                {apiConnected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  {title}
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetConversation}
                title="Reset conversation"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5" />
                    <p>👋 Hi! I'm AdBert, your intelligent AI assistant.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['services', 'pricing', 'contact', 'portfolio'].map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="text-xs"
                      >
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div className="max-w-[85%] space-y-2">
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2 text-sm",
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {message.text}
                      </div>
                      
                      {/* Message metadata */}
                      {message.intent && message.confidence && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {message.intent.replace('_', ' ')}
                          </Badge>
                          <span>{(message.confidence * 100).toFixed(1)}%</span>
                          {message.sentiment && (
                            <Badge 
                              variant={message.sentiment === 'positive' ? 'default' : 
                                     message.sentiment === 'negative' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {message.sentiment}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Suggested responses */}
                      {message.suggestedResponses && message.suggestedResponses.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Quick responses:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestedResponses.map((response, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestedResponse(response)}
                                className="text-xs h-auto py-1 px-2"
                              >
                                {response}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action buttons from UnifiedResponse */}
                      {message.buttons && message.buttons.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Quick actions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.buttons.map((button, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleButtonClick(button.payload)}
                                className="text-xs h-auto py-1 px-2"
                              >
                                {button.title}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Manu is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <form onSubmit={handleSubmit}>
              <PromptBox 
                name="message" 
                placeholder={isLoading ? "Please wait..." : "Type your message..."}
                disabled={isLoading}
                onToolsClick={handleToolsClick}
                onPlusClick={handlePlusClick}
              />
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          {/* Connection status indicator */}
          {apiConnected && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
        <span className="font-medium">{title}</span>
      </button>
    </div>
  );
} 