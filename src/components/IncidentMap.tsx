import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Lazy load the map content to avoid React context issues with react-leaflet
const IncidentMapContent = lazy(() => import('./IncidentMapContent'));

const IncidentMap = () => {
  const [stats, setStats] = useState({ critical: 0, pending: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
                {stats.critical} Critical
              </Badge>
              <Badge variant="outline" className="text-xs">
                {stats.pending} Pending
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3">
          {!mounted ? (
            <div className="h-64 bg-muted/50 rounded-xl animate-pulse" />
          ) : (
            <Suspense fallback={<div className="h-64 bg-muted/50 rounded-xl animate-pulse" />}>
              <IncidentMapContent
                onStatsChange={(critical, pending) => setStats({ critical, pending })}
              />
            </Suspense>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IncidentMap;
