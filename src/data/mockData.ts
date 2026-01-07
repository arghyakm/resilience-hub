// Mock data structured for easy API replacement with TanStack Query

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
  aqiLevel: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  hourlyForecast: { hour: string; temp: number }[];
}

export interface Alert {
  id: string;
  type: 'rain' | 'heat' | 'flood' | 'storm' | 'earthquake';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timeframe: string;
  location: string;
}

export interface SOSIncident {
  id: string;
  message: string;
  location: string;
  coordinates: [number, number];
  severity: 'critical' | 'high' | 'medium';
  timestamp: string;
  status: 'pending' | 'responding' | 'resolved';
  type: 'medical' | 'rescue' | 'shelter' | 'supplies';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'sos';
}

// Mock Weather Data
export const mockWeatherData: WeatherData = {
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 72,
  windSpeed: 14,
  aqi: 89,
  aqiLevel: 'Moderate',
  hourlyForecast: [
    { hour: '6AM', temp: 24 },
    { hour: '9AM', temp: 26 },
    { hour: '12PM', temp: 29 },
    { hour: '3PM', temp: 31 },
    { hour: '6PM', temp: 28 },
    { hour: '9PM', temp: 25 },
  ],
};

// Mock Alerts (Peace Mode)
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'rain',
    title: 'Heavy Rainfall Expected',
    description: 'IMD predicts 50-70mm rainfall in coastal areas',
    severity: 'high',
    timeframe: 'Tomorrow, 6 AM - 12 PM',
    location: 'Western Mumbai',
  },
  {
    id: '2',
    type: 'heat',
    title: 'Heat Wave Warning',
    description: 'Temperatures may exceed 40°C in inland areas',
    severity: 'medium',
    timeframe: 'Next 3 days',
    location: 'Central Districts',
  },
  {
    id: '3',
    type: 'flood',
    title: 'Flood Watch Active',
    description: 'Low-lying areas advised to stay alert',
    severity: 'medium',
    timeframe: 'This Week',
    location: 'Mithi River Basin',
  },
];

// Mock SOS Incidents (Crisis Mode)
export const mockSOSIncidents: SOSIncident[] = [
  {
    id: 'sos-1',
    message: 'Family of 4 stranded on rooftop, water rising',
    location: 'Dharavi, Sector 5',
    coordinates: [19.0410, 72.8555],
    severity: 'critical',
    timestamp: '2 mins ago',
    status: 'pending',
    type: 'rescue',
  },
  {
    id: 'sos-2',
    message: 'Medical emergency - elderly person needs dialysis',
    location: 'Kurla East',
    coordinates: [19.0726, 72.8845],
    severity: 'critical',
    timestamp: '5 mins ago',
    status: 'responding',
    type: 'medical',
  },
  {
    id: 'sos-3',
    message: 'Community center needs food supplies for 200 people',
    location: 'Bandra West',
    coordinates: [19.0596, 72.8295],
    severity: 'high',
    timestamp: '15 mins ago',
    status: 'responding',
    type: 'supplies',
  },
  {
    id: 'sos-4',
    message: 'Road blocked, vehicles stranded',
    location: 'Andheri Subway',
    coordinates: [19.1136, 72.8697],
    severity: 'medium',
    timestamp: '22 mins ago',
    status: 'pending',
    type: 'rescue',
  },
  {
    id: 'sos-5',
    message: 'Shelter needed for displaced families',
    location: 'Sion',
    coordinates: [19.0409, 72.8621],
    severity: 'high',
    timestamp: '30 mins ago',
    status: 'pending',
    type: 'shelter',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Weather Alert',
    message: 'Heavy rainfall expected in your area tomorrow',
    time: '10 mins ago',
    read: false,
    type: 'alert',
  },
  {
    id: 'n2',
    title: 'System Update',
    message: 'New emergency protocols have been updated',
    time: '1 hour ago',
    read: false,
    type: 'info',
  },
  {
    id: 'n3',
    title: 'Drill Reminder',
    message: 'Monthly evacuation drill scheduled for next week',
    time: '2 hours ago',
    read: true,
    type: 'info',
  },
];

// API simulation functions (ready for TanStack Query)
export const fetchWeatherData = async (): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockWeatherData;
};

export const fetchAlerts = async (): Promise<Alert[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockAlerts;
};

export const fetchSOSIncidents = async (): Promise<SOSIncident[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockSOSIncidents;
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockNotifications;
};
