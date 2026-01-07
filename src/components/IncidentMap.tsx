import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchSOSIncidents, type SOSIncident } from '@/data/mockData';
import { AlertTriangle, Users, Ambulance, Package, Home } from 'lucide-react';

// Custom marker icons
const createCustomIcon = (severity: string) => {
  const colors: Record<string, string> = {
    critical: '#e11d48',
    high: '#f59e0b',
    medium: '#3b82f6',
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${colors[severity] || colors.medium};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 1.5s ease-in-out infinite;
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Map bounds controller
const MapBoundsController = ({ incidents }: { incidents: SOSIncident[] }) => {
  const map = useMap();

  useEffect(() => {
    if (incidents.length > 0) {
      const bounds = L.latLngBounds(incidents.map((i) => i.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [incidents, map]);

  return null;
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'medical':
      return <Ambulance className="h-3 w-3" />;
    case 'rescue':
      return <Users className="h-3 w-3" />;
    case 'supplies':
      return <Package className="h-3 w-3" />;
    case 'shelter':
      return <Home className="h-3 w-3" />;
    default:
      return <AlertTriangle className="h-3 w-3" />;
  }
};

const IncidentMap = () => {
  const { data: incidents = [], isLoading } = useQuery({
    queryKey: ['sosIncidents'],
    queryFn: fetchSOSIncidents,
    refetchInterval: 10000, // Simulate real-time updates
  });

  const criticalCount = incidents.filter((i) => i.severity === 'critical').length;
  const pendingCount = incidents.filter((i) => i.status === 'pending').length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="glass-card h-full overflow-hidden border-danger/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-danger animate-pulse" />
              Live Incident Map
            </CardTitle>
            <div className="flex gap-2">
              <Badge className="status-danger border text-xs">
                {criticalCount} Critical
              </Badge>
              <Badge variant="outline" className="text-xs">
                {pendingCount} Pending
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3">
          {isLoading ? (
            <div className="h-64 bg-muted/50 rounded-xl animate-pulse" />
          ) : (
            <div className="h-64 rounded-xl overflow-hidden">
              <MapContainer
                center={[19.076, 72.8777]}
                zoom={12}
                className="h-full w-full"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapBoundsController incidents={incidents} />
                {incidents.map((incident) => (
                  <Marker
                    key={incident.id}
                    position={incident.coordinates}
                    icon={createCustomIcon(incident.severity)}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`${
                              incident.severity === 'critical'
                                ? 'status-danger'
                                : incident.severity === 'high'
                                ? 'status-warning'
                                : 'status-info'
                            } border text-[10px]`}
                          >
                            {getTypeIcon(incident.type)}
                            <span className="ml-1 capitalize">{incident.type}</span>
                          </Badge>
                          <span className="text-[10px] text-muted-foreground ml-auto">
                            {incident.timestamp}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-1">{incident.message}</p>
                        <p className="text-xs text-muted-foreground">{incident.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger" />
              Critical
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-warning" />
              High
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-info" />
              Medium
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IncidentMap;
