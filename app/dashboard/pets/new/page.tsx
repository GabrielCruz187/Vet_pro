import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PetForm } from "@/components/pet-form"

export default async function NewPetPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all clients for the select
  const { data: clients } = await supabase.from("clients").select("id, name").order("name")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Pet</h1>
        <p className="text-gray-600">Cadastre um novo pet no sistema</p>
      </div>

      <PetForm clients={clients || []} />
    </div>
  )
}
