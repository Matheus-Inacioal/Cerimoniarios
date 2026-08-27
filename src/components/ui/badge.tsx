import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--brand-100)] text-[var(--brand-700)]",
        secondary:
          "border-[var(--surface-3)] bg-[var(--surface-2)] text-[var(--text-secondary)]",
        success:
          "border-transparent bg-[var(--success-light)] text-[var(--success)]",
        warning:
          "border-transparent bg-[var(--warning-light)] text-[var(--warning)]",
        error:
          "border-transparent bg-[var(--error-light)] text-[var(--error)]",
        info:
          "border-transparent bg-[var(--info-light)] text-[var(--info)]",
        outline:
          "border-current bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

function Badge({ className, variant, dot, dotColor, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotColor || "bg-current")}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
