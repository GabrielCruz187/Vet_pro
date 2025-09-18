import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PetsTable } from "@/components/pets-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function PetsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all pets with client information
  const { data: pets } = await supabase
    .from("pets")
    .select(`
      *,
      client:clients(name, phone)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pets</h1>
          <p className="text-gray-600">Gerencie os pets cadastrados</p>
        </div>
        <Link href="/dashboard/pets/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pet
          </Button>
        </Link>
      </div>

      <PetsTable pets={pets || []} />
    </div>
  )
}
