import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amount: number
  description: string
  transaction_date: string
  client: {
    name: string
  } | null
  appointment: {
    service_type: string
  } | null
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getTransactionIcon = (type: string) => {
    return type === "revenue" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getTransactionColor = (type: string) => {
    return type === "revenue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getTransactionLabel = (type: string) => {
    return type === "revenue" ? "Receita" : "Despesa"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 8).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.client?.name || transaction.appointment?.service_type || "Sistema"}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(transaction.transaction_date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">
                  {transaction.type === "revenue" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                </div>
                <Badge className={`text-xs ${getTransactionColor(transaction.type)}`}>
                  {getTransactionLabel(transaction.type)}
                </Badge>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">Nenhuma transação registrada ainda.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
