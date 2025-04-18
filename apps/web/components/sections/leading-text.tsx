import { Badge } from "@workspace/ui/components/badge";
import { RichText } from "components/richtext";
import type React from "react";

interface LeadingTextProps {
  badge?: string;
  richText: string;
}

export const LeadingText: React.FC<LeadingTextProps> = ({
  badge,
  richText,
}) => {
  return (
    <div className="flex items-start flex-col gap-4 container mx-auto py-12 px-4 md:px-6 lg:py-20">
      {badge && <Badge variant="secondary">{badge}</Badge>}
      <RichText
        className="prose text-2xl/normal font-medium md:text-3xl/normal lg:text-4xl/normal text-foreground"
        richText={richText ?? []}
      />
    </div>
  );
};
