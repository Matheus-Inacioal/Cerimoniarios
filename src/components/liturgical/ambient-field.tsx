"use client";

/**
 * AmbientField — the tinted background layer.
 * 
 * Fixed-position element behind all content that renders radial gradients
 * using --lit-wash. As the liturgical color changes, the wash transitions
 * smoothly (600ms via CSS), creating the signature "the app changes color
 * with the liturgical season" effect.
 * 
 * This component is purely decorative and has pointer-events: none.
 */
export function AmbientField() {
  return <div className="ambient-field" aria-hidden="true" />;
}
