"use server"

import { cookies } from "next/headers"

export interface AdminSession {
  id: number
  email: string
  name: string
}

// Mock admin credentials (in production, this would check against database)
const MOCK_ADMIN = {
  email: "admin@couraca.pt",
  password: "admin123",
  id: 1,
  name: "Administrador",
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
    const session: AdminSession = {
      id: MOCK_ADMIN.id,
      email: MOCK_ADMIN.email,
      name: MOCK_ADMIN.name,
    }

    const cookieStore = await cookies()
    cookieStore.set("admin_session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true }
  }

  return { success: false, error: "Email ou senha inválidos" }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value) as AdminSession
  } catch {
    return null
  }
}
