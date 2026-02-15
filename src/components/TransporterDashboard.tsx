import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock, Fuel, Download, Route, Package, Gauge } from "lucide-react";
import RouteOptimizer from "./RouteOptimizer";
import ExportDialog from "./ExportDialog";
import GoogleMapsIntegration from "./GoogleMapsIntegration";

const TransporterDashboard = () => {
  const [showExport, setShowExport] = useState(false);

  const routes = [
    { id: "RT001", origin: "Hooghly Rice Farm - Chinsurah", destination: "Sealdah Wholesale Market - Kolkata", distance: "45 km", estimatedTime: "1h 20m", fuelCost: "$25", status: "active", cargo: "2,500 kg Rice" },
    { id: "RT002", origin: "Burdwan Potato Farm - Memari", destination: "Howrah Processing Plant", distance: "32 km", estimatedTime: "55m", fuelCost: "$18", status: "scheduled", cargo: "1,800 kg Potatoes" },
    { id: "RT003", origin: "Nadia Jute Farm - Krishnanagar", destination: "Kolkata Port - Haldia Terminal", distance: "78 km", estimatedTime: "2h 15m", fuelCost: "$42", status: "completed", cargo: "3,200 kg Jute" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary/15 text-primary border-primary/20";
      case "scheduled": return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "completed": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const statCards = [
    { title: "Active Routes", value: "3", sub: "2 in progress", icon: Route, color: "text-primary" },
    { title: "Total Distance", value: "155 km", sub: "Today's routes", icon: MapPin, color: "text-blue-500" },
    { title: "Fuel Cost", value: "$85", sub: "-15% optimized", icon: Fuel, color: "text-accent-foreground" },
    { title: "Cargo Volume", value: "7,500 kg", sub: "85% capacity", icon: Package, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
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

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Route Management</CardTitle>
            <CardDescription>Current and scheduled transportation routes</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setShowExport(true)} className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="border border-border/50 rounded-xl p-4 bg-card hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-foreground">{route.id}</h3>
                      <Badge className={`${getStatusColor(route.status)} border`}>{route.status}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary" />{route.origin} → {route.destination}</div>
                      <div className="flex items-center"><Truck className="w-4 h-4 mr-1 text-primary" />{route.cargo}</div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-1 text-blue-500" />{route.distance} • {route.estimatedTime}</div>
                      <div className="flex items-center"><Fuel className="w-4 h-4 mr-1 text-accent-foreground" />{route.fuelCost}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <GoogleMapsIntegration routeId={route.id} origin={route.origin} destination={route.destination} onViewRoute={() => {}} variant="view" />
                    {route.status === "scheduled" && (
                      <GoogleMapsIntegration routeId={route.id} origin={route.origin} destination={route.destination} onViewRoute={() => {}} variant="start" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RouteOptimizer />
      <ExportDialog open={showExport} onClose={() => setShowExport(false)} data={routes} title="Transportation Routes Report" />
    </div>
  );
};

export default TransporterDashboard;
