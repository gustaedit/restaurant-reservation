"use client"

import { useState } from "react"
import { mockReservations } from "@/lib/mock-data"
import type { Reservation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Search, Trash2, Edit, Phone, Users, Clock } from "lucide-react"

export function ReservationsTable() {
  const { toast } = useToast()
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; reservation: Reservation | null }>({
    open: false,
    reservation: null,
  })

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customer_phone.includes(searchTerm)
    const matchesDate = !selectedDate || reservation.reservation_date === selectedDate
    return matchesSearch && matchesDate && reservation.status !== "cancelled"
  })

  const handleDelete = (reservation: Reservation) => {
    setDeleteDialog({ open: true, reservation })
  }

  const confirmDelete = () => {
    if (deleteDialog.reservation) {
      setReservations((prev) =>
        prev.map((r) => (r.id === deleteDialog.reservation!.id ? { ...r, status: "cancelled" as const } : r)),
      )
      toast({
        title: "Reserva Cancelada",
        description: `A reserva de ${deleteDialog.reservation.customer_name} foi cancelada.`,
      })
    }
    setDeleteDialog({ open: false, reservation: null })
  }

  const getStatusBadge = (status: Reservation["status"]) => {
    const variants = {
      confirmed: "default",
      cancelled: "destructive",
      completed: "secondary",
    } as const

    const labels = {
      confirmed: "Confirmada",
      cancelled: "Cancelada",
      completed: "Concluída",
    }

    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Reservas</CardTitle>
          <CardDescription>Visualize, edite e cancele reservas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative sm:w-48">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Hoje</p>
              <p className="text-2xl font-bold">
                {reservations.filter((r) => r.reservation_date === today && r.status === "confirmed").length}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Pessoas Hoje</p>
              <p className="text-2xl font-bold">
                {reservations
                  .filter((r) => r.reservation_date === today && r.status === "confirmed")
                  .reduce((sum, r) => sum + r.number_of_guests, 0)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Mesas Ocupadas</p>
              <p className="text-2xl font-bold">
                {
                  new Set(
                    reservations
                      .filter((r) => r.reservation_date === today && r.status === "confirmed")
                      .map((r) => r.table_number),
                  ).size
                }
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Taxa Ocupação</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  (new Set(
                    reservations
                      .filter((r) => r.reservation_date === today && r.status === "confirmed")
                      .map((r) => r.table_number),
                  ).size /
                    10) *
                    100,
                )}
                %
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Pessoas</TableHead>
                  <TableHead>Mesa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhuma reserva encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reservation.customer_name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {reservation.customer_phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p>{new Date(reservation.reservation_date).toLocaleDateString("pt-BR")}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {reservation.reservation_time}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {reservation.number_of_guests}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Mesa {reservation.table_number}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(reservation)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, reservation: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Reserva</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar a reserva de {deleteDialog.reservation?.customer_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, reservation: null })}>
              Voltar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Cancelar Reserva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
