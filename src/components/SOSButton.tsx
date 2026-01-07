import { Siren, Phone, MapPin, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const SOSButton = () => {
  const { isCrisisMode, isSOSDialogOpen, openSOSDialog, closeSOSDialog, currentLocation } =
    useAppStore();

  if (!isCrisisMode) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="pulse-ring bg-danger/40" />
            <span className="pulse-ring bg-danger/30" style={{ animationDelay: '0.5s' }} />
            <span className="pulse-ring bg-danger/20" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main button */}
          <Button
            onClick={openSOSDialog}
            className="relative h-16 w-16 rounded-full bg-danger hover:bg-danger/90 text-danger-foreground shadow-danger-glow danger-pulse"
          >
            <div className="flex flex-col items-center gap-0.5">
              <Siren className="h-6 w-6" />
              <span className="text-[10px] font-bold">SOS</span>
            </div>
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* SOS Dialog */}
      <Dialog open={isSOSDialogOpen} onOpenChange={closeSOSDialog}>
        <DialogContent className="glass-card border-danger/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-danger">
              <div className="p-2 rounded-xl bg-danger/20">
                <Siren className="h-5 w-5" />
              </div>
              Broadcast Emergency SOS
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your location will be shared with all nearby rescue teams and emergency
              responders.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Current Location */}
            <div className="p-3 rounded-xl bg-secondary/50 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Your Location</p>
                <p className="font-medium text-sm">{currentLocation}</p>
              </div>
              <Badge variant="outline" className="ml-auto text-[10px]">
                GPS Active
              </Badge>
            </div>

            {/* Emergency Type Quick Select */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Emergency Type</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Medical', icon: '🏥' },
                  { label: 'Rescue', icon: '🚨' },
                  { label: 'Supplies', icon: '📦' },
                  { label: 'Shelter', icon: '🏠' },
                ].map((type) => (
                  <Button
                    key={type.label}
                    variant="outline"
                    className="h-12 justify-start gap-2 hover:bg-danger/10 hover:border-danger/50"
                  >
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Additional Details (Optional)</p>
              <Textarea
                placeholder="Describe your situation..."
                className="resize-none bg-secondary/30"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={closeSOSDialog} className="flex-1">
              Cancel
            </Button>
            <Button
              className="flex-1 bg-danger hover:bg-danger/90 text-danger-foreground gap-2"
              onClick={() => {
                closeSOSDialog();
                // Here you would trigger the actual SOS broadcast
              }}
            >
              <Send className="h-4 w-4" />
              Broadcast SOS
            </Button>
          </DialogFooter>

          {/* Emergency Hotline */}
          <div className="mt-2 p-3 rounded-xl bg-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">Emergency Hotline</span>
            </div>
            <a
              href="tel:112"
              className="font-bold text-primary hover:underline"
            >
              112
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
