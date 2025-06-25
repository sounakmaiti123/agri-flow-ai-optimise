
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Bot, User, Key, Settings } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      content: "Hello! I'm your AgriChain AI assistant powered by ChatGPT. I can help you with agricultural questions, market analysis, and farming advice. Please enter your OpenAI API key to get started.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [tempApiKey, setTempApiKey] = useState("");

  const handleApiKeySubmit = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey);
      setShowApiKeyInput(false);
      localStorage.setItem('openai_api_key', tempApiKey);
      
      const welcomeMessage: Message = {
        id: messages.length + 1,
        sender: "bot",
        content: "Great! Your API key has been saved. Now I can provide you with intelligent responses using ChatGPT. Ask me anything about agriculture, farming, market trends, or any other topic!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  const callOpenAI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant specializing in agricultural supply chain management, farming techniques, market analysis, and rural development. Provide helpful, accurate, and practical advice for farmers, transporters, and vendors in the agricultural sector.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "I'm having trouble connecting to OpenAI right now. Please check your API key and try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!apiKey) {
      alert("Please enter your OpenAI API key first.");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await callOpenAI(inputMessage);
      
      const botResponse: Message = {
        id: messages.length + 2,
        sender: "bot",
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        content: "I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showApiKeyInput) {
        handleApiKeySubmit();
      } else {
        handleSendMessage();
      }
    }
  };

  // Load API key from localStorage on component mount
  useState(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  });

  return (
    <Card className="w-96 h-96 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-green-600" />
          <span>ChatGPT Assistant</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          {!showApiKeyInput && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowApiKeyInput(true)}
              title="Change API Key"
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {showApiKeyInput ? (
          <div className="p-4 space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-2">Enter your OpenAI API key to use ChatGPT:</p>
              <p className="text-xs text-gray-500">
                Get your API key from{" "}
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  OpenAI Platform
                </a>
              </p>
            </div>
            <div className="flex space-x-2">
              <Input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="sk-..."
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit} size="sm">
                <Key className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="h-64 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "bot" ? (
                          <Bot className="w-3 h-3" />
                        ) : (
                          <User className="w-3 h-3" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-1">
                        <Bot className="w-3 h-3" />
                        <span className="text-xs text-gray-500">ChatGPT is thinking...</span>
                      </div>
                      <div className="flex space-x-1 mt-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask ChatGPT anything..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatBot;
