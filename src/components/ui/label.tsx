import React from "react"

import { cn } from "@/src/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, required, children, ...props }, ref) => {
  return (
    <label ref={ref} className={cn("block text-sm font-medium text-gray-700 mb-1", className)} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
})

Label.displayName = "Label"

export { Label }

