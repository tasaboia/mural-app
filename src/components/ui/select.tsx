import React from "react"

import { cn } from "@/src/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  options: { value: string; label: string }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, error, options, ...props }, ref) => {
  return (
    <div className="w-full">
      <select
        className={cn(
          "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none bg-white",
          error ? "border-red-500" : "border-gray-300",
          className,
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

Select.displayName = "Select"

export { Select }

