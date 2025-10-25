import { getSession } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { ReservationsTable } from "@/components/admin/reservations-table"
import { RestaurantSettings } from "@/components/admin/restaurant-settings"
import { ReportsAnalytics } from "@/components/admin/reports-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminDashboardPage() {
  const session = await getSession()

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={session!} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Painel de Administração</h1>
          <p className="text-muted-foreground">Gerencie reservas e configurações do restaurante</p>
        </div>

        <Tabs defaultValue="reservations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reservations">Reservas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="space-y-6">
            <ReservationsTable />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsAnalytics />
          </TabsContent>

          <TabsContent value="settings">
            <RestaurantSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
