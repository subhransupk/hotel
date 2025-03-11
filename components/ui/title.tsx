import { HTMLAttributes } from "react"
import { cn } from "../../lib/utils"

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function Title({ className, ...props }: TitleProps) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-gray-900",
        className
      )}
      {...props}
    />
  )
} 