"use client"

import type React from "react"

import { useState } from "react"
import { mockConfig } from "@/lib/mock-data"
import type { RestaurantConfig } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export function RestaurantSettings() {
  const { toast } = useToast()
  const [config, setConfig] = useState<RestaurantConfig>(mockConfig)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Configurações Salvas",
      description: "As configurações do restaurante foram atualizadas com sucesso.",
    })

    setIsLoading(false)
  }

  const handleChange = (field: keyof RestaurantConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [field]: Number.parseInt(value) || 0,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Restaurante</CardTitle>
        <CardDescription>Gerencie a capacidade total do restaurante</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="total_tables">Número Total de Mesas</Label>
              <Input
                id="total_tables"
                type="number"
                min="1"
                value={config.total_tables}
                onChange={(e) => handleChange("total_tables", e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">Quantidade de mesas disponíveis no restaurante</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_seats">Capacidade Total de Lugares</Label>
              <Input
                id="total_seats"
                type="number"
                min="1"
                value={config.total_seats}
                onChange={(e) => handleChange("total_seats", e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">Número máximo de pessoas que podem ser acomodadas</p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Resumo</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Mesas</p>
                <p className="text-lg font-semibold">{config.total_tables}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Lugares</p>
                <p className="text-lg font-semibold">{config.total_seats}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Média por Mesa</p>
                <p className="text-lg font-semibold">{(config.total_seats / config.total_tables).toFixed(1)}</p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
