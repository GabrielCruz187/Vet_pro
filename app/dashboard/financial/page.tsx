import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FinancialStats } from "@/components/financial-stats"
import { FinancialChart } from "@/components/financial-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function FinancialPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get financial data for current month
  const currentMonth = new Date().toISOString().slice(0, 7)
  const startOfMonth = `${currentMonth}-01`
  const endOfMonth = `${currentMonth}-31`

  const [revenueData, expenseData, recentTransactions] = await Promise.all([
    supabase
      .from("financial_transactions")
      .select("amount")
      .eq("type", "revenue")
      .gte("transaction_date", startOfMonth)
      .lte("transaction_date", endOfMonth),
    supabase
      .from("financial_transactions")
      .select("amount")
      .eq("type", "expense")
      .gte("transaction_date", startOfMonth)
      .lte("transaction_date", endOfMonth),
    supabase
      .from("financial_transactions")
      .select(`
        *,
        client:clients(name),
        appointment:appointments(service_type)
      `)
      .order("transaction_date", { ascending: false })
      .limit(10),
  ])

  const monthlyRevenue = revenueData.data?.reduce((sum, t) => sum + t.amount, 0) || 0
  const monthlyExpenses = expenseData.data?.reduce((sum, t) => sum + t.amount, 0) || 0
  const monthlyProfit = monthlyRevenue - monthlyExpenses

  // Get chart data for last 6 months
  const chartData = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthStr = date.toISOString().slice(0, 7)
    const startDate = `${monthStr}-01`
    const endDate = `${monthStr}-31`

    const [monthRevenue, monthExpense] = await Promise.all([
      supabase
        .from("financial_transactions")
        .select("amount")
        .eq("type", "revenue")
        .gte("transaction_date", startDate)
        .lte("transaction_date", endDate),
      supabase
        .from("financial_transactions")
        .select("amount")
        .eq("type", "expense")
        .gte("transaction_date", startDate)
        .lte("transaction_date", endDate),
    ])

    chartData.push({
      month: date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" }),
      revenue: monthRevenue.data?.reduce((sum, t) => sum + t.amount, 0) || 0,
      expenses: monthExpense.data?.reduce((sum, t) => sum + t.amount, 0) || 0,
    })
  }

  const stats = {
    monthlyRevenue,
    monthlyExpenses,
    monthlyProfit,
    profitMargin: monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">Controle financeiro da clínica</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/financial/reports">
            <Button variant="outline">Relatórios</Button>
          </Link>
          <Link href="/dashboard/financial/transactions/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>
          </Link>
        </div>
      </div>

      <FinancialStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialChart data={chartData} />
        <RecentTransactions transactions={recentTransactions.data || []} />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="revenue">Receitas</TabsTrigger>
          <TabsTrigger value="expense">Despesas</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Link href="/dashboard/financial/transactions">
            <Button variant="outline" className="w-full bg-transparent">
              Ver Todas as Transações
            </Button>
          </Link>
        </TabsContent>
        <TabsContent value="revenue">
          <Link href="/dashboard/financial/transactions?type=revenue">
            <Button variant="outline" className="w-full bg-transparent">
              Ver Todas as Receitas
            </Button>
          </Link>
        </TabsContent>
        <TabsContent value="expense">
          <Link href="/dashboard/financial/transactions?type=expense">
            <Button variant="outline" className="w-full bg-transparent">
              Ver Todas as Despesas
            </Button>
          </Link>
        </TabsContent>
      </Tabs>
    </div>
  )
}
