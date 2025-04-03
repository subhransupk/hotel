import { HTMLAttributes, useState, createContext, useContext } from "react"
import { cn } from "../../lib/utils"

interface TabsContextType {
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

// Create a custom interface that doesn't extend HTMLAttributes
interface TabGroupProps {
  defaultIndex?: number
  onChange?: (index: number) => void
  className?: string
  children?: React.ReactNode
  // Add any other HTML div attributes you need
  id?: string
  style?: React.CSSProperties
}

interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "outline"
}

interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  index?: number
}

export function TabGroup({ defaultIndex = 0, onChange, className, children, ...props }: TabGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  const handleChange = (index: number) => {
    setSelectedIndex(index)
    onChange?.(index)
  }

  return (
    <TabsContext.Provider value={{ selectedIndex, setSelectedIndex: handleChange }}>
      <div
        className={cn(
          "flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabList({ className, variant = "solid", children, ...props }: TabListProps) {
  const variants = {
    solid: "bg-gray-100 p-1 rounded-lg",
    outline: "border-b border-gray-200",
  }

  return (
    <div
      role="tablist"
      className={cn(
        "flex space-x-1",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Tab({ index = 0, className, children, onClick, ...props }: TabProps) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tab must be used within a TabGroup')
  }

  const { selectedIndex, setSelectedIndex } = context
  const isSelected = selectedIndex === index

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    setSelectedIndex(index)
  }

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      onClick={handleClick}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
        isSelected
          ? "bg-white text-gray-900 shadow"
          : "text-gray-500 hover:text-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 