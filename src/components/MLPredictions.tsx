import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Brain, TrendingUp, TrendingDown, Minus, Zap, Leaf, Activity } from "lucide-react";

const yieldPredictions = [
  { crop: "Wheat", currentYield: 2500, predictedYield: 2980, confidence: 92, trend: "up", change: "+19.2%", season: "Rabi 2025", factors: ["Optimal rainfall", "Good soil NPK", "Pest-free zone"] },
  { crop: "Corn", currentYield: 1800, predictedYield: 2250, confidence: 87, trend: "up", change: "+25%", season: "Kharif 2025", factors: ["Improved seed variety", "Drip irrigation ready", "High demand zone"] },
  { crop: "Rice", currentYield: 3200, predictedYield: 2900, confidence: 79, trend: "down", change: "-9.4%", season: "Kharif 2025", factors: ["Water stress risk", "Monsoon delay likely", "Alternative advised"] },
  { crop: "Soybeans", currentYield: 1500, predictedYield: 1560, confidence: 84, trend: "stable", change: "+4%", season: "Kharif 2025", factors: ["Stable conditions", "Market demand steady", "Low risk"] },
];

const yieldChartData = [
  { month: "Mar", wheat: 2100, corn: 1600, rice: 2900, soybeans: 1400 },
  { month: "Apr", wheat: 2250, corn: 1720, rice: 3050, soybeans: 1440 },
  { month: "May", wheat: 2400, corn: 1800, rice: 3200, soybeans: 1500 },
  { month: "Jun", wheat: 2600, corn: 1950, rice: 3100, soybeans: 1520 },
  { month: "Jul", wheat: 2750, corn: 2100, rice: 2980, soybeans: 1540 },
  { month: "Aug (pred)", wheat: 2980, corn: 2250, rice: 2900, soybeans: 1560 },
];

const pricePredictions = [
  { crop: "Wheat", currentPrice: 2.5, predictedPrice: 3.1, unit: "$/kg", confidence: 88, trend: "up", change: "+24%", reason: "Export demand surge from Eastern Europe" },
  { crop: "Corn", currentPrice: 1.8, predictedPrice: 1.65, unit: "$/kg", confidence: 82, trend: "down", change: "-8.3%", reason: "Bumper harvest expected globally" },
  { crop: "Rice", currentPrice: 3.2, predictedPrice: 3.8, unit: "$/kg", confidence: 91, trend: "up", change: "+18.7%", reason: "Monsoon disruption in Southeast Asia" },
  { crop: "Soybeans", currentPrice: 4.1, predictedPrice: 4.3, unit: "$/kg", confidence: 76, trend: "up", change: "+4.9%", reason: "Steady feed industry demand" },
];

const priceChartData = [
  { month: "Jan", wheat: 2.1, corn: 1.5, rice: 2.8, soybeans: 3.8 },
  { month: "Feb", wheat: 2.3, corn: 1.6, rice: 2.9, soybeans: 3.9 },
  { month: "Mar", wheat: 2.4, corn: 1.75, rice: 3.0, soybeans: 4.0 },
  { month: "Apr", wheat: 2.5, corn: 1.8, rice: 3.2, soybeans: 4.1 },
  { month: "May (pred)", wheat: 2.7, corn: 1.72, rice: 3.5, soybeans: 4.2 },
  { month: "Jun (pred)", wheat: 2.9, corn: 1.67, rice: 3.65, soybeans: 4.25 },
  { month: "Jul (pred)", wheat: 3.1, corn: 1.65, rice: 3.8, soybeans: 4.3 },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const getTrendBadge = (trend: string, change: string) => {
  if (trend === "up") return <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs">{change}</Badge>;
  if (trend === "down") return <Badge className="bg-destructive/15 text-destructive border border-destructive/20 text-xs">{change}</Badge>;
  return <Badge className="bg-muted text-muted-foreground border border-border text-xs">{change}</Badge>;
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 88) return "text-emerald-500";
  if (confidence >= 78) return "text-primary";
  return "text-amber-500";
};

