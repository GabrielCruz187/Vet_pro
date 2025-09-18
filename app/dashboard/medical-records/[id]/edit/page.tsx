import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MedicalRecordForm } from "@/components/medical-record-form"

interface EditMedicalRecordPageProps {
  params: Promise<{ id: string }>
}

export default async function EditMedicalRecordPage({ params }: EditMedicalRecordPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get medical record data
  const { data: medicalRecord } = await supabase.from("medical_records").select("*").eq("id", id).single()

  if (!medicalRecord) {
    notFound()
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
        <h1 className="text-3xl font-bold text-gray-900">Editar Prontuário</h1>
        <p className="text-gray-600">Atualize as informações do prontuário médico</p>
      </div>

      <MedicalRecordForm medicalRecord={medicalRecord} pets={pets || []} veterinarians={veterinarians || []} />
    </div>
  )
}
