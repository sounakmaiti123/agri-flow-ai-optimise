import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ShoppingCart, Download, CreditCard, Package, DollarSign, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PriceChart from "./PriceChart";
import ExportDialog from "./ExportDialog";

const VendorDashboard = () => {
  const [showExport, setShowExport] = useState(false);
  const navigate = useNavigate();

  const inventory = [
    { product: "Wheat", quantity: 5000, unit: "kg", pricePerKg: 2.5, trend: "up", lastUpdate: "2 hours ago", supplier: "Farm A" },
    { product: "Corn", quantity: 3200, unit: "kg", pricePerKg: 1.8, trend: "down", lastUpdate: "4 hours ago", supplier: "Farm B" },
    { product: "Rice", quantity: 7500, unit: "kg", pricePerKg: 3.2, trend: "up", lastUpdate: "1 hour ago", supplier: "Storage 1" },
    { product: "Soybeans", quantity: 2800, unit: "kg", pricePerKg: 4.1, trend: "up", lastUpdate: "3 hours ago", supplier: "Farm C" },
  ];

  const orders = [
    { id: "ORD001", customer: "Restaurant Chain A", product: "Rice", quantity: 500, status: "pending" },
    { id: "ORD002", customer: "Grocery Store B", product: "Wheat", quantity: 1000, status: "processing" },
    { id: "ORD003", customer: "Food Processor C", product: "Corn", quantity: 800, status: "shipped" },
  ];

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-accent/15 text-accent-foreground border-accent/20";
      case "processing": return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "shipped": return "bg-primary/15 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const statCards = [
    { title: "Total Inventory", value: "18,500 kg", sub: "4 products in stock", icon: Package, color: "text-primary" },
    { title: "Total Value", value: "$52,340", sub: "Current market value", icon: DollarSign, color: "text-blue-500" },
    { title: "Active Orders", value: "8", sub: "2 pending delivery", icon: ShoppingCart, color: "text-accent-foreground" },
    { title: "Monthly Revenue", value: "$24,580", sub: "+18% from last month", icon: BarChart3, color: "text-primary" },
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
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Current stock levels and pricing</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setShowExport(true)} className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventory.map((item, index) => (
              <div key={index} className="border border-border/50 rounded-xl p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{item.product}</h3>
                    <p className="text-sm text-muted-foreground">From {item.supplier}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-primary" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${item.trend === "up" ? "text-primary" : "text-destructive"}`}>
                      ${item.pricePerKg}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {item.quantity.toLocaleString()} {item.unit}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Updated {item.lastUpdate}</span>
                  <span>Value: ${(item.quantity * item.pricePerKg).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span>Recent Orders</span>
            </CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-border/50 rounded-xl p-3 bg-card hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-foreground">{order.id}</h4>
                  <Badge className={`${getOrderStatusColor(order.status)} border`}>{order.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{order.customer}</p>
                  <p>{order.quantity} kg of {order.product}</p>
                </div>
                <Button size="sm" className="w-full mt-3 rounded-xl bg-primary hover:bg-primary/90" onClick={() => navigate("/payment")}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <PriceChart />
      </div>

      <ExportDialog open={showExport} onClose={() => setShowExport(false)} data={inventory} title="Inventory Report" />
    </div>
  );
};

export default VendorDashboard;
