import { Menu, Bell, Shield, Siren, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockNotifications } from '@/data/mockData';

const Header = () => {
  const { isCrisisMode, toggleCrisisMode, currentLocation } = useAppStore();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <motion.header
      className="sticky top-0 z-50 glass-card border-b"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Menu className="h-5 w-5" />
          </Button>

          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{currentLocation}</span>
          </Badge>
        </div>

        {/* Center - App Title */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h1 className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Resilience</span>
          </h1>
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {isCrisisMode ? (
                <motion.div
                  key="crisis"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Siren className="h-4 w-4 text-danger" />
                </motion.div>
              ) : (
                <motion.div
                  key="peace"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="h-4 w-4 text-success" />
                </motion.div>
              )}
            </AnimatePresence>

            <Switch
              checked={isCrisisMode}
              onCheckedChange={toggleCrisisMode}
              className="data-[state=checked]:bg-danger"
            />

            <span className="text-xs font-medium text-muted-foreground min-w-[40px]">
              {isCrisisMode ? 'Crisis' : 'Peace'}
            </span>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-danger text-[10px] font-bold text-danger-foreground flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass-card">
              <div className="p-2 border-b border-border/50">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-medium text-sm">{notification.title}</span>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary ml-auto" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.message}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              RC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
