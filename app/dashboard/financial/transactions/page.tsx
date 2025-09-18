import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FinancialTransactionsTable } from "@/components/financial-transactions-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

interface TransactionsPageProps {
  searchParams: Promise<{ type?: string }>
}

export default async function TransactionsPage({ searchParams }: TransactionsPageProps) {
  const { type } = await searchParams
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all transactions with related data
  let query = supabase.from("financial_transactions").select(`
    *,
    client:clients(name),
    appointment:appointments(service_type),
    created_by_profile:profiles(full_name)
  `)

  if (type && (type === "revenue" || type === "expense")) {
    query = query.eq("type", type)
  }

  const { data: transactions } = await query.order("transaction_date", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {type === "revenue" ? "Receitas" : type === "expense" ? "Despesas" : "Transações Financeiras"}
          </h1>
          <p className="text-gray-600">Histórico de movimentações financeiras</p>
        </div>
        <Link href="/dashboard/financial/transactions/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </Link>
      </div>

      <FinancialTransactionsTable transactions={transactions || []} />
    </div>
  )
}
