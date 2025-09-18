import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1">
          <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Sistema Veterinário</h2>
              <UserNav user={data.user} profile={profile} />
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
