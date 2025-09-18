import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"

interface FinancialStatsProps {
  stats: {
    monthlyRevenue: number
    monthlyExpenses: number
    monthlyProfit: number
    profitMargin: number
  }
}

export function FinancialStats({ stats }: FinancialStatsProps) {
  const statsData = [
    {
      title: "Receita Mensal",
      value: `R$ ${stats.monthlyRevenue.toFixed(2)}`,
      description: "Receitas do mês atual",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Despesas Mensais",
      value: `R$ ${stats.monthlyExpenses.toFixed(2)}`,
      description: "Despesas do mês atual",
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Lucro Mensal",
      value: `R$ ${stats.monthlyProfit.toFixed(2)}`,
      description: "Lucro líquido do mês",
      icon: DollarSign,
      color: stats.monthlyProfit >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Margem de Lucro",
      value: `${stats.profitMargin.toFixed(1)}%`,
      description: "Margem de lucro mensal",
      icon: Percent,
      color: stats.profitMargin >= 0 ? "text-green-600" : "text-red-600",
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
