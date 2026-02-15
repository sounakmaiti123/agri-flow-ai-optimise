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
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
  const [avoidOptions, setAvoidOptions] = useState({ tolls: false, highways: false, ferries: false, unpaved: false, construction: false });

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizedRoute({
        distance: "42.5 km", estimatedTime: "1h 15m", fuelCost: "$22.50", tollCost: "$3.50", savings: "15% less fuel",
        route: "Farm Location → NH-6 → Kolkata-Durgapur Expressway → Market District",
        waypoints: [
          { name: "Starting Point", coordinates: "22.8786°N, 87.7862°E", time: "0:00" },
          { name: "NH-6 Junction", coordinates: "22.8920°N, 87.7650°E", time: "0:12" },
          { name: "Expressway Entry", coordinates: "22.9150°N, 87.7200°E", time: "0:35" },
          { name: "Market District", coordinates: "22.9500°N, 87.6800°E", time: "1:15" },
        ],
        alternativeRoutes: [
          { name: "Fastest Route", time: "1h 15m", distance: "42.5 km", cost: "$22.50" },
          { name: "Shortest Route", time: "1h 28m", distance: "38.2 km", cost: "$19.80" },
          { name: "Economic Route", time: "1h 45m", distance: "44.8 km", cost: "$18.90" },
        ],
        trafficConditions: "Moderate traffic expected",
        weatherImpact: "Clear weather, no delays expected",
      });
      setIsOptimizing(false);
    }, 3000);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-primary" />
          <span>Advanced Route Optimizer</span>
        </CardTitle>
        <CardDescription>Comprehensive route planning with traffic, weather, and cost optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pickup Location</Label>
            <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select pickup location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="current-location">Current Location</SelectItem>
                <SelectItem value="farm-a">Howrah Agricultural Hub</SelectItem>
                <SelectItem value="farm-b">Hooghly Crop Storage</SelectItem>
                <SelectItem value="storage-1">Burdwan Grain Terminal</SelectItem>
                <SelectItem value="processing-plant">Durgapur Processing Plant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Destination</Label>
            <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select destination" /></SelectTrigger>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select vehicle" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mini-truck"><div className="flex items-center gap-2"><Car className="w-4 h-4" />Mini Truck (1-2 tons)</div></SelectItem>
                <SelectItem value="medium-truck"><div className="flex items-center gap-2"><Truck className="w-4 h-4" />Medium Truck (3-7 tons)</div></SelectItem>
                <SelectItem value="heavy-truck"><div className="flex items-center gap-2"><Truck className="w-4 h-4" />Heavy Truck (8+ tons)</div></SelectItem>
                <SelectItem value="motorcycle"><div className="flex items-center gap-2"><Bike className="w-4 h-4" />Motorcycle/Scooter</div></SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Cargo Weight (kg)</Label>
            <Input placeholder="e.g., 2500" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Cargo Type</Label>
            <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select cargo type" /></SelectTrigger>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Route Priority</Label>
            <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fastest">Fastest Route</SelectItem>
                <SelectItem value="shortest">Shortest Distance</SelectItem>
                <SelectItem value="cheapest">Most Economical</SelectItem>
                <SelectItem value="balanced">Balanced (Time + Cost)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Preferred Departure Time</Label>
            <Select><SelectTrigger className="rounded-xl"><SelectValue placeholder="Select time" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Leave Now</SelectItem>
                <SelectItem value="early-morning">Early Morning (5-7 AM)</SelectItem>
                <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12-3 PM)</SelectItem>
                <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Route Restrictions (Avoid)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries({ tolls: "Toll Roads", highways: "Highways", ferries: "Ferries", unpaved: "Unpaved Roads", construction: "Construction Zones" }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox id={key} checked={avoidOptions[key as keyof typeof avoidOptions]} onCheckedChange={(checked) => setAvoidOptions(prev => ({ ...prev, [key]: checked as boolean }))} />
                <Label htmlFor={key} className="text-sm">{label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2"><Checkbox id="weather" defaultChecked /><Label htmlFor="weather" className="text-sm">Include weather delays</Label></div>
          <div className="flex items-center space-x-2"><Checkbox id="traffic" defaultChecked /><Label htmlFor="traffic" className="text-sm">Use live traffic data</Label></div>
        </div>

        <Button onClick={handleOptimize} disabled={isOptimizing} className="w-full rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
          {isOptimizing ? "Analyzing Routes..." : "Find Optimal Route"}
        </Button>

        {optimizedRoute && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="border border-primary/20 rounded-xl p-4 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center">
                <Route className="w-4 h-4 mr-2 text-primary" />Recommended Route
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { icon: MapPin, color: "text-primary", label: "Distance", value: optimizedRoute.distance },
                  { icon: Clock, color: "text-blue-500", label: "Est. Time", value: optimizedRoute.estimatedTime },
                  { icon: Fuel, color: "text-accent-foreground", label: "Fuel Cost", value: optimizedRoute.fuelCost },
                  { icon: AlertTriangle, color: "text-accent-foreground", label: "Tolls", value: optimizedRoute.tollCost },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-2"><strong>Route:</strong> {optimizedRoute.route}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                <span><strong>Traffic:</strong> {optimizedRoute.trafficConditions}</span>
                <span><strong>Weather:</strong> {optimizedRoute.weatherImpact}</span>
              </div>
              <p className="text-sm text-primary font-medium">💡 {optimizedRoute.savings} compared to standard route</p>
            </div>

            <div className="border border-border/50 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-3">Route Waypoints</h4>
              <div className="space-y-2">
                {optimizedRoute.waypoints.map((wp: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span><span className="font-medium text-foreground">{wp.name}</span> <span className="text-muted-foreground">({wp.coordinates})</span></span>
                    <span className="text-primary font-medium">{wp.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border/50 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-3">Alternative Routes</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {optimizedRoute.alternativeRoutes.map((route: any, i: number) => (
                  <div key={i} className="border border-border/50 rounded-xl p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                    <div className="font-medium text-sm text-foreground">{route.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
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
