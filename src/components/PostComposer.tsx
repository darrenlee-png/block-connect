import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { CategoryBadge, type PostCategory } from "./CategoryBadge";

const categories: PostCategory[] = ["sighting", "celebration", "question", "headsup", "giving"];

export function PostComposer() {
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState<PostCategory>("sighting");

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">
          🏠
        </div>
        <div className="flex-1">
          <textarea
            placeholder="What's happening in the neighbourhood?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-h-[60px]"
            rows={2}
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t">
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`transition-opacity ${selected === cat ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <CategoryBadge category={cat} />
                </button>
              ))}
            </div>
            <Button size="sm" disabled={!content.trim()}>
              <Send className="h-3.5 w-3.5" />
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
