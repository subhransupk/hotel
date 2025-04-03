import { HTMLAttributes } from "react"
import { cn } from "../../lib/utils"

interface TableProps extends HTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {}
interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn("w-full border-collapse text-left", className)}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("", className)} {...props} />
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn("", className)} {...props} />
}

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-gray-200 last:border-0",
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
        className
      )}
      {...props}
    />
  )
}

export function TableHeaderCell({ className, ...props }: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  )
} 