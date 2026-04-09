import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ProximityBadge } from "./ProximityBadge";

const blocks = [
  { id: "45", label: "Blk 45", x: 48, y: 38, proximity: "same-block" as const, posts: 4, highlight: true },
  { id: "43", label: "Blk 43", x: 28, y: 28, proximity: "nearby" as const, posts: 2 },
  { id: "44", label: "Blk 44", x: 32, y: 52, proximity: "nearby" as const, posts: 1 },
  { id: "46", label: "Blk 46", x: 68, y: 32, proximity: "nearby" as const, posts: 3 },
  { id: "47", label: "Blk 47", x: 72, y: 55, proximity: "nearby" as const, posts: 0 },
  { id: "48", label: "Blk 48", x: 15, y: 65, proximity: "estate" as const, posts: 1 },
  { id: "49", label: "Blk 49", x: 82, y: 70, proximity: "estate" as const, posts: 2 },
  { id: "50", label: "Blk 50", x: 55, y: 72, proximity: "estate" as const, posts: 0 },
];

const nearbyActivity = [
  { block: "Blk 43", text: "2 new posts about a lost cat", time: "10m ago", proximity: "nearby" as const },
  { block: "Blk 46", text: "Someone is giving away mooncakes", time: "25m ago", proximity: "nearby" as const },
  { block: "Blk 45", text: "RC posted about lift maintenance", time: "2h ago", proximity: "same-block" as const },
  { block: "Blk 49", text: "Question about parking at carpark B", time: "3h ago", proximity: "estate" as const },
];

export function NearbyView() {
  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
      <div>
        <h2 className="font-display text-xl mb-1">Nearby Activity</h2>
        <p className="text-sm text-muted-foreground">See what's happening around your block</p>
      </div>

      {/* Mini map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-xl border bg-card overflow-hidden aspect-[4/3]"
      >
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        {/* Proximity rings */}
        <div className="absolute rounded-full border-2 border-dashed border-primary/15"
          style={{ left: "48%", top: "38%", width: "30%", height: "40%", transform: "translate(-50%, -50%)" }} />
        <div className="absolute rounded-full border border-dashed border-primary/8"
          style={{ left: "48%", top: "45%", width: "65%", height: "75%", transform: "translate(-50%, -50%)" }} />

        {blocks.map((block, i) => (
          <motion.button
            key={block.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className={`absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2 group`}
            style={{ left: `${block.x}%`, top: `${block.y}%` }}
          >
            <div className={`relative flex items-center justify-center rounded-lg px-2 py-1 text-[10px] font-bold transition-all
              ${block.highlight
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {block.highlight && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
              )}
              {block.label}
            </div>
            {block.posts > 0 && (
              <span className="text-[9px] text-muted-foreground">{block.posts} posts</span>
            )}
          </motion.button>
        ))}

        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-muted-foreground bg-background/80 backdrop-blur rounded-md px-2 py-1">
          <MapPin className="h-3 w-3 text-primary" />
          You are here: Blk 45
        </div>
      </motion.div>

      {/* Activity list */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm font-sans">Recent nearby</h3>
        {nearbyActivity.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-start gap-3 rounded-lg border bg-card p-3 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm">{item.block}</span>
                <ProximityBadge level={item.proximity} />
              </div>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
