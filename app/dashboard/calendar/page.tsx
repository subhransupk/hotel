'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Card,
  Title,
  Text,
  Select,
  SelectItem,
  Button,
  Badge,
  TextInput,
  DateRangePicker,
  DateRangePickerValue,
  Textarea,
} from '@tremor/react'
import {
  FunnelIcon,
  PlusIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { z } from 'zod'
import { addDays, isBefore, isToday, startOfDay, format } from 'date-fns'
import DateFormatter from '@/app/components/date-formatter'

// Dynamically import FullCalendar and its plugins
const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
})

// Import plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

// Types for calendar events
interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'booking' | 'maintenance' | 'housekeeping' | 'staff'
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  details: {
    room?: string
    guest?: string
    staff?: string
    notes?: string
  }
}

// Add Zod schema for event validation
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['booking', 'maintenance', 'housekeeping', 'staff']),
  status: z.enum(['confirmed', 'pending', 'completed', 'cancelled']),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(
    (data) => !isBefore(data.to, data.from),
    { message: 'End date cannot be before start date' }
  ).refine(
    (data) => !isBefore(data.from, startOfDay(new Date())),
    { message: 'Cannot create events in the past' }
  ),
  allDay: z.boolean(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  details: z.object({
    room: z.string().optional(),
    guest: z.string().optional(),
    staff: z.string().optional(),
    notes: z.string().optional(),
  }),
})

type EventFormData = z.infer<typeof eventSchema>

// Create a client-side date formatter utility
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

// Replace the existing formatDate and formatTime functions
function formatDate(date: Date) {
  return dateFormatter.format(date)
}

function formatTime(date: Date) {
  return timeFormatter.format(date)
}

// Update the sample data to use proper date initialization
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Room 301 - John Smith',
    start: new Date('2024-01-15T00:00:00'),
    end: new Date('2024-01-18T00:00:00'),
    type: 'booking',
    status: 'confirmed',
    details: {
      room: '301',
      guest: 'John Smith',
      notes: 'Late check-in requested'
    }
  },
  {
    id: '2',
    title: 'Maintenance - AC Repair',
    start: new Date('2024-01-16T09:00:00'),
    end: new Date('2024-01-16T17:00:00'),
    type: 'maintenance',
    status: 'pending',
    details: {
      room: '205',
      staff: 'Mike Chen',
      notes: 'AC unit making noise'
    }
  },
  {
    id: '3',
    title: 'Housekeeping - Deep Clean',
    start: new Date('2024-01-15T08:00:00'),
    end: new Date('2024-01-15T16:00:00'),
    type: 'housekeeping',
    status: 'completed',
    details: {
      room: '401',
      staff: 'Sarah Johnson',
      notes: 'Post-checkout deep cleaning'
    }
  },
  {
    id: '4',
    title: 'Staff Meeting',
    start: new Date('2024-01-17T10:00:00'),
    end: new Date('2024-01-17T11:00:00'),
    type: 'staff',
    status: 'confirmed',
    details: {
      staff: 'All Staff',
      notes: 'Monthly review meeting'
    }
  }
]

// Event type colors
const eventColors = {
  booking: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
    textColor: '#1e40af',
  },
  maintenance: {
    backgroundColor: '#fef3c7',
    borderColor: '#d97706',
    textColor: '#92400e',
  },
  housekeeping: {
    backgroundColor: '#ecfdf5',
    borderColor: '#10b981',
    textColor: '#065f46',
  },
  staff: {
    backgroundColor: '#f5f3ff',
    borderColor: '#8b5cf6',
    textColor: '#5b21b6',
  },
}

// Status badge colors
const statusColors: Record<string, string> = {
  confirmed: 'green',
  pending: 'yellow',
  completed: 'blue',
  cancelled: 'red',
}

