import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GlassSurface — the Liquid Glass primitive.
 * 
 * Wraps content in a translucent glass material that picks up
 * the ambient liturgical color from the background.
 * 
 * Variants control blur density:
 * - bar:   navigation bars (blur 26px)
 * - sheet: bottom sheets (blur 30px)
 * - note:  banners, toasts (blur 20px)
 * - fab:   floating action button (blur 20px, heavier shadow)
 * - overlay: modals (blur 30px)
 * 
 * Degrades to solid surface under:
 * - prefers-reduced-transparency: reduce
 * - prefers-contrast: more
 * - .accessibility-solid on body
 */

type GlassVariant = "default" | "bar" | "dense" | "note" | "fab" | "overlay";

const variantClasses: Record<GlassVariant, string> = {
  default: "glass-surface",
  bar: "glass-surface glass-surface--bar",
  dense: "glass-surface glass-surface--dense",
  note: "glass-surface glass-surface--note",
  fab: "glass-surface glass-surface--fab",
  overlay: "glass-surface glass-surface--dense",
};

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  as?: React.ElementType;
}

const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ className, variant = "default", as: Comp = "div", children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
GlassSurface.displayName = "GlassSurface";

export { GlassSurface };
export type { GlassVariant };
