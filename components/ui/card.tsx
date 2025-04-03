import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient"
  isHoverable?: boolean
}

export function Card({ 
  className, 
  variant = "default",
  isHoverable = false,
  children,
  ...props 
}: CardProps) {
  const baseStyles = "relative rounded-xl border transition-all duration-300"
  
  const variants = {
    default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
    glass: "backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-white/20 dark:border-gray-700/30",
    gradient: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-white/20 dark:border-gray-700/30"
  }

  const hoverStyles = isHoverable ? "hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5" : ""

  const glassElement = variant === "glass" && (
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  )
  
  const contentElement = (
    <div className="relative z-10">
      {children}
    </div>
  )

  if (isHoverable) {
    return (
      <motion.div 
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {glassElement}
        {contentElement}
      </motion.div>
    )
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {glassElement}
      {contentElement}
    </div>
  )
} 