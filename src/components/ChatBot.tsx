
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
    {
      id: '1',
      text: "Hello! I'm your AI assistant. I'm here to help you with questions about agriculture, supply chain management, or anything else you'd like to know. What can I help you with today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      return "Hello! Great to see you here. I can help you with agricultural questions, supply chain management, crop advice, or general information. What would you like to know?";
    }
    
    // Agriculture-related responses
    if (lowercaseMessage.includes('crop') || lowercaseMessage.includes('farming') || lowercaseMessage.includes('agriculture')) {
      return "I'd be happy to help with agricultural questions! Are you looking for information about crop management, soil health, irrigation, pest control, or something else specific?";
    }
    
    if (lowercaseMessage.includes('supply chain') || lowercaseMessage.includes('transport') || lowercaseMessage.includes('logistics')) {
      return "Supply chain management is crucial for agriculture! I can help with topics like transportation optimization, storage solutions, distribution networks, or tracking systems. What specific aspect interests you?";
    }
    
    if (lowercaseMessage.includes('weather') || lowercaseMessage.includes('climate')) {
      return "Weather and climate are vital for farming success. Are you looking for information about seasonal planning, drought management, irrigation scheduling, or climate adaptation strategies?";
    }
    
    if (lowercaseMessage.includes('price') || lowercaseMessage.includes('market') || lowercaseMessage.includes('sell')) {
      return "Market information and pricing are important for farmers! I can discuss market trends, pricing strategies, finding buyers, or optimizing profits. What would you like to explore?";
    }
    
    // Technology-related responses
    if (lowercaseMessage.includes('technology') || lowercaseMessage.includes('app') || lowercaseMessage.includes('digital')) {
      return "Agricultural technology is transforming farming! Are you interested in precision agriculture, farm management apps, IoT sensors, or digital marketing for farm products?";
    }
    
    // Help and guidance
    if (lowercaseMessage.includes('help') || lowercaseMessage.includes('assist') || lowercaseMessage.includes('support')) {
      return "I'm here to assist you! I can help with:\n• Agricultural advice and best practices\n• Supply chain optimization\n• Market information and pricing\n• Technology solutions for farming\n• General farming questions\n\nWhat specific topic would you like to explore?";
    }
    
    // Thank you responses
    if (lowercaseMessage.includes('thank') || lowercaseMessage.includes('thanks')) {
      return "You're very welcome! I'm always happy to help. Is there anything else you'd like to know about agriculture, supply chains, or farming in general?";
    }
    
    // Goodbye responses
    if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye') || lowercaseMessage.includes('see you')) {
      return "Goodbye! It was great helping you today. Feel free to come back anytime you have questions about farming, agriculture, or supply chain management. Have a wonderful day!";
    }
    
    // Default fallback with helpful suggestions
    return "I'm not sure about that specific topic, but I'll learn it soon! In the meantime, I can help you with:\n• Crop management and farming techniques\n• Supply chain and logistics\n• Agricultural technology\n• Market information\n• Weather and climate advice\n\nCould you tell me more about what you're looking for?";
  };

  const quickReplies = [
    "Tell me about crop management",
    "How to optimize supply chain?",
    "Agricultural technology trends",
    "Market pricing strategies",
    "Weather impact on farming"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response delay (under 2 seconds)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500); // Random delay between 0.5-1.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const startVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  return (
    <Card className="w-80 md:w-96 h-96 flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-600 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          AI Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-green-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="w-4 h-4 mt-0.5 text-green-600" />
                  )}
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-green-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Suggestions */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {quickReplies.slice(0, 3).map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              variant="outline"
              size="icon"
              className={isListening ? 'bg-red-100 hover:bg-red-200' : ''}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-600" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
