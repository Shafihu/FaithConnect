
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({ 
  subtitle, 
  title, 
  description, 
  align = "center",
  className 
}: SectionHeadingProps) {
  return (
    <div 
      className={cn(
        "space-y-3 mb-10",
        align === "left" && "text-left",
        align === "center" && "text-center mx-auto max-w-2xl",
        align === "right" && "text-right ml-auto",
        className
      )}
    >
      {subtitle && (
        <p className="text-faith-600 font-medium text-sm uppercase tracking-wider">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-serif font-medium text-faith-900">
        {title}
      </h2>
      {description && (
        <p className="text-faith-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
