import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import { PostComposer } from "@/components/PostComposer";
import { NearbyView } from "@/components/NearbyView";
import { AlertsView } from "@/components/AlertsView";
import { ProfileView } from "@/components/ProfileView";
import { usePosts } from "@/hooks/usePosts";
import { mockPosts } from "@/data/mockPosts";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bell, User, Home, Loader2 } from "lucide-react";

type Tab = "feed" | "nearby" | "alerts" | "profile";

const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "feed", icon: Home, label: "Feed" },
  { id: "nearby", icon: MapPin, label: "Nearby" },
  { id: "alerts", icon: Bell, label: "Alerts" },
  { id: "profile", icon: User, label: "Profile" },
];

export function FeedView() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const { data: livePosts, isLoading, isError } = usePosts();
  const posts = livePosts && livePosts.length > 0 ? livePosts : mockPosts;
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
            <button
              onClick={() => setActiveTab("alerts")}
              className="relative h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-destructive text-[8px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/15 transition-colors"
            >
              <User className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="pb-20"
        >
          {activeTab === "feed" && (
            <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
              <PostComposer />
              {isLoading && (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Loading from Directus…
                </div>
              )}
              {isError && (
                <div className="text-xs text-muted-foreground text-center py-2">
                  Could not reach Directus — showing mock data
                </div>
              )}
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
          {activeTab === "nearby" && <NearbyView />}
          {activeTab === "alerts" && <AlertsView />}
          {activeTab === "profile" && <ProfileView />}
        </motion.main>
      </AnimatePresence>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 border-t bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary"
                />
              )}
              {tab.id === "alerts" && (
                <span className="absolute -top-0.5 right-0.5 h-2 w-2 rounded-full bg-destructive" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
