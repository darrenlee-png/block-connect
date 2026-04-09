import { createDirectus, rest, readItems, readItem, createItem, updateItem, deleteItem, authentication } from '@directus/sdk';

const DIRECTUS_URL = 'https://cms.darren02.staging.optical.gov.sg';

// Schema types matching your Directus collections
export interface UserProfile {
  id: string;
  nickname: string;
  avatar_emoji: string;
  block_number: string;
  floor_number: number;
  unit_number?: string;
  estate_name: string;
  street_name: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
  singpass_verified: boolean;
  role: 'resident' | 'rc_member' | 'grassroots_leader';
  bio?: string;
  date_created: string;
  date_updated?: string;
}

export interface Post {
  id: string;
  author_id: string | UserProfile;
  content: string;
  category: 'sighting' | 'celebration' | 'question' | 'headsup' | 'giving';
  is_pinned: boolean;
  pinned_at?: string;
  block_number: string;
  floor_number: number;
  estate_name: string;
  latitude?: number;
  longitude?: number;
  likes_count: number;
  comments_count: number;
  status: 'active' | 'hidden' | 'reported' | 'removed';
  date_created: string;
  date_updated?: string;
}

export interface Comment {
  id: string;
  post_id: string | Post;
  author_id: string | UserProfile;
  parent_comment_id?: string | Comment;
  content: string;
  likes_count: number;
  status: 'active' | 'hidden' | 'reported' | 'removed';
  date_created: string;
}

export interface Notification {
  id: string;
  recipient_id: string | UserProfile;
  actor_id?: string | UserProfile;
  title: string;
  description?: string;
  type: 'like' | 'comment' | 'friend_request' | 'rc_announcement' | 'pinned_post' | 'report_update';
  is_read: boolean;
  reference_collection?: string;
  reference_id?: string;
  date_created: string;
}

export interface NeighbourRequest {
  id: string;
  from_user_id: string | UserProfile;
  to_user_id: string | UserProfile;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  date_created: string;
  date_updated?: string;
}

export interface Block {
  id: string;
  block_number: string;
  street_name: string;
  estate_name: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  total_floors?: number;
  total_units?: number;
}

// Directus schema definition
export interface DirectusSchema {
  user_profiles: UserProfile[];
  posts: Post[];
  comments: Comment[];
  post_likes: { id: string; post_id: string; user_id: string; date_created: string }[];
  comment_likes: { id: string; comment_id: string; user_id: string; date_created: string }[];
  neighbour_requests: NeighbourRequest[];
  notifications: Notification[];
  reports: { id: string; reported_by: string; reason: string; details?: string; reference_collection: string; reference_id: string; status: string; date_created: string }[];
  blocks: Block[];
  post_images: { id: string; post_id: string; file_id: string; sort_order: number; date_created: string }[];
}

// Public client (no auth — for read-only public collections)
export const directus = createDirectus<DirectusSchema>(DIRECTUS_URL)
  .with(rest())
  .with(authentication());

// Re-export SDK helpers for convenience
export { readItems, readItem, createItem, updateItem, deleteItem };
