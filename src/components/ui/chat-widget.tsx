
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: { text: string }[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This effect scrolls the chat to the bottom whenever a new message is added.
    if (scrollAreaRef.current) {
        const element = scrollAreaRef.current.querySelector('div');
        if (element) {
             element.scrollTop = element.scrollHeight;
        }
    }
  }, [messages, isLoading]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: [{ text: input }],
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (!response.ok) {
        let errorMessage = `API request failed with status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.details || errorMessage;
        } catch (jsonError) {
             try {
                const textError = await response.text();
                if(textError) errorMessage = textError;
             } catch (textError) {
                // If reading as text also fails, stick with the status code message.
             }
        }
        throw new Error(errorMessage);
      }

      const aiText = await response.text();
      const aiMessage: Message = {
        role: 'model',
        content: [{ text: aiText }],
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to get a response from the chatbot.",
      });
       // Restore user message to input if API fails and remove it from messages
       setMessages(prev => prev.slice(0, -1));
       setInput(userMessage.content[0].text);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50", {"hidden": isOpen})}>
        <Button onClick={() => setIsOpen(true)} className="rounded-full w-16 h-16 shadow-lg">
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>

      <div className={cn("fixed bottom-4 right-4 z-50 transition-all w-full max-w-sm", {"opacity-0 pointer-events-none": !isOpen})}>
        <Card className="h-[600px] flex flex-col shadow-2xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot />
              AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="text-center text-muted-foreground p-8">
                    <Bot className="mx-auto h-12 w-12 mb-4"/>
                    <p>Ask me anything! How can I help you plan your trip?</p>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === 'model' && (
                      <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-xs rounded-2xl px-4 py-2 text-sm",
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      )}
                    >
                      <p>{msg.content[0].text}</p>
                    </div>
                     {msg.role === 'user' && (
                      <Avatar className="h-8 w-8">
                         <AvatarFallback><User size={20}/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                         <Avatar className="h-8 w-8 border-2 border-primary">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                        <div className="max-w-xs rounded-2xl px-4 py-2 text-sm bg-muted rounded-bl-none flex items-center gap-2">
                           <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                           <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                           <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your trip..."
                autoComplete="off"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
