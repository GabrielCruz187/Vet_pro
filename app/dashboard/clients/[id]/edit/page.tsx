import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientForm } from "@/components/client-form"

interface EditClientPageProps {
  params: Promise<{ id: string }>
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get client data
  const { data: client } = await supabase.from("clients").select("*").eq("id", id).single()

  if (!client) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editar Cliente</h1>
        <p className="text-gray-600">Atualize as informações do cliente</p>
      </div>

      <ClientForm client={client} />
    </div>
  )
}
