'use client'

import { memo } from 'react'

interface DateFormatterProps {
  date: Date
  format: 'date' | 'time' | 'datetime'
}

const formatters = {
  date: new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
  time: new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }),
  datetime: new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }),
}

function DateFormatter({ date, format }: DateFormatterProps) {
  return <>{formatters[format].format(date)}</>
}

export default memo(DateFormatter) 