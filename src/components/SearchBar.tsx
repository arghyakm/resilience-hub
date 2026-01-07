import { Search, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative"
    >
      <div className="relative glass-card rounded-2xl overflow-hidden">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search locations, alerts, resources..."
          className="pl-12 pr-12 h-12 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl hover:bg-primary/10"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
