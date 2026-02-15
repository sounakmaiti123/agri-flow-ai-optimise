import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Mic, MicOff, MessageCircle, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your AI assistant. I'm here to help you with questions about agriculture, supply chain management, or anything else you'd like to know. What can I help you with today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => { setInputValue(event.results[0][0].transcript); setIsListening(false); };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const lc = userMessage.toLowerCase();
    if (lc.includes('hello') || lc.includes('hi') || lc.includes('hey')) return "Hello! Great to see you here. I can help you with agricultural questions, supply chain management, crop advice, or general information. What would you like to know?";
    if (lc.includes('crop') || lc.includes('farming') || lc.includes('agriculture')) return "I'd be happy to help with agricultural questions! Are you looking for information about crop management, soil health, irrigation, pest control, or something else specific?";
    if (lc.includes('supply chain') || lc.includes('transport') || lc.includes('logistics')) return "Supply chain management is crucial for agriculture! I can help with transportation optimization, storage solutions, distribution networks, or tracking systems. What specific aspect interests you?";
    if (lc.includes('weather') || lc.includes('climate')) return "Weather and climate are vital for farming success. Are you looking for information about seasonal planning, drought management, irrigation scheduling, or climate adaptation strategies?";
    if (lc.includes('price') || lc.includes('market') || lc.includes('sell')) return "Market information and pricing are important for farmers! I can discuss market trends, pricing strategies, finding buyers, or optimizing profits. What would you like to explore?";
    if (lc.includes('help') || lc.includes('assist')) return "I'm here to assist you! I can help with:\n• Agricultural advice and best practices\n• Supply chain optimization\n• Market information and pricing\n• Technology solutions for farming\n\nWhat specific topic would you like to explore?";
    if (lc.includes('thank')) return "You're very welcome! Is there anything else you'd like to know?";
    if (lc.includes('bye') || lc.includes('goodbye')) return "Goodbye! Feel free to come back anytime. Have a wonderful day!";
    return "I'm not sure about that specific topic, but I can help you with crop management, supply chain, agricultural technology, market information, or weather advice. Could you tell me more about what you're looking for?";
  };

  const quickReplies = ["Crop management", "Supply chain tips", "Market pricing"];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: generateBotResponse(inputValue), sender: 'bot', timestamp: new Date() }]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500);
  };

  return (
    <Card className="w-80 md:w-96 h-[28rem] flex flex-col shadow-2xl shadow-primary/10 border-border/50 rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground px-4 py-3">
        <CardTitle className="text-base font-semibold flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          AI Assistant
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'}`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-primary shrink-0" />}
                  {message.sender === 'user' && <User className="w-4 h-4 mt-0.5 shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-60">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {quickReplies.map((reply, index) => (
              <Button key={index} variant="outline" size="sm" className="text-xs h-7 px-3 rounded-full" onClick={() => setInputValue(reply)}>
                {reply}
              </Button>
            ))}
          </div>
        </div>

        <div className="border-t border-border p-3">
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 rounded-xl" />
            <Button onClick={isListening ? () => { recognitionRef.current?.stop(); setIsListening(false); } : () => { setIsListening(true); recognitionRef.current?.start(); }} variant="outline" size="icon" className={`rounded-xl ${isListening ? 'bg-destructive/10 border-destructive/30' : ''}`}>
              {isListening ? <MicOff className="w-4 h-4 text-destructive" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button onClick={handleSendMessage} size="icon" className="rounded-xl bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
