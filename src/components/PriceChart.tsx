
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const PriceChart = () => {
  const priceData = [
    { month: "Jan", wheat: 2.1, corn: 1.5, rice: 2.8, soybeans: 3.8 },
    { month: "Feb", wheat: 2.3, corn: 1.6, rice: 2.9, soybeans: 3.9 },
    { month: "Mar", wheat: 2.2, corn: 1.7, rice: 3.0, soybeans: 4.0 },
    { month: "Apr", wheat: 2.4, corn: 1.8, rice: 3.1, soybeans: 4.1 },
    { month: "May", wheat: 2.5, corn: 1.8, rice: 3.2, soybeans: 4.1 },
    { month: "Jun", wheat: 2.5, corn: 1.8, rice: 3.2, soybeans: 4.1 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Price Trends</span>
        </CardTitle>
        <CardDescription>Historical market prices ($/kg)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="wheat" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Wheat"
            />
            <Line 
              type="monotone" 
              dataKey="corn" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Corn"
            />
            <Line 
              type="monotone" 
              dataKey="rice" 
              stroke="#ffc658" 
              strokeWidth={2}
              name="Rice"
            />
            <Line 
              type="monotone" 
              dataKey="soybeans" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Soybeans"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
