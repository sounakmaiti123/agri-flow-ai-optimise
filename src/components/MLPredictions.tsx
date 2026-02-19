import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Brain, TrendingUp, TrendingDown, Minus, Zap, Leaf, Activity, Sparkles, FlaskConical, ChevronDown, ChevronUp } from "lucide-react";

// ── Static chart data ──────────────────────────────────────────────
const yieldChartData = [
  { month: "Mar", wheat: 2100, corn: 1600, rice: 2900, soybeans: 1400 },
  { month: "Apr", wheat: 2250, corn: 1720, rice: 3050, soybeans: 1440 },
  { month: "May", wheat: 2400, corn: 1800, rice: 3200, soybeans: 1500 },
  { month: "Jun", wheat: 2600, corn: 1950, rice: 3100, soybeans: 1520 },
  { month: "Jul", wheat: 2750, corn: 2100, rice: 2980, soybeans: 1540 },
  { month: "Aug (pred)", wheat: 2980, corn: 2250, rice: 2900, soybeans: 1560 },
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

// ── Helper components ──────────────────────────────────────────────
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

// ── Yield Prediction simulation logic ─────────────────────────────
interface YieldInputs {
  crop: string;
  soilNitrogen: number;
  soilPhosphorus: number;
  soilPotassium: number;
  rainfall: number;
  temperature: number;
  irrigation: string;
  fieldArea: string;
  pestControl: string;
}

interface YieldResult {
  predicted: number;
  confidence: number;
  trend: string;
  change: string;
  tips: string[];
}

function simulateYieldPrediction(inputs: YieldInputs): YieldResult {
  const baseYields: Record<string, number> = { wheat: 2500, corn: 1800, rice: 3200, soybeans: 1500 };
  const base = baseYields[inputs.crop] || 2000;
  let multiplier = 1.0;
  let confidence = 75;

  // Soil NPK effect
  const npkScore = (inputs.soilNitrogen + inputs.soilPhosphorus + inputs.soilPotassium) / 3;
  multiplier += (npkScore - 50) * 0.004;

  // Rainfall effect
  const optimalRain: Record<string, number> = { wheat: 450, corn: 600, rice: 1200, soybeans: 500 };
  const rainDiff = Math.abs(inputs.rainfall - (optimalRain[inputs.crop] || 600));
  multiplier -= rainDiff * 0.0003;

  // Temperature effect
  const optimalTemp: Record<string, number> = { wheat: 22, corn: 27, rice: 30, soybeans: 25 };
  const tempDiff = Math.abs(inputs.temperature - (optimalTemp[inputs.crop] || 25));
  multiplier -= tempDiff * 0.01;

  // Irrigation boost
  if (inputs.irrigation === "drip") { multiplier += 0.12; confidence += 8; }
  else if (inputs.irrigation === "sprinkler") { multiplier += 0.07; confidence += 5; }
  else if (inputs.irrigation === "flood") { multiplier += 0.03; confidence += 2; }

  // Pest control boost
  if (inputs.pestControl === "integrated") { multiplier += 0.1; confidence += 5; }
  else if (inputs.pestControl === "chemical") { multiplier += 0.06; confidence += 3; }
  else if (inputs.pestControl === "organic") { multiplier += 0.04; confidence += 2; }

  // Field area scaling
  const area = parseFloat(inputs.fieldArea) || 1;
  const predicted = Math.max(500, Math.round(base * multiplier * area));
  confidence = Math.min(97, Math.max(60, confidence));

  const pctChange = (((predicted / base) - 1) * 100).toFixed(1);
  const trend = parseFloat(pctChange) > 2 ? "up" : parseFloat(pctChange) < -2 ? "down" : "stable";

  const tips: string[] = [];
  if (inputs.soilNitrogen < 40) tips.push("Increase nitrogen fertilizer");
  if (inputs.rainfall < 300) tips.push("Supplement with irrigation");
  if (inputs.pestControl === "none") tips.push("Apply pest control for higher yield");
  if (inputs.irrigation === "none") tips.push("Add irrigation for 10–15% boost");
  if (tips.length === 0) tips.push("Conditions are optimal — maintain current practices");

  return {
    predicted,
    confidence,
    trend,
    change: `${parseFloat(pctChange) >= 0 ? "+" : ""}${pctChange}%`,
    tips,
  };
}

// ── Price Prediction simulation logic ──────────────────────────────
interface PriceInputs {
  crop: string;
  season: string;
  region: string;
  stockLevel: string;
  exportDemand: number;
  fuelCost: number;
  inflationRate: number;
}

interface PriceResult {
  predicted: number;
  unit: string;
  confidence: number;
  trend: string;
  change: string;
  reason: string;
}

function simulatePricePrediction(inputs: PriceInputs): PriceResult {
  const basePrices: Record<string, number> = { wheat: 2.5, corn: 1.8, rice: 3.2, soybeans: 4.1 };
  let price = basePrices[inputs.crop] || 2.5;
  let confidence = 78;

  // Season effect
  if (inputs.season === "peak") { price *= 1.18; confidence += 5; }
  else if (inputs.season === "offseason") { price *= 0.88; confidence += 4; }
  else if (inputs.season === "rabi") { price *= 1.08; confidence += 3; }
  else if (inputs.season === "kharif") { price *= 1.05; confidence += 3; }

  // Region effect
  if (inputs.region === "export") { price *= 1.12; confidence += 4; }
  else if (inputs.region === "urban") { price *= 1.06; confidence += 2; }
  else if (inputs.region === "rural") { price *= 0.94; }

  // Stock level effect
  if (inputs.stockLevel === "low") { price *= 1.15; confidence += 5; }
  else if (inputs.stockLevel === "high") { price *= 0.91; }
  else if (inputs.stockLevel === "surplus") { price *= 0.85; }

  // Export demand
  price += (inputs.exportDemand - 50) * 0.008;

  // Fuel cost pass-through
  price += (inputs.fuelCost - 80) * 0.002;

  // Inflation
  price += inputs.inflationRate * 0.04;

  const base = basePrices[inputs.crop] || 2.5;
  const pctChange = (((price / base) - 1) * 100).toFixed(1);
  const trend = parseFloat(pctChange) > 2 ? "up" : parseFloat(pctChange) < -2 ? "down" : "stable";
  confidence = Math.min(97, Math.max(60, confidence));

  const reasons: string[] = [];
  if (inputs.stockLevel === "low") reasons.push("low stock supply");
  if (inputs.exportDemand > 65) reasons.push("high export demand");
  if (inputs.season === "peak") reasons.push("peak season pricing");
  if (inputs.fuelCost > 100) reasons.push("elevated fuel/transport cost");
  if (reasons.length === 0) reasons.push("stable market conditions with balanced supply and demand");

  return {
    predicted: parseFloat(price.toFixed(2)),
    unit: "$/kg",
    confidence,
    trend,
    change: `${parseFloat(pctChange) >= 0 ? "+" : ""}${pctChange}%`,
    reason: `Driven by ${reasons.join(", ")}.`,
  };
}

// ── Main component ─────────────────────────────────────────────────
const MLPredictions = () => {
  // Yield form state
  const [yieldInputs, setYieldInputs] = useState<YieldInputs>({
    crop: "wheat",
    soilNitrogen: 55,
    soilPhosphorus: 50,
    soilPotassium: 50,
    rainfall: 450,
    temperature: 24,
    irrigation: "drip",
    fieldArea: "1",
    pestControl: "integrated",
  });
  const [yieldResult, setYieldResult] = useState<YieldResult | null>(null);
  const [yieldExpanded, setYieldExpanded] = useState(false);

  // Price form state
  const [priceInputs, setPriceInputs] = useState<PriceInputs>({
    crop: "wheat",
    season: "peak",
    region: "urban",
    stockLevel: "medium",
    exportDemand: 55,
    fuelCost: 85,
    inflationRate: 5,
  });
  const [priceResult, setPriceResult] = useState<PriceResult | null>(null);
  const [priceExpanded, setPriceExpanded] = useState(false);

  const handleYieldPredict = () => {
    setYieldResult(simulateYieldPrediction(yieldInputs));
  };

  const handlePricePredict = () => {
    setPriceResult(simulatePricePrediction(priceInputs));
  };

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
                <CardDescription>Input your farm attributes to get a personalized yield prediction</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">

          {/* ── Yield Input Form ── */}
          <div className="rounded-xl border border-primary/20 bg-primary/3 p-5 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Enter Farm Attributes</span>
            </div>

            {/* Row 1: Crop, Irrigation, Pest, Area */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Crop Type</Label>
                <Select value={yieldInputs.crop} onValueChange={v => setYieldInputs(p => ({ ...p, crop: v }))}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Irrigation Type</Label>
                <Select value={yieldInputs.irrigation} onValueChange={v => setYieldInputs(p => ({ ...p, irrigation: v }))}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drip">Drip</SelectItem>
                    <SelectItem value="sprinkler">Sprinkler</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Pest Control</Label>
                <Select value={yieldInputs.pestControl} onValueChange={v => setYieldInputs(p => ({ ...p, pestControl: v }))}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="integrated">Integrated (IPM)</SelectItem>
                    <SelectItem value="chemical">Chemical</SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Field Area (acres)</Label>
                <Input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={yieldInputs.fieldArea}
                  onChange={e => setYieldInputs(p => ({ ...p, fieldArea: e.target.value }))}
                  className="h-9 text-sm"
                  placeholder="e.g. 1.5"
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Soil Nitrogen (N)", key: "soilNitrogen", min: 0, max: 100, unit: "%" },
                { label: "Soil Phosphorus (P)", key: "soilPhosphorus", min: 0, max: 100, unit: "%" },
                { label: "Soil Potassium (K)", key: "soilPotassium", min: 0, max: 100, unit: "%" },
                { label: "Rainfall", key: "rainfall", min: 100, max: 2000, unit: "mm" },
                { label: "Temperature", key: "temperature", min: 10, max: 45, unit: "°C" },
              ].map(({ label, key, min, max, unit }) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">{label}</Label>
                    <span className="text-xs font-semibold text-foreground">
                      {yieldInputs[key as keyof YieldInputs]} {unit}
                    </span>
                  </div>
                  <Slider
                    min={min}
                    max={max}
                    step={1}
                    value={[yieldInputs[key as keyof YieldInputs] as number]}
                    onValueChange={([v]) => setYieldInputs(p => ({ ...p, [key]: v }))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <Button onClick={handleYieldPredict} className="w-full gap-2">
              <Brain className="w-4 h-4" />
              Predict Yield
            </Button>
          </div>

          {/* ── Yield Result ── */}
          {yieldResult && (
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-semibold text-foreground">Prediction Result</span>
                {getTrendBadge(yieldResult.trend, yieldResult.change)}
              </div>
              <div className="flex items-end gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Predicted Yield</p>
                  <p className="text-3xl font-bold text-primary">{yieldResult.predicted.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kg</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Confidence</p>
                  <p className={`text-2xl font-bold ${getConfidenceColor(yieldResult.confidence)}`}>{yieldResult.confidence}%</p>
                </div>
              </div>
              <Progress value={yieldResult.confidence} className="h-2" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">AI Recommendations</p>
                {yieldResult.tips.map((tip, i) => (
                  <p key={i} className="text-xs text-foreground bg-muted/50 rounded-lg px-3 py-1.5 border border-border/30">💡 {tip}</p>
                ))}
              </div>
            </div>
          )}

          {/* ── Trend Chart (collapsible) ── */}
          <button
            onClick={() => setYieldExpanded(v => !v)}
            className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Historical Yield Trend</span>
            {yieldExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {yieldExpanded && (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={yieldChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  {["chart-1","chart-2","chart-3","chart-4"].map((c, i) => (
                    <linearGradient key={i} id={`yg${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={`hsl(var(--${c}))`} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={`hsl(var(--${c}))`} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', color: 'hsl(var(--foreground))', fontSize: 12 }} />
                <ReferenceLine x="Aug (pred)" stroke="hsl(var(--primary))" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="wheat" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#yg0)" name="Wheat" />
                <Area type="monotone" dataKey="corn" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#yg1)" name="Corn" />
                <Area type="monotone" dataKey="rice" stroke="hsl(var(--chart-3))" strokeWidth={2} fill="url(#yg2)" name="Rice" />
                <Area type="monotone" dataKey="soybeans" stroke="hsl(var(--chart-4))" strokeWidth={2} fill="url(#yg3)" name="Soybeans" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* ── Section 2: ML Price Forecasting ── */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-chart-2/8 via-chart-2/3 to-transparent border-b border-border/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-chart-2/15 flex items-center justify-center">
              <Zap className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                ML Price Forecasting
                <Badge className="bg-chart-2/15 text-chart-2 border border-chart-2/20 text-xs font-normal">LSTM Model</Badge>
              </CardTitle>
              <CardDescription>Enter market attributes to forecast 3-month crop prices</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">

          {/* ── Price Input Form ── */}
          <div className="rounded-xl border border-chart-2/20 bg-chart-2/3 p-5 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical className="w-4 h-4 text-chart-2" />
              <span className="text-sm font-semibold text-foreground">Enter Market Attributes</span>
            </div>

            {/* Row 1: selects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Crop Type</Label>
                <Select value={priceInputs.crop} onValueChange={v => setPriceInputs(p => ({ ...p, crop: v }))}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Season</Label>
                <Select value={priceInputs.season} onValueChange={v => setPriceInputs(p => ({ ...p, season: v }))}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peak">Peak Season</SelectItem>
                    <SelectItem value="offseason">Off-Season</SelectItem>
                    <SelectItem value="rabi">Rabi</SelectItem>
                    <SelectItem value="kharif">Kharif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Market Region</Label>
                <Select value={priceInputs.region} onValueChange={v => setPriceInputs(p => ({ ...p, region: v }))}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="export">Export Market</SelectItem>
                    <SelectItem value="urban">Urban Mandi</SelectItem>
                    <SelectItem value="rural">Rural Mandi</SelectItem>
                    <SelectItem value="local">Local Market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Stock Level</Label>
                <Select value={priceInputs.stockLevel} onValueChange={v => setPriceInputs(p => ({ ...p, stockLevel: v }))}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="medium">Medium Stock</SelectItem>
                    <SelectItem value="high">High Stock</SelectItem>
                    <SelectItem value="surplus">Surplus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Export Demand", key: "exportDemand", min: 0, max: 100, unit: "%" },
                { label: "Fuel / Transport Cost", key: "fuelCost", min: 50, max: 200, unit: "₹/L" },
                { label: "Inflation Rate", key: "inflationRate", min: 0, max: 20, unit: "%" },
              ].map(({ label, key, min, max, unit }) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">{label}</Label>
                    <span className="text-xs font-semibold text-foreground">
                      {priceInputs[key as keyof PriceInputs]} {unit}
                    </span>
                  </div>
                  <Slider
                    min={min}
                    max={max}
                    step={1}
                    value={[priceInputs[key as keyof PriceInputs] as number]}
                    onValueChange={([v]) => setPriceInputs(p => ({ ...p, [key]: v }))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <Button onClick={handlePricePredict} className="w-full gap-2">
              <Brain className="w-4 h-4" />
              Forecast Price
            </Button>
          </div>

          {/* ── Price Result ── */}
          {priceResult && (
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Price Forecast Result</span>
                {getTrendBadge(priceResult.trend, priceResult.change)}
              </div>
              <div className="flex items-end gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Predicted Price (3 months)</p>
                  <p className="text-3xl font-bold text-primary">{priceResult.predicted} <span className="text-lg font-normal text-muted-foreground">{priceResult.unit}</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">LSTM Confidence</p>
                  <p className={`text-2xl font-bold ${getConfidenceColor(priceResult.confidence)}`}>{priceResult.confidence}%</p>
                </div>
              </div>
              <Progress value={priceResult.confidence} className="h-2" />
              <p className="text-xs text-foreground bg-muted/50 rounded-lg px-3 py-2 border border-border/30">
                💡 {priceResult.reason}
              </p>
            </div>
          )}

          {/* ── Price Trend Chart (collapsible) ── */}
          <button
            onClick={() => setPriceExpanded(v => !v)}
            className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Historical Price Trend</span>
            {priceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {priceExpanded && (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={priceChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', color: 'hsl(var(--foreground))', fontSize: 12 }} />
                <ReferenceLine x="May (pred)" stroke="hsl(var(--primary))" strokeDasharray="4 4" />
                <Bar dataKey="wheat" fill="hsl(var(--chart-1))" radius={[3,3,0,0]} name="Wheat" opacity={0.85} />
                <Bar dataKey="corn" fill="hsl(var(--chart-2))" radius={[3,3,0,0]} name="Corn" opacity={0.85} />
                <Bar dataKey="rice" fill="hsl(var(--chart-3))" radius={[3,3,0,0]} name="Rice" opacity={0.85} />
                <Bar dataKey="soybeans" fill="hsl(var(--chart-4))" radius={[3,3,0,0]} name="Soybeans" opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Summary Stats */}
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
