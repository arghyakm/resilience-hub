import { Sun, Droplets, Wind, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchWeatherData } from '@/data/mockData';

const WeatherCard = () => {
  const { data: weather, isLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
  });

  if (isLoading || !weather) {
    return (
      <Card className="glass-card h-full animate-pulse">
        <CardContent className="p-6">
          <div className="h-48 bg-muted/50 rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  const getAqiBadgeClass = (level: string) => {
    switch (level) {
      case 'Good':
        return 'status-success';
      case 'Moderate':
        return 'status-warning';
      case 'Unhealthy':
        return 'status-danger';
      default:
        return 'status-info';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="glass-card h-full overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Today's Weather</CardTitle>
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Stats */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <motion.div
                className="flex items-baseline gap-1"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <span className="text-6xl font-bold tracking-tighter">
                  {weather.temperature}
                </span>
                <span className="text-2xl font-medium text-muted-foreground">°C</span>
              </motion.div>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Sun className="h-4 w-4 text-warning" />
                {weather.condition}
              </p>
            </div>

            <div className="text-right space-y-2">
              <Badge className={`${getAqiBadgeClass(weather.aqiLevel)} border`}>
                AQI: {weather.aqi}
              </Badge>
              <p className="text-xs text-muted-foreground">{weather.aqiLevel}</p>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Droplets className="h-5 w-5 text-info" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Wind className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Temperature Chart */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Gauge className="h-4 w-4" />
              Temperature Trend
            </p>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weather.hourlyForecast}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`${value}°C`, 'Temp']}
                  />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#tempGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
