import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeedView } from "@/components/FeedView";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [showFeed, setShowFeed] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showFeed ? (
        <motion.div
          key="hero"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <HeroSection onEnter={() => setShowFeed(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="feed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FeedView />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
