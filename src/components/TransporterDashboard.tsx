
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock, Fuel, Download } from "lucide-react";
import RouteOptimizer from "./RouteOptimizer";
import ExportDialog from "./ExportDialog";
import GoogleMapsIntegration from "./GoogleMapsIntegration";

const TransporterDashboard = () => {
  const [showExport, setShowExport] = useState(false);

  const routes = [
    {
      id: "RT001",
      origin: "Farm A - Wheat",
      destination: "Market Central",
      distance: "45 km",
      estimatedTime: "1h 20m",
      fuelCost: "$25",
      status: "active",
      cargo: "2,500 kg Wheat"
    },
    {
      id: "RT002",
      origin: "Farm B - Corn",
      destination: "Processing Plant",
      distance: "32 km",
      estimatedTime: "55m",
      fuelCost: "$18",
      status: "scheduled",
      cargo: "1,800 kg Corn"
    },
    {
      id: "RT003",
      origin: "Storage 1 - Rice",
      destination: "Port Terminal",
      distance: "78 km",
      estimatedTime: "2h 15m",
      fuelCost: "$42",
      status: "completed",
      cargo: "3,200 kg Rice"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewRoute = (routeId: string) => {
    console.log(`Viewing route ${routeId} on Google Maps`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-xs text-gray-500 mt-1">2 in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">155 km</div>
            <p className="text-xs text-gray-500 mt-1">Today's routes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Fuel Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$85</div>
            <p className="text-xs text-gray-500 mt-1">-15% optimized</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cargo Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7,500 kg</div>
            <p className="text-xs text-gray-500 mt-1">85% capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Route Management</CardTitle>
            <CardDescription>Current and scheduled transportation routes</CardDescription>
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
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{route.id}</h3>
                      <Badge className={getStatusColor(route.status)}>
                        {route.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {route.origin} → {route.destination}
                      </div>
                      <div className="flex items-center">
                        <Truck className="w-4 h-4 mr-1" />
                        {route.cargo}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {route.distance} • {route.estimatedTime}
                      </div>
                      <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-1" />
                        {route.fuelCost}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <GoogleMapsIntegration
                      routeId={route.id}
                      origin={route.origin}
                      destination={route.destination}
                      onViewRoute={() => handleViewRoute(route.id)}
                    />
                    {route.status === "scheduled" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Start Journey
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RouteOptimizer />

      <ExportDialog 
        open={showExport}
        onClose={() => setShowExport(false)}
        data={routes}
        title="Transportation Routes Report"
      />
    </div>
  );
};

export default TransporterDashboard;
