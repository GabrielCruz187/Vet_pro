import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppointmentForm } from "@/components/appointment-form"

export default async function NewAppointmentPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all clients with pets
  const { data: clients } = await supabase
    .from("clients")
    .select(`
      id,
      name,
      phone,
      pets:pets(id, name, species)
    `)
    .order("name")

  // Get all veterinarians
  const { data: veterinarians } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("role", ["veterinarian", "admin"])
    .order("full_name")

  // Get all services
  const { data: services } = await supabase.from("services").select("*").eq("active", true).order("name")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Agendamento</h1>
        <p className="text-gray-600">Agende uma nova consulta</p>
      </div>

      <AppointmentForm clients={clients || []} veterinarians={veterinarians || []} services={services || []} />
    </div>
  )
}
