import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, MapPin, Users, Eye } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Singpass Verified",
    description: "Government-backed verification. Every user is a real, verified neighbour.",
  },
  {
    icon: Eye,
    title: "Pseudonymous by Default",
    description: "Participate under a nickname. Reveal identity only through mutual friending.",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Feed",
    description: "Same floor → same block → nearby blocks. Your closest neighbours appear first.",
  },
  {
    icon: Users,
    title: "RC-Integrated",
    description: "Grassroots leaders have verified badges and can pin community announcements.",
  },
];

export function HeroSection({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Shield className="h-4 w-4" />
          A GovTech Initiative
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display leading-tight tracking-tight mb-4">
          Your digital{" "}
          <span className="text-primary">void deck</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          A verified, pseudonymous community board for HDB residents. 
          See what's happening closest to home — from the neighbours you can trust.
        </p>

        <div className="flex items-center justify-center gap-3 mb-16">
          <Button variant="hero" size="lg" onClick={onEnter}>
            Enter Void Deck
          </Button>
          <Button variant="hero-outline" size="lg">
            How It Works
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto w-full"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            className="rounded-lg border bg-card p-5 text-left hover:shadow-md transition-shadow"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <f.icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1 font-sans">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 text-xs text-muted-foreground"
      >
        The kampung spirit, rebuilt for how we live now.
      </motion.p>
    </section>
  );
}
