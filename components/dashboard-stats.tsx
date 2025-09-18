import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Package, DollarSign, Heart, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface DashboardStatsProps {
  clientsCount: number
  petsCount: number
  appointmentsToday: number
  appointmentsWeek: number
  lowStockItems: number
  pendingInvoices: number
  monthlyRevenue: number
}

export function DashboardStats({
  clientsCount,
  petsCount,
  appointmentsToday,
  appointmentsWeek,
  lowStockItems,
  pendingInvoices,
  monthlyRevenue,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total de Clientes",
      value: clientsCount,
      description: "Clientes cadastrados",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pets Cadastrados",
      value: petsCount,
      description: "Animais no sistema",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Consultas Hoje",
      value: appointmentsToday,
      description: "Agendamentos para hoje",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Consultas Semana",
      value: appointmentsWeek,
      description: "Últimos 7 dias",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Receita Mensal",
      value: `R$ ${monthlyRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Faturamento do mês",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Faturas Pendentes",
      value: pendingInvoices,
      description: "Aguardando pagamento",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Estoque Baixo",
      value: lowStockItems,
      description: "Itens para repor",
      icon: Package,
      color: lowStockItems > 0 ? "text-red-600" : "text-green-600",
      bgColor: lowStockItems > 0 ? "bg-red-50" : "bg-green-50",
    },
    {
      title: "Sistema",
      value: "Online",
      description: "Status operacional",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-600">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
