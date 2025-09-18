import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, Calendar, DollarSign } from "lucide-react"

interface InventoryStatsProps {
  stats: {
    totalItems: number
    lowStockItems: number
    expiringSoon: number
    totalValue: number
  }
}

export function InventoryStats({ stats }: InventoryStatsProps) {
  const statsData = [
    {
      title: "Total de Produtos",
      value: stats.totalItems,
      description: "Produtos cadastrados",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Estoque Baixo",
      value: stats.lowStockItems,
      description: "Produtos com estoque baixo",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Vencendo em 30 dias",
      value: stats.expiringSoon,
      description: "Produtos próximos ao vencimento",
      icon: Calendar,
      color: "text-red-600",
    },
    {
      title: "Valor Total",
      value: `R$ ${stats.totalValue.toFixed(2)}`,
      description: "Valor total do estoque",
      icon: DollarSign,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
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
