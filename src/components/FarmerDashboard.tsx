import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Download, Brain, CloudRain, DollarSign, AlertTriangle, Wheat, Sprout, Package, BarChart3 } from "lucide-react";
import PriceChart from "./PriceChart";
import ExportDialog from "./ExportDialog";
import MLPredictions from "./MLPredictions";

const FarmerDashboard = () => {
  const [showExport, setShowExport] = useState(false);

  const crops = [
    { name: "Wheat", quantity: 2500, unit: "kg", status: "harvested", location: "Field A" },
    { name: "Corn", quantity: 1800, unit: "kg", status: "ready", location: "Field B" },
    { name: "Rice", quantity: 3200, unit: "kg", status: "processing", location: "Storage 1" },
    { name: "Soybeans", quantity: 1500, unit: "kg", status: "planted", location: "Field C" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "harvested": return "bg-primary/15 text-primary border-primary/20";
      case "ready": return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "processing": return "bg-accent/15 text-accent-foreground border-accent/20";
      case "planted": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const statCards = [
    { title: "Total Inventory", value: "9,000 kg", sub: "+12% from last month", icon: Package, color: "text-primary" },
    { title: "Ready to Harvest", value: "1,800 kg", sub: "Corn - Field B", icon: Wheat, color: "text-blue-500" },
    { title: "Market Value", value: "$18,500", sub: "Current market rates", icon: BarChart3, color: "text-accent-foreground" },
    { title: "Active Fields", value: "4", sub: "3 in production", icon: Sprout, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {stat.title}
                <stat.icon className={`w-4 h-4 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Crop Inventory */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Crop Inventory</CardTitle>
            <CardDescription>Current status of all crops</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setShowExport(true)} className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crops.map((crop, index) => (
              <div key={index} className="border border-border/50 rounded-xl p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{crop.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {crop.location}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(crop.status)} border`}>{crop.status}</Badge>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {crop.quantity.toLocaleString()} {crop.unit}
                </div>
                <Progress value={75} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChart />
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Harvest Schedule</span>
            </CardTitle>
            <CardDescription>Upcoming harvest activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Corn Harvest", sub: "Field B - Tomorrow", note: "Optimal weather conditions", color: "border-primary" },
              { title: "Wheat Processing", sub: "Storage 1 - 3 days", note: "Ready for market", color: "border-blue-500" },
              { title: "Soybean Planting", sub: "Field D - Next week", note: "Soil preparation needed", color: "border-accent" },
            ].map((item, i) => (
              <div key={i} className={`border-l-4 ${item.color} pl-4 py-1`}>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
                <p className="text-xs text-muted-foreground/70">{item.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Crop Prediction */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Crop Recommendations</span>
          </CardTitle>
          <CardDescription>Smart suggestions based on weather, soil, and market data</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Recommended for Next Season</h3>
              {[
                { name: "Tomatoes", sub: "High confidence match", match: "96%", yield: "4,500 kg/hectare", profit: "$12,500/hectare", progress: 92, weather: "Optimal weather conditions expected", demand: "High market demand (+23% price increase)" },
                { name: "Sweet Peppers", sub: "Good alternative option", match: "89%", yield: "3,800 kg/hectare", profit: "$9,200/hectare", progress: 85, weather: "Suitable for current soil pH (6.8)", demand: "Stable market demand" },
                { name: "Lettuce", sub: "Quick harvest option", match: "78%", yield: "2,200 kg/hectare", profit: "$6,800/hectare", progress: 78, weather: "Short growing cycle (45 days)", demand: "Lower investment required" },
              ].map((crop, i) => (
                <div key={i} className="border border-border/50 rounded-xl p-4 bg-card hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{crop.name}</h4>
                      <p className="text-sm text-muted-foreground">{crop.sub}</p>
                    </div>
                    <Badge className="bg-primary/15 text-primary border border-primary/20">{crop.match} Match</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2"><CloudRain className="w-4 h-4 text-blue-500" /><span>{crop.weather}</span></div>
                    <div className="flex items-center space-x-2"><DollarSign className="w-4 h-4 text-primary" /><span>{crop.demand}</span></div>
                    <div className="flex items-center space-x-2"><TrendingUp className="w-4 h-4 text-accent-foreground" /><span>Expected yield: {crop.yield}</span></div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Profit Potential</span><span>{crop.profit}</span>
                    </div>
                    <Progress value={crop.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Risk Assessment & Market Insights</h3>
              {[
                { icon: AlertTriangle, iconColor: "text-destructive", title: "Weather Alerts", items: ["Possible drought conditions in July-August", "Consider drought-resistant varieties", "Install drip irrigation system recommended"] },
                { icon: TrendingUp, iconColor: "text-primary", title: "Market Trends", items: ["Organic produce demand up 34%", "Local farm-to-table restaurants expanding", "Export opportunities to nearby cities"] },
                { icon: Brain, iconColor: "text-primary", title: "AI Insights", items: ["Your soil composition favors nightshade family", "Field rotation recommended after corn harvest", "Consider companion planting for pest control"] },
              ].map((card, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <card.icon className={`w-5 h-5 ${card.iconColor} mt-1`} />
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{card.title}</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {card.items.map((item, j) => <li key={j}>• {item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Optimization Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Revenue Increase", value: "+28%" },
                    { label: "Resource Efficiency", value: "+15%" },
                    { label: "Risk Reduction", value: "-22%" },
                    { label: "Sustainability Score", value: "8.4/10" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-muted-foreground">{s.label}</p>
                      <p className="font-bold text-primary">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Brain className="w-4 h-4 mr-2" />
                Get Detailed Planting Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* ML Predictions */}
      <MLPredictions />

      <ExportDialog open={showExport} onClose={() => setShowExport(false)} data={crops} title="Crop Inventory Report" />
    </div>
  );
};

export default FarmerDashboard;
