import { LoginForm } from "@/components/admin/login-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLoginPage() {
  const session = await getSession()

  if (session) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Couraça Admin</h1>
          <p className="text-muted-foreground">Acesse o painel de administração</p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Credenciais de teste:</p>
          <p className="font-mono mt-1">admin@couraca.pt / admin123</p>
        </div>
      </div>
    </div>
  )
}
