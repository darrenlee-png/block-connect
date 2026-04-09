import { PostCard } from "@/components/PostCard";
import { PostComposer } from "@/components/PostComposer";
import { mockPosts } from "@/data/mockPosts";
import { motion } from "framer-motion";
import { MapPin, Bell, User, Home } from "lucide-react";

export function FeedView() {
  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="font-display text-lg leading-none">Void Deck</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="h-3 w-3" />
              Block 45, Tampines St 11
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/15 transition-colors">
              <User className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-20">
        <PostComposer />
        {mockPosts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 border-t bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {[
            { icon: Home, label: "Feed", active: true },
            { icon: MapPin, label: "Nearby", active: false },
            { icon: Bell, label: "Alerts", active: false },
            { icon: User, label: "Profile", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
