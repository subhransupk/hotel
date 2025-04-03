'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { DatePicker } from '../ui/date-picker'

const staffFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  position: z.enum(['manager', 'receptionist', 'housekeeper', 'maintenance', 'chef', 'waiter']),
  department: z.enum(['management', 'front_desk', 'housekeeping', 'maintenance', 'restaurant', 'security']),
  status: z.enum(['active', 'on_leave', 'terminated']),
  joinDate: z.string(),
  schedule: z.enum(['morning', 'afternoon', 'night', 'flexible']),
  salary: z.number().min(0, 'Salary must be a positive number'),
  address: z.string().min(1, 'Address is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  notes: z.string().optional(),
})

type StaffFormData = z.infer<typeof staffFormSchema>

interface StaffFormProps {
  initialData?: Partial<StaffFormData>
  onSubmit: (data: StaffFormData) => void
  isSubmitting?: boolean
}

export function StaffForm({ initialData, onSubmit, isSubmitting }: StaffFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      ...initialData,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@hotel.com"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State"
              {...register('address')}
              error={errors.address?.message}
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              placeholder="+1 (555) 987-6543"
              {...register('emergencyContact')}
              error={errors.emergencyContact?.message}
            />
          </div>
        </div>

        {/* Employment Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="position">Position</Label>
            <Select
              id="position"
              {...register('position')}
              error={errors.position?.message}
            >
              <option value="">Select a position</option>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
              <option value="housekeeper">Housekeeper</option>
              <option value="maintenance">Maintenance</option>
              <option value="chef">Chef</option>
              <option value="waiter">Waiter</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              id="department"
              {...register('department')}
              error={errors.department?.message}
            >
              <option value="">Select a department</option>
              <option value="management">Management</option>
              <option value="front_desk">Front Desk</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="maintenance">Maintenance</option>
              <option value="restaurant">Restaurant</option>
              <option value="security">Security</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              {...register('status')}
              error={errors.status?.message}
            >
              <option value="">Select a status</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="terminated">Terminated</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Select
              id="schedule"
              {...register('schedule')}
              error={errors.schedule?.message}
            >
              <option value="">Select a schedule</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
              <option value="flexible">Flexible</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              type="number"
              placeholder="50000"
              {...register('salary', { valueAsNumber: true })}
              error={errors.salary?.message}
            />
          </div>

          <div>
            <Label htmlFor="joinDate">Join Date</Label>
            <DatePicker
              id="joinDate"
              value={initialData?.joinDate}
              onChange={(date) => setValue('joinDate', date)}
              error={errors.joinDate?.message}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional notes about the staff member..."
          {...register('notes')}
          error={errors.notes?.message}
          className="h-24"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update Staff Member' : 'Add Staff Member'}
        </Button>
      </div>
    </form>
  )
} 