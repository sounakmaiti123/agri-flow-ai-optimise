
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";

interface GoogleMapsIntegrationProps {
  routeId: string;
  origin: string;
  destination: string;
  onViewRoute: () => void;
}

const GoogleMapsIntegration: React.FC<GoogleMapsIntegrationProps> = ({
  routeId,
  origin,
  destination,
  onViewRoute
}) => {
  const handleViewRoute = () => {
    // Base coordinates from your Google Maps link
    const baseCoords = "22.8786366,87.78617";
    
    // Create Google Maps directions URL
    const mapsUrl = `https://www.google.com/maps/dir/${baseCoords}/${baseCoords}/@${baseCoords},15z/data=!3m1!4b1!4m2!4m1!3e0`;
    
    // Open Google Maps in a new tab
    window.open(mapsUrl, '_blank');
    
    // Call the parent callback
    onViewRoute();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleViewRoute}
      className="flex items-center space-x-2"
    >
      <MapPin className="w-4 h-4" />
      <span>View Route</span>
      <ExternalLink className="w-3 h-3" />
    </Button>
  );
};

export default GoogleMapsIntegration;
