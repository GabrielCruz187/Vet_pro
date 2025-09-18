import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MedicalRecordForm } from "@/components/medical-record-form"

export default async function NewMedicalRecordPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all pets with client information for the select
  const { data: pets } = await supabase
    .from("pets")
    .select(`
      id,
      name,
      species,
      client:clients(name)
    `)
    .order("name")

  // Get all veterinarians
  const { data: veterinarians } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("role", ["veterinarian", "admin"])
    .order("full_name")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Prontuário</h1>
        <p className="text-gray-600">Registre uma nova consulta médica</p>
      </div>

      <MedicalRecordForm pets={pets || []} veterinarians={veterinarians || []} />
    </div>
  )
}
