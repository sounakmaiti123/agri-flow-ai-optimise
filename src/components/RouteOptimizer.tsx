
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Navigation, Clock, Fuel, Route, AlertTriangle, Car, Truck, Bike } from "lucide-react";

const RouteOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [avoidOptions, setAvoidOptions] = useState({
    tolls: false,
    highways: false,
    ferries: false,
    unpaved: false,
    construction: false
  });

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate API call with more detailed route analysis
    setTimeout(() => {
      setOptimizedRoute({
        distance: "42.5 km",
        estimatedTime: "1h 15m",
        fuelCost: "$22.50",
        tollCost: "$3.50",
        savings: "15% less fuel",
        route: "Farm Location → NH-6 → Kolkata-Durgapur Expressway → Market District",
        waypoints: [
          { name: "Starting Point", coordinates: "22.8786°N, 87.7862°E", time: "0:00" },
          { name: "NH-6 Junction", coordinates: "22.8920°N, 87.7650°E", time: "0:12" },
          { name: "Expressway Entry", coordinates: "22.9150°N, 87.7200°E", time: "0:35" },
          { name: "Market District", coordinates: "22.9500°N, 87.6800°E", time: "1:15" }
        ],
        alternativeRoutes: [
          { name: "Fastest Route", time: "1h 15m", distance: "42.5 km", cost: "$22.50" },
          { name: "Shortest Route", time: "1h 28m", distance: "38.2 km", cost: "$19.80" },
          { name: "Economic Route", time: "1h 45m", distance: "44.8 km", cost: "$18.90" }
        ],
        trafficConditions: "Moderate traffic expected",
        weatherImpact: "Clear weather, no delays expected"
      });
      setIsOptimizing(false);
    }, 3000);
  };

  const handleAvoidOptionChange = (option: string, checked: boolean) => {
    setAvoidOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5" />
          <span>Advanced Route Optimizer</span>
        </CardTitle>
        <CardDescription>
          Comprehensive route planning with traffic, weather, and cost optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-location">Current Location (22.8786°N, 87.7862°E)</SelectItem>
                <SelectItem value="farm-a">Howrah Agricultural Hub</SelectItem>
                <SelectItem value="farm-b">Hooghly Crop Storage</SelectItem>
                <SelectItem value="storage-1">Burdwan Grain Terminal</SelectItem>
                <SelectItem value="processing-plant">Durgapur Processing Plant</SelectItem>
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
                <SelectItem value="kolkata-market">Kolkata Central Market</SelectItem>
                <SelectItem value="sealdah-market">Sealdah Wholesale Market</SelectItem>
                <SelectItem value="howrah-port">Howrah Port Terminal</SelectItem>
                <SelectItem value="durgapur-warehouse">Durgapur Warehouse District</SelectItem>
                <SelectItem value="asansol-depot">Asansol Distribution Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Vehicle and Cargo Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mini-truck">
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4" />
                    <span>Mini Truck (1-2 tons)</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium-truck">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Medium Truck (3-7 tons)</span>
                  </div>
                </SelectItem>
                <SelectItem value="heavy-truck">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Heavy Truck (8+ tons)</span>
                  </div>
                </SelectItem>
                <SelectItem value="motorcycle">
                  <div className="flex items-center space-x-2">
                    <Bike className="w-4 h-4" />
                    <span>Motorcycle/Scooter</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo-weight">Cargo Weight (kg)</Label>
            <Input id="cargo-weight" placeholder="e.g., 2500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo-type">Cargo Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select cargo type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="perishable">Perishable Goods</SelectItem>
                <SelectItem value="grains">Grains & Cereals</SelectItem>
                <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                <SelectItem value="fruits">Fresh Fruits</SelectItem>
                <SelectItem value="dairy">Dairy Products</SelectItem>
                <SelectItem value="general">General Cargo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Route Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Route Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fastest">Fastest Route</SelectItem>
                <SelectItem value="shortest">Shortest Distance</SelectItem>
                <SelectItem value="cheapest">Most Economical</SelectItem>
                <SelectItem value="balanced">Balanced (Time + Cost)</SelectItem>
                <SelectItem value="scenic">Scenic Route</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departure-time">Preferred Departure Time</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Leave Now</SelectItem>
                <SelectItem value="early-morning">Early Morning (5-7 AM)</SelectItem>
                <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12-3 PM)</SelectItem>
                <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                <SelectItem value="custom">Custom Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Avoid Options */}
        <div className="space-y-3">
          <Label>Route Restrictions (Avoid)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries({
              tolls: "Toll Roads",
              highways: "Highways",
              ferries: "Ferries",
              unpaved: "Unpaved Roads",
              construction: "Construction Zones"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={avoidOptions[key as keyof typeof avoidOptions]}
                  onCheckedChange={(checked) => handleAvoidOptionChange(key, checked as boolean)}
                />
                <Label htmlFor={key} className="text-sm">{label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Weather and Traffic Considerations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Consider Weather Conditions</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="weather" defaultChecked />
              <Label htmlFor="weather" className="text-sm">Include weather delays</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Real-time Traffic</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="traffic" defaultChecked />
              <Label htmlFor="traffic" className="text-sm">Use live traffic data</Label>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isOptimizing ? "Analyzing Routes..." : "Find Optimal Route"}
        </Button>

        {optimizedRoute && (
          <div className="space-y-4">
            {/* Main Route Results */}
            <div className="border rounded-lg p-4 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <Route className="w-4 h-4 mr-2" />
                Recommended Route
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tolls</p>
                    <p className="font-semibold">{optimizedRoute.tollCost}</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <strong>Route:</strong> {optimizedRoute.route}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <strong>Traffic:</strong> {optimizedRoute.trafficConditions}
                </div>
                <div>
                  <strong>Weather:</strong> {optimizedRoute.weatherImpact}
                </div>
              </div>

              <div className="text-sm text-green-600 font-medium">
                💡 {optimizedRoute.savings} compared to standard route
              </div>
            </div>

            {/* Waypoints */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Route Waypoints</h4>
              <div className="space-y-2">
                {optimizedRoute.waypoints.map((waypoint, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium">{waypoint.name}</span>
                      <span className="text-gray-500 ml-2">({waypoint.coordinates})</span>
                    </div>
                    <span className="text-blue-600 font-medium">{waypoint.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Routes */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Alternative Routes</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {optimizedRoute.alternativeRoutes.map((route, index) => (
                  <div key={index} className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium text-sm">{route.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      <div>Time: {route.time}</div>
                      <div>Distance: {route.distance}</div>
                      <div>Cost: {route.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteOptimizer;
