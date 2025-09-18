import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FinancialTransactionForm } from "@/components/financial-transaction-form"

export default async function NewTransactionPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get clients for revenue transactions
  const { data: clients } = await supabase.from("clients").select("id, name").order("name")

  // Get appointments for linking revenue
  const { data: appointments } = await supabase
    .from("appointments")
    .select(`
      id,
      service_type,
      appointment_date,
      client:clients(name),
      pet:pets(name)
    `)
    .eq("status", "completed")
    .order("appointment_date", { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nova Transação</h1>
        <p className="text-gray-600">Registre uma nova receita ou despesa</p>
      </div>

      <FinancialTransactionForm clients={clients || []} appointments={appointments || []} />
    </div>
  )
}
