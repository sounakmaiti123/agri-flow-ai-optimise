
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Navigation, Clock, Fuel } from "lucide-react";

const RouteOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState(null);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate API call
    setTimeout(() => {
      setOptimizedRoute({
        distance: "42.5 km",
        estimatedTime: "1h 15m",
        fuelCost: "$22.50",
        savings: "15% less fuel",
        route: "Farm A → Highway 101 → Market Street → Central Market"
      });
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5" />
          <span>Route Optimizer</span>
        </CardTitle>
        <CardDescription>
          Optimize routes based on distance, fuel cost, and weather conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farm-a">Farm A - Wheat Storage</SelectItem>
                <SelectItem value="farm-b">Farm B - Corn Field</SelectItem>
                <SelectItem value="storage-1">Storage Facility 1</SelectItem>
                <SelectItem value="processing-plant">Processing Plant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market-central">Central Market</SelectItem>
                <SelectItem value="port-terminal">Port Terminal</SelectItem>
                <SelectItem value="processing-plant">Processing Plant</SelectItem>
                <SelectItem value="warehouse-1">Warehouse District</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo-weight">Cargo Weight (kg)</Label>
            <Input id="cargo-weight" placeholder="e.g., 2500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fastest">Fastest Route</SelectItem>
                <SelectItem value="cheapest">Most Economical</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isOptimizing ? "Optimizing Route..." : "Optimize Route"}
        </Button>

        {optimizedRoute && (
          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-3">Optimized Route Found!</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="font-semibold">{optimizedRoute.distance}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Est. Time</p>
                  <p className="font-semibold">{optimizedRoute.estimatedTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Fuel className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Fuel Cost</p>
                  <p className="font-semibold">{optimizedRoute.fuelCost}</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Route:</strong> {optimizedRoute.route}
            </div>
            <div className="text-sm text-green-600 font-medium">
              💡 {optimizedRoute.savings} compared to standard route
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteOptimizer;
