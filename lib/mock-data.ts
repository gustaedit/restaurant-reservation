import type { Reservation, RestaurantConfig } from "./types"

export const mockConfig: RestaurantConfig = {
  id: 1,
  total_tables: 10,
  total_seats: 40,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const mockReservations: Reservation[] = [
  {
    id: 1,
    customer_name: "João Silva",
    customer_phone: "+351 912 345 678",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "19:00",
    number_of_guests: 4,
    table_number: 5,
    notes: "Aniversário",
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    customer_name: "Maria Santos",
    customer_phone: "+351 913 456 789",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "20:00",
    number_of_guests: 2,
    table_number: 3,
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    customer_name: "Pedro Costa",
    customer_phone: "+351 914 567 890",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "19:30",
    number_of_guests: 6,
    table_number: 8,
    notes: "Jantar de negócios",
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
