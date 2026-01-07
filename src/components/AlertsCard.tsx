import { CloudRain, Thermometer, Waves, Wind, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchAlerts, type Alert } from '@/data/mockData';

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'rain':
      return <CloudRain className="h-5 w-5" />;
    case 'heat':
      return <Thermometer className="h-5 w-5" />;
    case 'flood':
      return <Waves className="h-5 w-5" />;
    case 'storm':
      return <Wind className="h-5 w-5" />;
    default:
      return <AlertTriangle className="h-5 w-5" />;
  }
};

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'status-danger';
    case 'high':
      return 'status-warning';
    case 'medium':
      return 'status-info';
    default:
      return 'status-success';
  }
};

const getSeverityIconBg = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-danger/10 text-danger';
    case 'high':
      return 'bg-warning/10 text-warning';
    case 'medium':
      return 'bg-info/10 text-info';
    default:
      return 'bg-success/10 text-success';
  }
};

const AlertsCard = () => {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="glass-card h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Upcoming Alerts
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {alerts.length} Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  variants={itemVariants}
                  className="group p-4 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors cursor-pointer border border-transparent hover:border-border/50"
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex-shrink-0 p-2.5 rounded-xl ${getSeverityIconBg(
                        alert.severity
                      )}`}
                    >
                      {getAlertIcon(alert.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{alert.title}</h4>
                        <Badge className={`${getSeverityClass(alert.severity)} border text-[10px] flex-shrink-0`}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground/80">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">📍</span>
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">🕐</span>
                          {alert.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlertsCard;
