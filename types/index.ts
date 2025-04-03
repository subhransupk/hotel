export interface Room {
  id: string
  number: string
  type: string
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning'
  floor: number
  capacity: number
  price: number
  amenities: string[]
  bedType: string
  size: string
  description: string
  maxOccupancy: number
  basePrice: number
  weekendPrice?: number
  seasonalPrice?: number
}

export type RoomStatus = Room['status'] 