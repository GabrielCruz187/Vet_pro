import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InventoryMovementForm } from "@/components/inventory-movement-form"

export default async function NewInventoryMovementPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all inventory items
  const { data: inventory } = await supabase.from("inventory").select("id, name, sku, current_stock").order("name")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nova Movimentação</h1>
        <p className="text-gray-600">Registre uma entrada ou saída de estoque</p>
      </div>

      <InventoryMovementForm inventory={inventory || []} />
    </div>
  )
}
