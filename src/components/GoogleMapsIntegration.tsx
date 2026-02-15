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

const GoogleMapsIntegration: React.FC<GoogleMapsIntegrationProps> = ({ routeId, origin, destination, onViewRoute, variant = 'view' }) => {
  const handleOpenMaps = () => {
    const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(origin + ", West Bengal, India")}/${encodeURIComponent(destination + ", West Bengal, India")}`;
    window.open(mapsUrl, '_blank');
    onViewRoute();
  };

  if (variant === 'start') {
    return (
      <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20" onClick={handleOpenMaps}>
        <Navigation className="w-4 h-4 mr-2" />Start Journey
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleOpenMaps} className="rounded-xl">
      <MapPin className="w-4 h-4 mr-1" />View Route<ExternalLink className="w-3 h-3 ml-1" />
    </Button>
  );
};

export default GoogleMapsIntegration;
