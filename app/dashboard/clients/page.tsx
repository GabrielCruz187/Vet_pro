import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientsTable } from "@/components/clients-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all clients with their pets count
  const { data: clients } = await supabase
    .from("clients")
    .select(`
      *,
      pets:pets(count)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie os clientes da clínica</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <ClientsTable clients={clients || []} />
    </div>
  )
}
