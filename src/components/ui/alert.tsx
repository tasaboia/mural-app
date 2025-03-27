import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-white text-gray-800 border-gray-200",
      success: "bg-green-50 text-green-800 border-green-200",
      error: "bg-red-50 text-red-800 border-red-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
      info: "bg-blue-50 text-blue-800 border-blue-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string
}

function Alert({ className, variant, title, children, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      {title && <AlertTitle className="mb-1 font-medium">{title}</AlertTitle>}
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </div>
  )
}

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h5 ref={ref} className={cn("mb-1 font-medium", className)} {...props} />
  },
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("text-sm", className)} {...props} />
  },
)
AlertDescription.displayName = "AlertDescription"

export { Alert, alertVariants, AlertTitle, AlertDescription }

