import { Heart, MessageCircle, Share2, Pin } from "lucide-react";
import { ProximityBadge } from "./ProximityBadge";
import { CategoryBadge, type PostCategory } from "./CategoryBadge";
import { motion } from "framer-motion";

export interface PostData {
  id: string;
  nickname: string;
  avatar: string;
  proximity: "same-floor" | "same-block" | "nearby" | "estate";
  category: PostCategory;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  isRC?: boolean;
  isPinned?: boolean;
}

export function PostCard({ post, index = 0 }: { post: PostData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {post.isPinned && (
        <div className="flex items-center gap-1 text-xs font-medium text-primary mb-2">
          <Pin className="h-3 w-3" />
          Pinned by RC
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{post.nickname}</span>
            {post.isRC && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wide">
                RC Member
              </span>
            )}
            <ProximityBadge level={post.proximity} />
          </div>
          <div className="mt-1.5 mb-2">
            <CategoryBadge category={post.category} />
          </div>
          <p className="text-sm leading-relaxed">{post.content}</p>
          <div className="flex items-center gap-4 mt-3 text-muted-foreground">
            <button className="flex items-center gap-1 text-xs hover:text-category-celebration transition-colors">
              <Heart className="h-3.5 w-3.5" />
              {post.likes}
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
              <MessageCircle className="h-3.5 w-3.5" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs ml-auto">{post.timeAgo}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
