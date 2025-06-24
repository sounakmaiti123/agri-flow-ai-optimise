
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Thermometer } from "lucide-react";

interface Crop {
  name: string;
  quantity: number;
  unit: string;
  status: string;
  location: string;
  harvestDate?: string;
  quality?: string;
  temperature?: string;
}

interface CropInventoryProps {
  crops: Crop[];
}

const CropInventory = ({ crops }: CropInventoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "harvested": return "bg-green-100 text-green-800";
      case "ready": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "planted": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Premium": return "text-green-600";
      case "Good": return "text-blue-600";
      case "Fair": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {crops.map((crop, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{crop.name}</CardTitle>
              <Badge className={getStatusColor(crop.status)}>
                {crop.status}
              </Badge>
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {crop.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {crop.quantity.toLocaleString()} {crop.unit}
              </div>
              {crop.quality && (
                <div className={`text-sm font-medium ${getQualityColor(crop.quality)}`}>
                  Quality: {crop.quality}
                </div>
              )}
            </div>

            <Progress value={75} className="h-2" />

            <div className="space-y-2 text-sm text-gray-600">
              {crop.harvestDate && (
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>Harvested: {crop.harvestDate}</span>
                </div>
              )}
              {crop.temperature && (
                <div className="flex items-center">
                  <Thermometer className="w-3 h-3 mr-2" />
                  <span>Storage: {crop.temperature}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t">
              <div className="text-xs text-gray-500">
                Estimated Value: ${(crop.quantity * 2.5).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CropInventory;
