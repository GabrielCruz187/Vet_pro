import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InventoryTable } from "@/components/inventory-table"
import { InventoryStats } from "@/components/inventory-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function InventoryPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all inventory items
  const { data: inventory } = await supabase.from("inventory").select("*").order("name")

  // Get inventory statistics
  const [totalItems, lowStockItems, expiringSoon] = await Promise.all([
    supabase.from("inventory").select("id", { count: "exact" }),
    supabase.from("inventory").select("id", { count: "exact" }).lt("current_stock", 10),
    supabase
      .from("inventory")
      .select("id", { count: "exact" })
      .not("expiration_date", "is", null)
      .lte("expiration_date", new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]),
  ])

  const stats = {
    totalItems: totalItems.count || 0,
    lowStockItems: lowStockItems.count || 0,
    expiringSoon: expiringSoon.count || 0,
    totalValue: inventory?.reduce((sum, item) => sum + item.current_stock * (item.unit_price || 0), 0) || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600">Gerencie o estoque de produtos e medicamentos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/inventory/movements">
            <Button variant="outline">Ver Movimentações</Button>
          </Link>
          <Link href="/dashboard/inventory/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </Link>
        </div>
      </div>

      <InventoryStats stats={stats} />
      <InventoryTable inventory={inventory || []} />
    </div>
  )
}
