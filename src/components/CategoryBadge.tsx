import { cn } from "@/lib/utils";
import { Eye, PartyPopper, HelpCircle, AlertTriangle, Gift } from "lucide-react";

export type PostCategory = "sighting" | "celebration" | "question" | "headsup" | "giving";

const config: Record<PostCategory, { label: string; color: string; icon: React.ElementType }> = {
  sighting: { label: "Sighting", color: "bg-category-sighting/12 text-category-sighting", icon: Eye },
  celebration: { label: "Celebration", color: "bg-category-celebration/12 text-category-celebration", icon: PartyPopper },
  question: { label: "Question", color: "bg-category-question/12 text-category-question", icon: HelpCircle },
  headsup: { label: "Heads Up", color: "bg-category-headsup/12 text-category-headsup", icon: AlertTriangle },
  giving: { label: "Giving Away", color: "bg-category-giving/12 text-category-giving", icon: Gift },
};

export function CategoryBadge({ category }: { category: PostCategory }) {
  const { label, color, icon: Icon } = config[category];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", color)}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
