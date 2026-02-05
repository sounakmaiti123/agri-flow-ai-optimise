import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FarmerDashboard from "@/components/FarmerDashboard";
import TransporterDashboard from "@/components/TransporterDashboard";
import VendorDashboard from "@/components/VendorDashboard";
import ChatBot from "@/components/ChatBot";
import { Tractor, Truck, Store, MessageCircle } from "lucide-react";

const Index = () => {
  const [activeRole, setActiveRole] = useState("farmer");
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                <Tractor className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-green-800">
                AgriChain Pro
              </h1>
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
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to AgriChain Pro
          </h2>
          <p className="text-lg text-gray-600">
            Optimize your agricultural supply chain from farm to market
          </p>
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
