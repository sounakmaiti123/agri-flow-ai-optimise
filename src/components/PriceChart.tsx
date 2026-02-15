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
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Price Trends</span>
        </CardTitle>
        <CardDescription>Historical market prices ($/kg)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', color: 'hsl(var(--foreground))' }} />
            <Legend />
            <Line type="monotone" dataKey="wheat" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Wheat" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="corn" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Corn" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="rice" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Rice" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="soybeans" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Soybeans" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
