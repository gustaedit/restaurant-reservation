export interface Reservation {
  id: number
  customer_name: string
  customer_phone: string
  reservation_date: string
  reservation_time: string
  number_of_guests: number
  table_number?: number
  notes?: string
  status: "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
}

export interface RestaurantConfig {
  id: number
  total_tables: number
  total_seats: number
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: number
  email: string
  name: string
  created_at: string
}

export interface WaitlistEntry {
  id: number
  customer_name: string
  customer_phone: string
  preferred_date: string
  preferred_time: string
  number_of_guests: number
  notes?: string
  status: "waiting" | "contacted" | "converted"
  created_at: string
}

export interface DailyReport {
  date: string
  total_reservations: number
  total_guests: number
  occupied_tables: number
  available_tables: number
  occupancy_rate: number
}