export default function CalendarPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createEventData, setCreateEventData] = useState<EventFormData>({
    title: '',
    type: 'booking',
    status: 'pending',
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
    allDay: true,
    startTime: '09:00',
    endTime: '17:00',
    details: {
      room: '',
      guest: '',
      staff: '',
      notes: '',
    },
  })
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof EventFormData, string>>>({})

  // Filter events based on selected type and status
  const filteredEvents = events.filter(event => {
    if (selectedType !== 'all' && event.type !== selectedType) return false
    if (selectedStatus !== 'all' && event.status !== selectedStatus) return false
    return true
  }).map(event => ({
    ...event,
    ...eventColors[event.type],
    extendedProps: {
      type: event.type,
      status: event.status,
      details: event.details,
    }
  }))

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id)
    if (event) {
      setSelectedEvent(event)
      setShowEventModal(true)
    }
  }

  const handleDateRangeChange = (value: DateRangePickerValue) => {
    if (value?.from && value?.to) {
      // Ensure we don't lose the time when updating dates
      const newFrom = new Date(value.from)
      const newTo = new Date(value.to)
      
      if (createEventData.startTime) {
        const [hours, minutes] = createEventData.startTime.split(':')
        newFrom.setHours(parseInt(hours), parseInt(minutes))
      }
      
      if (createEventData.endTime) {
        const [hours, minutes] = createEventData.endTime.split(':')
        newTo.setHours(parseInt(hours), parseInt(minutes))
      }

      setCreateEventData({
        ...createEventData,
        dateRange: { from: newFrom, to: newTo }
      })
    }
  }

  const handleTimeChange = (type: 'start' | 'end', time: string) => {
    const [hours, minutes] = time.split(':')
    const newDate = new Date(
      type === 'start' ? createEventData.dateRange.from : createEventData.dateRange.to
    )
    newDate.setHours(parseInt(hours), parseInt(minutes))

    setCreateEventData({
      ...createEventData,
      [type === 'start' ? 'startTime' : 'endTime']: time,
      dateRange: {
        ...createEventData.dateRange,
        [type === 'start' ? 'from' : 'to']: newDate
      }
    })
  }

  const handleDateSelect = (selectInfo: any) => {
    const start = new Date(selectInfo.start)
    const end = new Date(selectInfo.end)
    const isAllDay = !selectInfo.allDay

    setCreateEventData({
      ...createEventData,
      dateRange: {
        from: start,
        to: end,
      },
      allDay: isAllDay,
      startTime: isAllDay ? undefined : '09:00',
      endTime: isAllDay ? undefined : '17:00',
    })
    setShowCreateModal(true)
  }

  const handleCreateEvent = () => {
    try {
      const validatedData = eventSchema.parse(createEventData)
      // Here you would typically make an API call to save the event
      const newEvent: CalendarEvent = {
        id: String(Date.now()), // temporary ID generation
        title: validatedData.title,
        start: validatedData.dateRange.from,
        end: validatedData.dateRange.to,
        type: validatedData.type,
        status: validatedData.status,
        details: validatedData.details,
      }
      
      events.push(newEvent) // In a real app, this would be handled by state management
      setShowCreateModal(false)
      setCreateEventData({
        title: '',
        type: 'booking',
        status: 'pending',
        dateRange: {
          from: new Date(),
          to: new Date(),
        },
        allDay: true,
        startTime: '09:00',
        endTime: '17:00',
        details: {
          room: '',
          guest: '',
          staff: '',
          notes: '',
        },
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof EventFormData, string>> = {}
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          errors[path as keyof EventFormData] = err.message
        })
        setFormErrors(errors)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title>Calendar</Title>
          <Text>Manage bookings, schedules, and tasks</Text>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={FunnelIcon}>
            Filter
          </Button>
          <Button icon={PlusIcon} onClick={() => setShowCreateModal(true)}>
            Add Event
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text className="mb-2">Event Type</Text>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="booking">Bookings</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="housekeeping">Housekeeping</SelectItem>
              <SelectItem value="staff">Staff Events</SelectItem>
            </Select>
          </div>
          <div>
            <Text className="mb-2">Status</Text>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </Select>
          </div>
        </div>
      </Card>

      {/* Calendar */}
      <Card>
        <div className="h-[800px]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            events={filteredEvents}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            select={handleDateSelect}
            height="100%"
          />
        </div>
      </Card>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowCreateModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <Title>Create New Event</Title>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <Text className="mb-2">Event Title</Text>
                    <TextInput
                      placeholder="Enter event title"
                      value={createEventData.title}
                      onChange={(e) => setCreateEventData({ ...createEventData, title: e.target.value })}
                      error={!!formErrors.title}
                      errorMessage={formErrors.title}
                    />
                  </div>

                  <div>
                    <Text className="mb-2">Event Type</Text>
                    <Select
                      value={createEventData.type}
                      onValueChange={(value: any) => setCreateEventData({ ...createEventData, type: value })}
                    >
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="staff">Staff Event</SelectItem>
                    </Select>
                  </div>

                  <div>
                    <Text className="mb-2">Status</Text>
                    <Select
                      value={createEventData.status}
                      onValueChange={(value: any) => setCreateEventData({ ...createEventData, status: value })}
                    >
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </Select>
                  </div>

                  <div>
                    <Text className="mb-2">Date Range</Text>
                    <DateRangePicker
                      value={createEventData.dateRange}
                      onValueChange={handleDateRangeChange}
                      enableSelect={false}
                      minDate={startOfDay(new Date())}
                      maxDate={addDays(new Date(), 365)}
                      placeholder="Select date range"
                      className="mb-2"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="allDay"
                        checked={createEventData.allDay}
                        onChange={(e) => setCreateEventData({
                          ...createEventData,
                          allDay: e.target.checked,
                          startTime: e.target.checked ? undefined : '09:00',
                          endTime: e.target.checked ? undefined : '17:00',
                        })}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="allDay" className="text-sm text-gray-600">All Day Event</label>
                    </div>
                    {!createEventData.allDay && (
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Text className="mb-1">Start Time</Text>
                          <input
                            type="time"
                            value={createEventData.startTime}
                            onChange={(e) => handleTimeChange('start', e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Text className="mb-1">End Time</Text>
                          <input
                            type="time"
                            value={createEventData.endTime}
                            onChange={(e) => handleTimeChange('end', e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                    {formErrors.dateRange && (
                      <Text color="red" className="mt-1 text-sm">
                        {formErrors.dateRange}
                      </Text>
                    )}
                  </div>

                  {(createEventData.type === 'booking' || createEventData.type === 'maintenance' || createEventData.type === 'housekeeping') && (
                    <div>
                      <Text className="mb-2">Room Number</Text>
                      <TextInput
                        placeholder="Enter room number"
                        value={createEventData.details.room || ''}
                        onChange={(e) => setCreateEventData({
                          ...createEventData,
                          details: { ...createEventData.details, room: e.target.value }
                        })}
                      />
                    </div>
                  )}

                  {createEventData.type === 'booking' && (
                    <div>
                      <Text className="mb-2">Guest Name</Text>
                      <TextInput
                        placeholder="Enter guest name"
                        value={createEventData.details.guest || ''}
                        onChange={(e) => setCreateEventData({
                          ...createEventData,
                          details: { ...createEventData.details, guest: e.target.value }
                        })}
                      />
                    </div>
                  )}

                  {(createEventData.type === 'maintenance' || createEventData.type === 'housekeeping' || createEventData.type === 'staff') && (
                    <div>
                      <Text className="mb-2">Staff Member</Text>
                      <TextInput
                        placeholder="Enter staff member name"
                        value={createEventData.details.staff || ''}
                        onChange={(e) => setCreateEventData({
                          ...createEventData,
                          details: { ...createEventData.details, staff: e.target.value }
                        })}
                      />
                    </div>
                  )}

                  <div>
                    <Text className="mb-2">Notes</Text>
                    <Textarea
                      placeholder="Enter any additional notes"
                      value={createEventData.details.notes || ''}
                      onChange={(e) => setCreateEventData({
                        ...createEventData,
                        details: { ...createEventData.details, notes: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <Button onClick={handleCreateEvent}>
                  Create Event
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowEventModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Title>{selectedEvent.title}</Title>
                    <Badge color={statusColors[selectedEvent.status]} className="mt-2">
                      {selectedEvent.status}
                    </Badge>
                  </div>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <Text className="font-medium">Date & Time</Text>
                    <Text>
                      <DateFormatter date={selectedEvent.start} format="date" />
                      {!createEventData.allDay && (
                        <> - <DateFormatter date={selectedEvent.start} format="time" /></>
                      )}
                      {selectedEvent.start.toDateString() !== selectedEvent.end.toDateString() && (
                        <> - <DateFormatter date={selectedEvent.end} format="date" /></>
                      )}
                      {!createEventData.allDay && (
                        <> - <DateFormatter date={selectedEvent.end} format="time" /></>
                      )}
                    </Text>
                  </div>
                  {selectedEvent.details.room && (
                    <div>
                      <Text className="font-medium">Room</Text>
                      <Text>{selectedEvent.details.room}</Text>
                    </div>
                  )}
                  {selectedEvent.details.guest && (
                    <div>
                      <Text className="font-medium">Guest</Text>
                      <Text>{selectedEvent.details.guest}</Text>
                    </div>
                  )}
                  {selectedEvent.details.staff && (
                    <div>
                      <Text className="font-medium">Staff</Text>
                      <Text>{selectedEvent.details.staff}</Text>
                    </div>
                  )}
                  {selectedEvent.details.notes && (
                    <div>
                      <Text className="font-medium">Notes</Text>
                      <Text>{selectedEvent.details.notes}</Text>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="secondary"
                  onClick={() => setShowEventModal(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eventColors.booking.borderColor }}></div>
            <Text>Bookings</Text>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eventColors.maintenance.borderColor }}></div>
            <Text>Maintenance</Text>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eventColors.housekeeping.borderColor }}></div>
            <Text>Housekeeping</Text>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eventColors.staff.borderColor }}></div>
            <Text>Staff Events</Text>
          </div>
        </div>
      </Card>
    </div>
  )
} 