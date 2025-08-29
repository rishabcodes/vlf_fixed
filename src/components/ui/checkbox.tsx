// Fixed checkbox component - temporary placeholder until @radix-ui packages are installed
import * as React from "react"

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    className={className}
    ref={ref}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"
