import { motion } from "framer-motion";
import { Bell, Pin, Heart, MessageCircle, UserPlus, Megaphone } from "lucide-react";

type AlertType = "like" | "comment" | "friend" | "rc" | "pinned";

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const iconMap: Record<AlertType, { icon: React.ElementType; color: string }> = {
  like: { icon: Heart, color: "text-category-celebration bg-category-celebration/10" },
  comment: { icon: MessageCircle, color: "text-primary bg-primary/10" },
  friend: { icon: UserPlus, color: "text-category-question bg-category-question/10" },
  rc: { icon: Megaphone, color: "text-primary bg-primary/10" },
  pinned: { icon: Pin, color: "text-accent bg-accent/10" },
};

const mockAlerts: Alert[] = [
  { id: "1", type: "like", title: "KopiUncle liked your post", description: "\"Does anyone know a good mee pok stall nearby?\"", time: "5m ago", read: false },
  { id: "2", type: "comment", title: "GardenAunty replied to your post", description: "\"Yes! The one at Block 43 hawker centre is amazing\"", time: "20m ago", read: false },
  { id: "3", type: "friend", title: "NightOwl sent a neighbour request", description: "Same block · Floor 12", time: "1h ago", read: false },
  { id: "4", type: "rc", title: "RC Announcement", description: "Community BBQ this Saturday at the void deck! Sign up sheet at Level 1.", time: "3h ago", read: true },
  { id: "5", type: "pinned", title: "New pinned post in your block", description: "Mdm Lim pinned an update about lift maintenance", time: "5h ago", read: true },
  { id: "6", type: "like", title: "3 neighbours liked your post", description: "\"Giving away children's books at void deck\"", time: "8h ago", read: true },
  { id: "7", type: "comment", title: "FitnessBro replied", description: "\"Thanks for the heads up about the pull-up bar!\"", time: "1d ago", read: true },
];

export function AlertsView() {
  const unread = mockAlerts.filter((a) => !a.read);
  const earlier = mockAlerts.filter((a) => a.read);

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl mb-1">Notifications</h2>
          <p className="text-sm text-muted-foreground">{unread.length} unread</p>
        </div>
        <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
      </div>

      {unread.length > 0 && (
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New</h3>
          {unread.map((alert, i) => (
            <AlertItem key={alert.id} alert={alert} index={i} />
          ))}
        </div>
      )}

      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Earlier</h3>
        {earlier.map((alert, i) => (
          <AlertItem key={alert.id} alert={alert} index={i + unread.length} />
        ))}
      </div>
    </div>
  );
}

function AlertItem({ alert, index }: { alert: Alert; index: number }) {
  const { icon: Icon, color } = iconMap[alert.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all hover:shadow-sm ${
        alert.read ? "bg-card opacity-70" : "bg-card shadow-sm border-primary/20"
      }`}
    >
      <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${alert.read ? "" : "font-semibold"}`}>{alert.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{alert.description}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
        {!alert.read && <span className="h-2 w-2 rounded-full bg-primary" />}
      </div>
    </motion.div>
  );
}
