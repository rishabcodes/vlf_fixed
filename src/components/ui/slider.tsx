// Fixed slider component - temporary placeholder until @radix-ui packages are installed
import * as React from "react"

export const Slider = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="range"
    className={className}
    ref={ref}
    {...props}
  />
))
Slider.displayName = "Slider"
