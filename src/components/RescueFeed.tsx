import { Users, Ambulance, Package, Home, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchSOSIncidents, type SOSIncident } from '@/data/mockData';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'medical':
      return <Ambulance className="h-4 w-4" />;
    case 'rescue':
      return <Users className="h-4 w-4" />;
    case 'supplies':
      return <Package className="h-4 w-4" />;
    case 'shelter':
      return <Home className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case 'critical':
      return {
        badge: 'status-danger',
        border: 'border-l-danger',
        bg: 'bg-danger/5',
      };
    case 'high':
      return {
        badge: 'status-warning',
        border: 'border-l-warning',
        bg: 'bg-warning/5',
      };
    default:
      return {
        badge: 'status-info',
        border: 'border-l-info',
        bg: 'bg-info/5',
      };
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-danger/20 text-danger';
    case 'responding':
      return 'bg-warning/20 text-warning';
    case 'resolved':
      return 'bg-success/20 text-success';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const RescueFeed = () => {
  const { data: incidents = [], isLoading } = useQuery({
    queryKey: ['sosIncidents'],
    queryFn: fetchSOSIncidents,
    refetchInterval: 5000,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full"
    >
      <Card className="glass-card h-full border-danger/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
              </span>
              Rescue Feed
            </CardTitle>
            <Badge className="status-danger border text-xs animate-pulse">
              LIVE
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100%-60px)] px-4 pb-4 custom-scrollbar">
            {isLoading ? (
              <div className="space-y-3 pt-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-muted/50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 pt-1"
                >
                  {incidents.map((incident, index) => {
                    const styles = getSeverityStyles(incident.severity);
                    return (
                      <motion.div
                        key={incident.id}
                        variants={itemVariants}
                        layout
                        className={`relative p-4 rounded-xl border-l-4 ${styles.border} ${styles.bg} backdrop-blur-sm`}
                      >
                        {/* Severity indicator for critical */}
                        {incident.severity === 'critical' && (
                          <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-danger rounded-full animate-pulse" />
                        )}

                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${styles.badge.replace('status-', 'bg-')}/20`}>
                              {getTypeIcon(incident.type)}
                            </div>
                            <Badge className={`${styles.badge} border text-[10px] uppercase`}>
                              {incident.severity}
                            </Badge>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${getStatusStyles(incident.status)}`}
                          >
                            {incident.status}
                          </Badge>
                        </div>

                        <p className="text-sm font-medium mb-2 line-clamp-2">
                          {incident.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {incident.timestamp}
                            </span>
                          </div>

                          {incident.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs border-primary/50 hover:bg-primary hover:text-primary-foreground"
                            >
                              Respond
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RescueFeed;
