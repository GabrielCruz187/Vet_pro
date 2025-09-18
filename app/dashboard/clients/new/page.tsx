import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientForm } from "@/components/client-form"

export default async function NewClientPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Cliente</h1>
        <p className="text-gray-600">Cadastre um novo cliente no sistema</p>
      </div>

      <ClientForm />
    </div>
  )
}
