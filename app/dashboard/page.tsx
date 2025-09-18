import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, AlertTriangle } from "lucide-react"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { QuickActions } from "@/components/quick-actions"
import { FinancialOverview } from "@/components/financial-overview"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [
    clientsCount,
    petsCount,
    appointmentsToday,
    appointmentsWeek,
    lowStockItems,
    pendingInvoices,
    monthlyRevenue,
    recentAppointments,
    criticalStock,
  ] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact" }),
    supabase.from("pets").select("id", { count: "exact" }),
    supabase
      .from("appointments")
      .select("id", { count: "exact" })
      .eq("appointment_date", new Date().toISOString().split("T")[0])
      .eq("status", "scheduled"),
    supabase
      .from("appointments")
      .select("id", { count: "exact" })
      .gte("appointment_date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
      .lte("appointment_date", new Date().toISOString().split("T")[0]),
    supabase.from("inventory").select("id", { count: "exact" }).lt("current_stock", 10),
    supabase.from("invoices").select("total_amount", { count: "exact" }).eq("status", "pending"),
    supabase
      .from("invoices")
      .select("total_amount")
      .eq("status", "paid")
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase
      .from("appointments")
      .select(`
        id,
        appointment_date,
        appointment_time,
        status,
        pets (name, species),
        clients (name, phone)
      `)
      .eq("appointment_date", new Date().toISOString().split("T")[0])
      .order("appointment_time", { ascending: true })
      .limit(5),
    supabase.from("inventory").select("name, current_stock, minimum_stock").lt("current_stock", 5).limit(5),
  ])

  const monthlyTotal = monthlyRevenue.data?.reduce((sum, invoice) => sum + (invoice.total_amount || 0), 0) || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema veterinário</p>
        </div>
        <div className="flex items-center space-x-2 text-emerald-600">
          <Stethoscope className="h-8 w-8" />
          <span className="text-2xl font-bold">VetPro</span>
        </div>
      </div>

      <DashboardStats
        clientsCount={clientsCount.count || 0}
        petsCount={petsCount.count || 0}
        appointmentsToday={appointmentsToday.count || 0}
        appointmentsWeek={appointmentsWeek.count || 0}
        lowStockItems={lowStockItems.count || 0}
        pendingInvoices={pendingInvoices.count || 0}
        monthlyRevenue={monthlyTotal}
      />

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointments appointments={recentAppointments.data || []} />

        <FinancialOverview monthlyRevenue={monthlyTotal} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Alertas de Estoque
            </CardTitle>
            <CardDescription>Produtos com estoque crítico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalStock.data?.length === 0 ? (
                <p className="text-sm text-gray-500">Nenhum produto com estoque crítico</p>
              ) : (
                criticalStock.data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div>
                      <p className="font-medium text-red-900">{item.name}</p>
                      <p className="text-sm text-red-600">Estoque atual: {item.current_stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-700">Mínimo: {item.minimum_stock}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
