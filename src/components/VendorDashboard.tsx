
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ShoppingCart, Calendar, Download, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PriceChart from "./PriceChart";
import ExportDialog from "./ExportDialog";

const VendorDashboard = () => {
  const [showExport, setShowExport] = useState(false);
  const navigate = useNavigate();

  const inventory = [
    {
      product: "Wheat",
      quantity: 5000,
      unit: "kg",
      pricePerKg: 2.5,
      trend: "up",
      lastUpdate: "2 hours ago",
      supplier: "Farm A"
    },
    {
      product: "Corn",
      quantity: 3200,
      unit: "kg",
      pricePerKg: 1.8,
      trend: "down",
      lastUpdate: "4 hours ago",
      supplier: "Farm B"
    },
    {
      product: "Rice",
      quantity: 7500,
      unit: "kg",
      pricePerKg: 3.2,
      trend: "up",
      lastUpdate: "1 hour ago",
      supplier: "Storage 1"
    },
    {
      product: "Soybeans",
      quantity: 2800,
      unit: "kg",
      pricePerKg: 4.1,
      trend: "up",
      lastUpdate: "3 hours ago",
      supplier: "Farm C"
    }
  ];

  const orders = [
    { id: "ORD001", customer: "Restaurant Chain A", product: "Rice", quantity: 500, status: "pending" },
    { id: "ORD002", customer: "Grocery Store B", product: "Wheat", quantity: 1000, status: "processing" },
    { id: "ORD003", customer: "Food Processor C", product: "Corn", quantity: 800, status: "shipped" },
  ];

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-green-100 text-green-800";
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
            <div className="text-2xl font-bold text-green-600">18,500 kg</div>
            <p className="text-xs text-gray-500 mt-1">4 products in stock</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$52,340</div>
            <p className="text-xs text-gray-500 mt-1">Current market value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-xs text-gray-500 mt-1">2 pending delivery</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$24,580</div>
            <p className="text-xs text-gray-500 mt-1">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Current stock levels and pricing</CardDescription>
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
            {inventory.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.product}</h3>
                    <p className="text-sm text-gray-600">From {item.supplier}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      ${item.pricePerKg}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {item.quantity.toLocaleString()} {item.unit}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Updated {item.lastUpdate}</span>
                  <span>Value: ${(item.quantity * item.pricePerKg).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders and Price Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Recent Orders</span>
            </CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{order.id}</h4>
                  <Badge className={getOrderStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{order.customer}</p>
                  <p>{order.quantity} kg of {order.product}</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => navigate("/payment")}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <PriceChart />
      </div>

      <ExportDialog 
        open={showExport}
        onClose={() => setShowExport(false)}
        data={inventory}
        title="Inventory Report"
      />
    </div>
  );
};

export default VendorDashboard;
