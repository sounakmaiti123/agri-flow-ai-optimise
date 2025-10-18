import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FarmerDashboard from "@/components/FarmerDashboard";
import TransporterDashboard from "@/components/TransporterDashboard";
import VendorDashboard from "@/components/VendorDashboard";
import ChatBot from "@/components/ChatBot";
import DiwaliFireworks from "@/components/DiwaliFireworks";
import { Tractor, Truck, Store, MessageCircle, Sparkles, Flame } from "lucide-react";

const Index = () => {
  const [activeRole, setActiveRole] = useState("farmer");
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <DiwaliFireworks />
      {/* Header with Diwali Decoration */}
      <header className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 shadow-sm border-b border-orange-200 relative overflow-hidden">
        {/* Decorative diya lamps */}
        <div className="absolute top-2 left-4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
        <div className="absolute top-2 right-4 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
        <Sparkles className="absolute top-3 left-20 w-4 h-4 text-yellow-500 animate-pulse" />
        <Sparkles className="absolute top-3 right-20 w-4 h-4 text-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                <Tractor className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  AgriChain Pro
                </h1>
                <span className="text-2xl animate-pulse">🪔</span>
              </div>
            </div>
            <Button
              onClick={() => setShowChatBot(!showChatBot)}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Diwali Greeting */}
        <div className="mb-8 relative">
          <div className="absolute -top-4 -left-4 text-4xl animate-spin-slow">✨</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow" style={{ animationDelay: '1s' }}>✨</div>
          
          <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-orange-300 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-2 left-4">🪔</div>
              <div className="absolute top-2 right-4">🪔</div>
              <div className="absolute bottom-2 left-8">✨</div>
              <div className="absolute bottom-2 right-8">✨</div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2 animate-pulse">
                🪔 Happy Diwali! 🪔
              </h2>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to AgriChain Pro
              </h3>
              <p className="text-lg text-gray-700">
                Optimize your agricultural supply chain from farm to market
              </p>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="farmer" className="flex items-center space-x-2">
              <Tractor className="w-4 h-4" />
              <span>Farmer</span>
            </TabsTrigger>
            <TabsTrigger value="transporter" className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Transporter</span>
            </TabsTrigger>
            <TabsTrigger value="vendor" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Vendor</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farmer">
            <FarmerDashboard />
          </TabsContent>
          
          <TabsContent value="transporter">
            <TransporterDashboard />
          </TabsContent>
          
          <TabsContent value="vendor">
            <VendorDashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant ChatBot */}
      {showChatBot && (
        <div className="fixed bottom-4 right-4 z-50">
          <ChatBot onClose={() => setShowChatBot(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
