
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export default function EmergencyChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'support',
      text: "We've received your emergency alert. How can we help you? Your location has been shared with our team.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
     {
      sender: 'user',
      text: "I'm lost and I think someone is following me.",
      timestamp: new Date(Date.now() + 1000 * 60 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: 'user',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
      // Simulate a support response
      setTimeout(() => {
        setMessages(prev => [...prev, {
            sender: 'support',
            text: "Okay, please stay calm. We are dispatching local authorities to your location. Can you provide any details about the person following you?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-secondary/20 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-3">
             <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Support" />
                <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-lg font-semibold">Support Agent</p>
                <p className="text-xs text-green-500">Online</p>
            </div>
          </CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/tourist/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-6">
                <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`flex items-end gap-2 ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                    >
                    {msg.sender === 'support' && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="Support" />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${
                        msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                    >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</p>
                    </div>
                     {msg.sender === 'user' && (
                        <Avatar className="h-8 w-8">
                             <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                             <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                </div>
            </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              autoComplete="off"
            />
            <Button type="submit">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
