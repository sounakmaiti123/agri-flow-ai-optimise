
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Download } from "lucide-react";
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
