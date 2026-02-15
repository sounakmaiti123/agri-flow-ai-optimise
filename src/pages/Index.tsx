import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FarmerDashboard from "@/components/FarmerDashboard";
import TransporterDashboard from "@/components/TransporterDashboard";
import VendorDashboard from "@/components/VendorDashboard";
import ChatBot from "@/components/ChatBot";
import ThemeToggle from "@/components/ThemeToggle";
import { Tractor, Truck, Store, MessageCircle, Leaf } from "lucide-react";

const Index = () => {
  const [activeRole, setActiveRole] = useState("farmer");
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/80 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                AgriChain <span className="text-primary">Pro</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                onClick={() => setShowChatBot(!showChatBot)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="mb-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            Smart Agriculture Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Welcome to AgriChain <span className="text-primary">Pro</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Optimize your agricultural supply chain from farm to market with AI-powered insights
          </p>
        </div>

        {/* Role Selection */}
        <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/60 rounded-xl p-1">
            <TabsTrigger value="farmer" className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <Tractor className="w-4 h-4" />
              <span>Farmer</span>
            </TabsTrigger>
            <TabsTrigger value="transporter" className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <Truck className="w-4 h-4" />
              <span>Transporter</span>
            </TabsTrigger>
            <TabsTrigger value="vendor" className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
              <Store className="w-4 h-4" />
              <span>Vendor</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farmer"><FarmerDashboard /></TabsContent>
          <TabsContent value="transporter"><TransporterDashboard /></TabsContent>
          <TabsContent value="vendor"><VendorDashboard /></TabsContent>
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
