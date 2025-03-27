import React from "react"

import { cn } from "@/src/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={cn("h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors", className)}
        ref={ref}
        {...props}
      />
      {label && (
        <label htmlFor={props.id} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }

