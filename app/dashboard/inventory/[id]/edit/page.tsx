import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InventoryForm } from "@/components/inventory-form"

interface EditInventoryPageProps {
  params: Promise<{ id: string }>
}

export default async function EditInventoryPage({ params }: EditInventoryPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get inventory item data
  const { data: item } = await supabase.from("inventory").select("*").eq("id", id).single()

  if (!item) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
        <p className="text-gray-600">Atualize as informações do produto</p>
      </div>

      <InventoryForm item={item} />
    </div>
  )
}
