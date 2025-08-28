
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Download, Brain, CloudRain, DollarSign, AlertTriangle } from "lucide-react";
import CropInventory from "./CropInventory";
import PriceChart from "./PriceChart";
import ExportDialog from "./ExportDialog";

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
      case "harvested": return "bg-green-100 text-green-800";
      case "ready": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "planted": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">9,000 kg</div>
            <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ready to Harvest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,800 kg</div>
            <p className="text-xs text-gray-500 mt-1">Corn - Field B</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Market Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$18,500</div>
            <p className="text-xs text-gray-500 mt-1">Current market rates</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">4</div>
            <p className="text-xs text-gray-500 mt-1">3 in production</p>
          </CardContent>
        </Card>
      </div>

      {/* Crop Inventory */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Crop Inventory</CardTitle>
            <CardDescription>Current status of all crops</CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowExport(true)}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crops.map((crop, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {crop.location}
                    </p>
                  </div>
                  <Badge className={getStatusColor(crop.status)}>
                    {crop.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-green-600">
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Harvest Schedule</span>
            </CardTitle>
            <CardDescription>Upcoming harvest activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">Corn Harvest</h4>
              <p className="text-sm text-gray-600">Field B - Tomorrow</p>
              <p className="text-xs text-gray-500">Optimal weather conditions</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Wheat Processing</h4>
              <p className="text-sm text-gray-600">Storage 1 - 3 days</p>
              <p className="text-xs text-gray-500">Ready for market</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold">Soybean Planting</h4>
              <p className="text-sm text-gray-600">Field D - Next week</p>
              <p className="text-xs text-gray-500">Soil preparation needed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Crop Prediction Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Crop Recommendations</span>
          </CardTitle>
          <CardDescription>Smart suggestions based on weather, soil, and market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recommended Crops */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Recommended for Next Season</h3>
              
              <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-green-800">Tomatoes</h4>
                    <p className="text-sm text-green-600">High confidence match</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">96% Match</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CloudRain className="w-4 h-4 text-blue-500" />
                    <span>Optimal weather conditions expected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>High market demand (+23% price increase)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span>Expected yield: 4,500 kg/hectare</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Profit Potential</span>
                    <span>$12,500/hectare</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-blue-800">Sweet Peppers</h4>
                    <p className="text-sm text-blue-600">Good alternative option</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">89% Match</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CloudRain className="w-4 h-4 text-blue-500" />
                    <span>Suitable for current soil pH (6.8)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>Stable market demand</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span>Expected yield: 3,800 kg/hectare</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Profit Potential</span>
                    <span>$9,200/hectare</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-amber-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-amber-800">Lettuce</h4>
                    <p className="text-sm text-amber-600">Quick harvest option</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">78% Match</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>Short growing cycle (45 days)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>Lower investment required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span>Expected yield: 2,200 kg/hectare</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Profit Potential</span>
                    <span>$6,800/hectare</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </div>

            {/* Risk Assessment & Insights */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Risk Assessment & Market Insights</h3>
              
              <Card className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Weather Alerts</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Possible drought conditions in July-August</li>
                        <li>• Consider drought-resistant varieties</li>
                        <li>• Install drip irrigation system recommended</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Market Trends</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Organic produce demand up 34%</li>
                        <li>• Local farm-to-table restaurants expanding</li>
                        <li>• Export opportunities to nearby cities</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">AI Insights</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Your soil composition favors nightshade family</li>
                        <li>• Field rotation recommended after corn harvest</li>
                        <li>• Consider companion planting for pest control</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Optimization Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-600">Potential Revenue Increase</p>
                    <p className="font-bold text-blue-800">+28%</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Resource Efficiency</p>
                    <p className="font-bold text-blue-800">+15%</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Risk Reduction</p>
                    <p className="font-bold text-blue-800">-22%</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Sustainability Score</p>
                    <p className="font-bold text-blue-800">8.4/10</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="default">
                <Brain className="w-4 h-4 mr-2" />
                Get Detailed Planting Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ExportDialog 
        open={showExport}
        onClose={() => setShowExport(false)}
        data={crops}
        title="Crop Inventory Report"
      />
    </div>
  );
};

export default FarmerDashboard;
