import { HTMLAttributes } from "react"
import { cn } from "../../lib/utils"

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Text({ className, ...props }: TextProps) {
  return (
    <p
      className={cn(
        "text-sm text-gray-500",
        className
      )}
      {...props}
    />
  )
} 