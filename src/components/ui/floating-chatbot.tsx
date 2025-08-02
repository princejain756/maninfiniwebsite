import * as React from "react";
import { PromptBox } from "./chatgpt-prompt-input";
import { cn } from "@/lib/utils";

interface FloatingChatbotProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function FloatingChatbot({ 
  className, 
  title = "Chat with AdBert", 
  subtitle = "Get instant help" 
}: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;
    
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm here to help you with any questions about our services.",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    // Clear the form
    event.currentTarget.reset();
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-[#303030] rounded-2xl shadow-2xl border border-border/50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent rounded-full transition-colors"
              aria-label="Close chat"
              title="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm">
                <p>👋 Hi! How can I help you today?</p>
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
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <form onSubmit={handleSubmit}>
              <PromptBox name="message" placeholder="Type your message..." />
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {/* Notification dot */}
          {messages.length === 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          )}
        </div>
        <span className="font-medium">{title}</span>
      </button>
    </div>
  );
} 