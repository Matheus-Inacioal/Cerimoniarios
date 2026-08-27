import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — Solid content surface (base for all cards).
 * 
 * Rules from spec:
 * - Fundo: var(--card) (#FFFFFF / #1F1E22). Always opaque, never translucent, never liturgical color.
 * - border-radius: 16px (0 16px 16px 0 if pendente)
 * - padding: 20px
 * - border: 1px solid var(--line)
 * - box-shadow: 0 1px 2px rgba(26,25,23,.05)
 * - pendente prop: 3px solid var(--lit) vertical accent bar on the left edge.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  pendente?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, hover = true, pendente = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-[var(--card)] border border-[var(--line)] shadow-[var(--shadow-card)] transition-all duration-300",
        pendente
          ? "rounded-r-[16px] rounded-l-none border-l-[3px] border-l-[var(--lit)]"
          : "rounded-[16px]",
        glass && "glass-card",
        hover && "hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--brand-300)]/60",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-base font-semibold leading-tight text-[var(--text-primary)] tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-[var(--text-secondary)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
