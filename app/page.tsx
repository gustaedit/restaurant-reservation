import { ReservationForm } from "@/components/reservation-form"
import { Calendar, Clock, Users } from "lucide-react"
// CORREÇÃO 1: Importar o Link do next/link
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/elegant-restaurant-interior.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-balance">Restaurante Couraça</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 text-pretty">
              Reserve sua mesa e desfrute de uma experiência gastronômica única
            </p>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Reserva Fácil</h3>
              <p className="text-sm text-muted-foreground">Escolha a data e horário que melhor se adequa a você</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Confirmação Rápida</h3>
              <p className="text-sm text-muted-foreground">Receba confirmação imediata da sua reserva</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Para Todos</h3>
              <p className="text-sm text-muted-foreground">Acomodamos grupos de todos os tamanhos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Faça sua Reserva</h2>
              <p className="text-muted-foreground">Preencha o formulário abaixo para garantir sua mesa</p>
            </div>
            <ReservationForm />
          </div>
        </div>
      </section>
      <div className="mt-4 container mx-auto px-4 max-w-2xl text-center"> {/* Adicionei container para alinhar */}
        {/* CORREÇÃO 2: Mudar 'to' para 'href' */}
        <Link
          href="/admin/dashboard" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Acesso Admin
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Restaurante Couraça. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  )
}