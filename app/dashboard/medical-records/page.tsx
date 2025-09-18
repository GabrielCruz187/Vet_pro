import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MedicalRecordsTable } from "@/components/medical-records-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function MedicalRecordsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all medical records with pet and client information
  const { data: medicalRecords } = await supabase
    .from("medical_records")
    .select(`
      *,
      pet:pets(
        id,
        name,
        species,
        client:clients(name, phone)
      ),
      veterinarian:profiles(full_name)
    `)
    .order("visit_date", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prontuários Médicos</h1>
          <p className="text-gray-600">Gerencie os registros médicos dos pets</p>
        </div>
        <Link href="/dashboard/medical-records/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Prontuário
          </Button>
        </Link>
      </div>

      <MedicalRecordsTable medicalRecords={medicalRecords || []} />
    </div>
  )
}
