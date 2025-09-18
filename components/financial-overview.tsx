import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, CreditCard, Banknote } from "lucide-react"

interface FinancialOverviewProps {
  monthlyRevenue: number
}

export function FinancialOverview({ monthlyRevenue }: FinancialOverviewProps) {
  const previousMonth = monthlyRevenue * 0.85 // Simulated previous month data
  const growth = ((monthlyRevenue - previousMonth) / previousMonth) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          Visão Financeira
        </CardTitle>
        <CardDescription>Resumo financeiro do mês atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Receita Mensal</p>
                <p className="text-2xl font-bold text-green-700">
                  R$ {monthlyRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600">
                {growth > 0 ? "+" : ""}
                {growth.toFixed(1)}%
              </p>
              <p className="text-xs text-green-500">vs mês anterior</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-blue-600">Cartão</p>
                <p className="font-medium text-blue-900">65%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Banknote className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-green-600">Dinheiro</p>
                <p className="font-medium text-green-900">35%</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-500 text-center">Dados atualizados em tempo real</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
