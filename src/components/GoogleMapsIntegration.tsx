
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Navigation } from "lucide-react";

interface GoogleMapsIntegrationProps {
  routeId: string;
  origin: string;
  destination: string;
  onViewRoute: () => void;
  variant?: 'view' | 'start';
}

const GoogleMapsIntegration: React.FC<GoogleMapsIntegrationProps> = ({
  routeId,
  origin,
  destination,
  onViewRoute,
  variant = 'view'
}) => {
  const handleOpenMaps = () => {
    // Create Google Maps directions URL with actual origin and destination
    const encodedOrigin = encodeURIComponent(origin + ", West Bengal, India");
    const encodedDestination = encodeURIComponent(destination + ", West Bengal, India");
    
    const mapsUrl = `https://www.google.com/maps/dir/${encodedOrigin}/${encodedDestination}`;
    
    // Open Google Maps in a new tab
    window.open(mapsUrl, '_blank');
    
    // Call the parent callback
    onViewRoute();
  };

  if (variant === 'start') {
    return (
      <Button 
        size="sm" 
        className="bg-green-600 hover:bg-green-700"
        onClick={handleOpenMaps}
      >
        <Navigation className="w-4 h-4 mr-2" />
        Start Journey
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleOpenMaps}
      className="flex items-center space-x-2"
    >
      <MapPin className="w-4 h-4" />
      <span>View Route</span>
      <ExternalLink className="w-3 h-3" />
    </Button>
  );
};

export default GoogleMapsIntegration;
