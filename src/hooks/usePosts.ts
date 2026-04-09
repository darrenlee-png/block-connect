import { useQuery } from "@tanstack/react-query";
import { directusAdmin, readItems } from "@/lib/directus";
import type { Post, UserProfile } from "@/lib/directus";
import type { PostData } from "@/components/PostCard";
import { formatDistanceToNow } from "date-fns";

// Map Directus proximity based on block/floor comparison
// For now, since we don't have a logged-in user context, we randomize or use a default
function inferProximity(post: Post): PostData["proximity"] {
  // Placeholder logic — in production, compare post location to current user's location
  const options: PostData["proximity"][] = ["same-floor", "same-block", "nearby", "estate"];
  const hash = post.id.charCodeAt(0) % options.length;
  return options[hash];
}

function mapCategory(category: Post["category"]): PostData["category"] {
  return category;
}

function directusPostToPostData(post: Post): PostData {
  const author = typeof post.author_id === "object" ? post.author_id as UserProfile : null;

  return {
    id: post.id,
    nickname: author?.nickname ?? "Neighbour",
    avatar: author?.avatar_emoji ?? "🏠",
    proximity: inferProximity(post),
    category: mapCategory(post.category),
    content: post.content,
    timeAgo: post.date_created
      ? formatDistanceToNow(new Date(post.date_created), { addSuffix: true })
      : "just now",
    likes: post.likes_count ?? 0,
    comments: post.comments_count ?? 0,
    isRC: author?.role === "rc_member" || author?.role === "grassroots_leader",
    isPinned: post.is_pinned ?? false,
  };
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await directusAdmin.request(
        readItems("posts", {
          fields: [
            "*",
            { author_id: ["id", "nickname", "avatar_emoji", "role"] } as any,
          ],
          filter: { status: { _eq: "active" } },
          sort: ["-is_pinned", "-date_created"],
          limit: 50,
        })
      );
      return posts.map(directusPostToPostData);
    },
  });
}
