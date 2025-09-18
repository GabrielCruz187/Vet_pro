import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FinancialReports } from "@/components/financial-reports"

export default async function ReportsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios Financeiros</h1>
        <p className="text-gray-600">Análises e relatórios detalhados</p>
      </div>

      <FinancialReports />
    </div>
  )
}
