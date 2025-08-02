import * as React from "react";
import { PromptBox } from "./chatgpt-prompt-input";
import { cn } from "@/lib/utils";
import { unifiedApi, UnifiedMessage, UnifiedResponse } from "@/services/unifiedApi";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import { Loader2, Send, Bot, User, Sparkles, MessageSquare, X, Settings, Brain } from "lucide-react";

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
  isTyping?: boolean;
}

export function IntelligentChatbot({ 
  className, 
  title = "AdBert AI Assistant", 
  subtitle = "Intelligent conversation with Gemini AI & fallback" 
}: IntelligentChatbotProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [apiConnected, setApiConnected] = React.useState(false);
  const [conversationHistory, setConversationHistory] = React.useState<UnifiedMessage[]>([]);
  const [userPreferences, setUserPreferences] = React.useState<Record<string, string>>({});
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
      setConversationHistory(prev => [...prev, userUnifiedMessage]);

      // Get intent and confidence
      const { intent, confidence } = await unifiedApi.getIntentConfidence(message);
      
      // Analyze sentiment
      const sentiment = await unifiedApi.analyzeSentiment(message);

      // Get contextual response from unified API
      const responses = await unifiedApi.getContextualResponse(
        message,
        conversationHistory,
        userPreferences
      );

      // Simulate typing for more natural feel
      await simulateTyping(Math.min(1000 + responses.length * 200, 2000));

      // Add bot responses
      for (const response of responses) {
        addMessage({
          text: response.text,
          sender: 'bot',
          intent,
          confidence,
          sentiment,
        });
      }

      // Get suggested responses
      const suggestedResponses = await unifiedApi.getSuggestedResponses(intent, confidence);
      
      if (suggestedResponses.length > 0) {
        addMessage({
          text: '',
          sender: 'bot',
          suggestedResponses,
        });
      }

      // Extract and store user preferences from entities
      const entities = await unifiedApi.getEntities(message);
      const newPreferences = { ...userPreferences };
      
      entities.forEach(entity => {
        if (entity.entity === 'service_type') newPreferences.service = entity.value;
        if (entity.entity === 'industry') newPreferences.industry = entity.value;
        if (entity.entity === 'budget_range') newPreferences.budget = entity.value;
        if (entity.entity === 'timeline') newPreferences.timeline = entity.value;
      });
      
      setUserPreferences(newPreferences);

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback response
      addMessage({
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment or contact our support team directly.",
        sender: 'bot',
        intent: 'out_of_scope',
        confidence: 0,
        sentiment: 'neutral',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;
    
    if (!message.trim() || isLoading) return;

    await processUserMessage(message);
    
    // Safely reset the form
    const form = event.currentTarget;
    if (form) {
      form.reset();
    }
  };

  const handleSuggestedResponse = async (response: string) => {
    await processUserMessage(response);
  };

  const handleQuickAction = async (action: string) => {
    const actionMessages: Record<string, string> = {
      'services': 'What services do you offer?',
      'pricing': 'How much do your services cost?',
      'contact': 'How can I contact you?',
      'portfolio': 'Can you show me your portfolio?',
      'consultation': 'I want to book a consultation',
    };

    const message = actionMessages[action];
    if (message) {
      await processUserMessage(message);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationHistory([]);
    setUserPreferences({});
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
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
                      <span>AdBert is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1">
                <PromptBox 
                  name="message" 
                  placeholder={isLoading ? "Please wait..." : "Type your message..."}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                size="sm" 
                disabled={isLoading}
                className="px-3"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
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