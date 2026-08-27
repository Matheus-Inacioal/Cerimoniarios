import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-400)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[var(--brand-500)] to-[var(--brand-600)] text-white shadow-md shadow-[var(--brand-600)]/25 hover:shadow-lg hover:shadow-[var(--brand-600)]/30 hover:from-[var(--brand-400)] hover:to-[var(--brand-500)]",
        secondary:
          "bg-[var(--surface-2)] text-[var(--text-primary)] hover:bg-[var(--surface-3)] border border-[var(--surface-3)]/80",
        outline:
          "border border-[var(--surface-3)] bg-[var(--surface-0)] text-[var(--text-primary)] hover:bg-[var(--surface-2)] hover:border-[var(--surface-4)] shadow-[var(--shadow-xs)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]",
        destructive:
          "bg-gradient-to-b from-[var(--error)] to-red-600 text-white shadow-md shadow-red-600/25 hover:shadow-lg",
        success:
          "bg-gradient-to-b from-[var(--success)] to-emerald-600 text-white shadow-md shadow-emerald-600/25 hover:shadow-lg",
        link:
          "text-[var(--brand-600)] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-lg",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg rounded-2xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