const MLPredictions = () => {
  return (
    <div className="space-y-6">
      {/* ── Section 1: ML Crop Yield Prediction ── */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/8 via-primary/3 to-transparent border-b border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  ML Crop Yield Prediction
                  <Badge className="bg-primary/15 text-primary border border-primary/20 text-xs font-normal">AI Powered</Badge>
                </CardTitle>
                <CardDescription>Predicted yields for upcoming season using ML model on soil, weather & historical data</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Yield Trend Chart */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Yield Forecast Trend (kg)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={yieldChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="wheatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cornGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="riceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="soybeanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', color: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <ReferenceLine x="Aug (pred)" stroke="hsl(var(--primary))" strokeDasharray="4 4" label={{ value: "Prediction", fill: "hsl(var(--primary))", fontSize: 10 }} />
                <Area type="monotone" dataKey="wheat" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#wheatGrad)" name="Wheat" />
                <Area type="monotone" dataKey="corn" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#cornGrad)" name="Corn" />
                <Area type="monotone" dataKey="rice" stroke="hsl(var(--chart-3))" strokeWidth={2} fill="url(#riceGrad)" name="Rice" />
                <Area type="monotone" dataKey="soybeans" stroke="hsl(var(--chart-4))" strokeWidth={2} fill="url(#soybeanGrad)" name="Soybeans" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Crop-wise prediction cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yieldPredictions.map((item, i) => (
              <div key={i} className="border border-border/50 rounded-xl p-4 bg-card hover:bg-muted/20 transition-colors space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendIcon trend={item.trend} />
                    <span className="font-semibold text-foreground">{item.crop}</span>
                    <span className="text-xs text-muted-foreground">{item.season}</span>
                  </div>
                  {getTrendBadge(item.trend, item.change)}
                </div>

                <div className="flex items-end gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-lg font-bold text-foreground">{item.currentYield.toLocaleString()} kg</p>
                  </div>
                  <div className="text-muted-foreground pb-1">→</div>
                  <div>
                    <p className="text-xs text-muted-foreground">Predicted</p>
                    <p className="text-lg font-bold text-primary">{item.predictedYield.toLocaleString()} kg</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> Model Confidence</span>
                    <span className={`font-semibold ${getConfidenceColor(item.confidence)}`}>{item.confidence}%</span>
                  </div>
                  <Progress value={item.confidence} className="h-1.5" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.factors.map((f, j) => (
                    <span key={j} className="text-xs bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border/40">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Section 2: ML Price Prediction ── */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-chart-2/8 via-chart-2/3 to-transparent border-b border-border/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-chart-2/15 flex items-center justify-center">
              <Zap className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                ML Price Forecasting
                <Badge className="bg-chart-2/15 text-chart-2 border border-chart-2/20 text-xs font-normal">Real-time Model</Badge>
              </CardTitle>
              <CardDescription>Next 3-month market price predictions using LSTM time-series model on historical prices & market signals</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Price Forecast Chart */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Price Forecast ($/kg) — Shaded area = predictions
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={priceChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', color: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <ReferenceLine x="May (pred)" stroke="hsl(var(--primary))" strokeDasharray="4 4" />
                <Bar dataKey="wheat" fill="hsl(var(--chart-1))" radius={[3, 3, 0, 0]} name="Wheat" opacity={0.85} />
                <Bar dataKey="corn" fill="hsl(var(--chart-2))" radius={[3, 3, 0, 0]} name="Corn" opacity={0.85} />
                <Bar dataKey="rice" fill="hsl(var(--chart-3))" radius={[3, 3, 0, 0]} name="Rice" opacity={0.85} />
                <Bar dataKey="soybeans" fill="hsl(var(--chart-4))" radius={[3, 3, 0, 0]} name="Soybeans" opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Price prediction cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricePredictions.map((item, i) => (
              <div key={i} className="border border-border/50 rounded-xl p-4 bg-card hover:bg-muted/20 transition-colors space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendIcon trend={item.trend} />
                    <span className="font-semibold text-foreground">{item.crop}</span>
                  </div>
                  {getTrendBadge(item.trend, item.change)}
                </div>

                <div className="flex items-end gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-xl font-bold text-foreground">{item.currentPrice} <span className="text-sm font-normal text-muted-foreground">{item.unit}</span></p>
                  </div>
                  <div className="text-muted-foreground pb-1">→</div>
                  <div>
                    <p className="text-xs text-muted-foreground">Predicted (3mo)</p>
                    <p className="text-xl font-bold text-primary">{item.predictedPrice} <span className="text-sm font-normal text-muted-foreground">{item.unit}</span></p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> LSTM Confidence</span>
                    <span className={`font-semibold ${getConfidenceColor(item.confidence)}`}>{item.confidence}%</span>
                  </div>
                  <Progress value={item.confidence} className="h-1.5" />
                </div>

                <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 border border-border/30">
                  💡 {item.reason}
                </p>
              </div>
            ))}
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Avg Price Increase", value: "+9.8%", color: "text-emerald-500" },
              { label: "Best Opportunity", value: "Rice", color: "text-primary" },
              { label: "Model Accuracy", value: "91.3%", color: "text-primary" },
              { label: "Data Points", value: "5,280", color: "text-muted-foreground" },
            ].map((s, i) => (
              <div key={i} className="bg-muted/40 rounded-xl p-3 border border-border/40 text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLPredictions;
