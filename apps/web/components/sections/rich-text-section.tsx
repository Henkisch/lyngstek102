import { Badge } from "@workspace/ui/components/badge";
import { RichText } from "components/richtext";
import type React from "react";

interface RichTextProps {
  badge?: string;
  richText: string;
}

export const RichTextSection: React.FC<RichTextProps> = ({
  badge,
  richText,
}) => {
  return (
    <div className="flex items-start flex-col gap-4 container mx-auto px-4 md:px-6">
      <div className="flex flex-col gap-4 items-start max-w-(--breakpoint-sm) mx-auto">
        {badge && <Badge variant="secondary">{badge}</Badge>}
        <RichText className="prose text-foreground" richText={richText ?? []} />
      </div>
    </div>
  );
};
