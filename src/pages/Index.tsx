import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import IncidentMap from '@/components/IncidentMap';
import AlertsCard from '@/components/AlertsCard';
import RescueFeed from '@/components/RescueFeed';
import SearchBar from '@/components/SearchBar';
import SOSButton from '@/components/SOSButton';

const Index = () => {
  const { isCrisisMode } = useAppStore();

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-700 ${
        isCrisisMode ? 'crisis-mode' : ''
      }`}
      animate={{
        backgroundColor: isCrisisMode ? 'hsl(222 47% 5%)' : 'hsl(210 40% 98%)',
      }}
      transition={{ duration: 0.7 }}
    >
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Mode Indicator Banner */}
        <AnimatePresence mode="wait">
          {isCrisisMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="p-4 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
                  </span>
                  <div>
                    <p className="font-semibold text-danger">Crisis Mode Active</p>
                    <p className="text-sm text-muted-foreground">
                      All emergency protocols engaged. Rescue operations in progress.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-danger">5</p>
                  <p className="text-xs text-muted-foreground">Active Incidents</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Hero Card */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isCrisisMode ? (
                <motion.div
                  key="crisis-map"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full min-h-[400px]"
                >
                  <IncidentMap />
                </motion.div>
              ) : (
                <motion.div
                  key="peace-weather"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full min-h-[400px]"
                >
                  <WeatherCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Search Bar */}
            <SearchBar />

            {/* Alerts / Rescue Feed */}
            <div className="min-h-[320px]">
              <AnimatePresence mode="wait">
                {isCrisisMode ? (
                  <motion.div
                    key="crisis-feed"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <RescueFeed />
                  </motion.div>
                ) : (
                  <motion.div
                    key="peace-alerts"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <AlertsCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {(isCrisisMode
            ? [
                { label: 'Active Responders', value: '47', icon: '🚑' },
                { label: 'Rescued Today', value: '128', icon: '✅' },
                { label: 'Pending SOS', value: '5', icon: '🆘' },
                { label: 'Shelters Available', value: '12', icon: '🏠' },
              ]
            : [
                { label: 'Air Quality', value: '89', icon: '🌬️' },
                { label: 'UV Index', value: '6', icon: '☀️' },
                { label: 'Pollen Count', value: 'Low', icon: '🌸' },
                { label: 'Visibility', value: '8km', icon: '👁️' },
              ]
          ).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-card p-4 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* SOS Floating Button */}
      <SOSButton />
    </motion.div>
  );
};

export default Index;
