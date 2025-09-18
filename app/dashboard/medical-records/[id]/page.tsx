import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MedicalRecordDetails } from "@/components/medical-record-details"

interface MedicalRecordPageProps {
  params: Promise<{ id: string }>
}

export default async function MedicalRecordPage({ params }: MedicalRecordPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get medical record with pet and client information
  const { data: medicalRecord } = await supabase
    .from("medical_records")
    .select(`
      *,
      pet:pets(
        *,
        client:clients(*)
      ),
      veterinarian:profiles(full_name, specialization)
    `)
    .eq("id", id)
    .single()

  if (!medicalRecord) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <MedicalRecordDetails medicalRecord={medicalRecord} />
    </div>
  )
}
