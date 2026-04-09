import { motion } from "framer-motion";
import { Shield, MapPin, Calendar, MessageCircle, Heart, PenLine, ChevronRight, LogOut } from "lucide-react";
import { Button } from "./ui/button";

const stats = [
  { label: "Posts", value: 12, icon: MessageCircle },
  { label: "Likes received", value: 47, icon: Heart },
  { label: "Neighbours", value: 5, icon: Shield },
];

const menuItems = [
  { label: "Edit Nickname & Avatar", icon: PenLine },
  { label: "Privacy Settings", icon: Shield },
  { label: "My Neighbourhood", icon: MapPin },
  { label: "Notification Preferences", icon: Calendar },
];

export function ProfileView() {
  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-5">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-card p-5 text-center"
      >
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-3">
          🏠
        </div>
        <h2 className="font-display text-xl">TampinesResident</h2>
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5" />
          Block 45, Floor 12 · Tampines St 11
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Shield className="h-3 w-3" />
            Singpass Verified
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Member since March 2026 · Your identity is hidden. Only your nickname is visible to neighbours.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-3 text-center">
            <stat.icon className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-lg font-bold font-display">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Neighbour connections teaser */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border bg-card p-4"
      >
        <h3 className="font-semibold text-sm mb-2 font-sans">My Neighbours</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Send a neighbour request to reveal real names mutually. Both sides must accept.
        </p>
        <div className="flex -space-x-2">
          {["☕", "🌿", "🦉", "👶", "💪"].map((emoji, i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-sm"
            >
              {emoji}
            </div>
          ))}
          <div className="h-9 w-9 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] text-muted-foreground font-medium">
            +2
          </div>
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border bg-card overflow-hidden"
      >
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary/50 transition-colors ${
              i < menuItems.length - 1 ? "border-b" : ""
            }`}
          >
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </motion.div>

      <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
