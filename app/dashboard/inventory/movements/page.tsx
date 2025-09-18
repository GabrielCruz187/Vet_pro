import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InventoryMovementsTable } from "@/components/inventory-movements-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function InventoryMovementsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all inventory movements with product information
  const { data: movements } = await supabase
    .from("inventory_movements")
    .select(`
      *,
      inventory:inventory(name, sku),
      created_by_profile:profiles(full_name)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Movimentações de Estoque</h1>
          <p className="text-gray-600">Histórico de entradas e saídas do estoque</p>
        </div>
        <Link href="/dashboard/inventory/movements/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Nova Movimentação
          </Button>
        </Link>
      </div>

      <InventoryMovementsTable movements={movements || []} />
    </div>
  )
}
