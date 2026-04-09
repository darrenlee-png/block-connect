import { cn } from "@/lib/utils";

type ProximityLevel = "same-floor" | "same-block" | "nearby" | "estate";

const config: Record<ProximityLevel, { label: string; color: string }> = {
  "same-floor": { label: "Same floor", color: "bg-proximity-close/15 text-proximity-close" },
  "same-block": { label: "Same block", color: "bg-proximity-close/10 text-proximity-close" },
  nearby: { label: "2 blocks away", color: "bg-proximity-near/15 text-proximity-near" },
  estate: { label: "Same estate", color: "bg-proximity-far/15 text-proximity-far" },
};

export function ProximityBadge({ level }: { level: ProximityLevel }) {
  const { label, color } = config[level];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", color)}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
