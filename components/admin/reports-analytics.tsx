"use client"

import { useState } from "react"
import { mockReservations } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Calendar, TrendingUp, Users, TableIcon, Download } from "lucide-react"

export function ReportsAnalytics() {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0])

  // Generate daily data for the selected date range
  const generateDailyData = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const data = []

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      const dayReservations = mockReservations.filter((r) => r.reservation_date === dateStr && r.status === "confirmed")

      data.push({
        date: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        reservations: dayReservations.length,
        guests: dayReservations.reduce((sum, r) => sum + r.number_of_guests, 0),
        occupancy: Math.round((new Set(dayReservations.map((r) => r.table_number)).size / 10) * 100),
      })
    }

    return data
  }

  const dailyData = generateDailyData()

  // Calculate summary statistics
  const totalReservations = dailyData.reduce((sum, d) => sum + d.reservations, 0)
  const totalGuests = dailyData.reduce((sum, d) => sum + d.guests, 0)
  const avgOccupancy = Math.round(dailyData.reduce((sum, d) => sum + d.occupancy, 0) / dailyData.length)
  const avgGuestsPerReservation = totalReservations > 0 ? (totalGuests / totalReservations).toFixed(1) : "0"

  const handleExport = () => {
    // Create CSV content
    const headers = ["Data", "Reservas", "Pessoas", "Taxa Ocupação (%)"]
    const rows = dailyData.map((d) => [d.date, d.reservations, d.guests, d.occupancy])
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")

    // Download CSV
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `relatorio-${startDate}-${endDate}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Período do Relatório</CardTitle>
          <CardDescription>Selecione o intervalo de datas para análise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="start-date">Data Inicial</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="end-date">Data Final</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservations}</div>
            <p className="text-xs text-muted-foreground">No período selecionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pessoas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground">Média de {avgGuestsPerReservation} por reserva</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TableIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
            <p className="text-xs text-muted-foreground">Média do período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {dailyData.length > 1 && dailyData[dailyData.length - 1].reservations > dailyData[0].reservations
                ? "↑"
                : "↓"}
            </div>
            <p className="text-xs text-muted-foreground">
              {dailyData.length > 1 && dailyData[dailyData.length - 1].reservations > dailyData[0].reservations
                ? "Crescimento"
                : "Declínio"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reservas por Dia</CardTitle>
            <CardDescription>Número de reservas confirmadas por dia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="reservations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pessoas por Dia</CardTitle>
            <CardDescription>Total de pessoas atendidas por dia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line type="monotone" dataKey="guests" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Ocupação</CardTitle>
          <CardDescription>Percentual de mesas ocupadas por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value) => [`${value}%`, "Ocupação"]}
              />
              <Bar dataKey="occupancy" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Diário</CardTitle>
          <CardDescription>Detalhamento das métricas por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Data</th>
                  <th className="text-right p-3 text-sm font-medium">Reservas</th>
                  <th className="text-right p-3 text-sm font-medium">Pessoas</th>
                  <th className="text-right p-3 text-sm font-medium">Ocupação</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((day, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-sm">{day.date}</td>
                    <td className="p-3 text-sm text-right">{day.reservations}</td>
                    <td className="p-3 text-sm text-right">{day.guests}</td>
                    <td className="p-3 text-sm text-right">{day.occupancy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
