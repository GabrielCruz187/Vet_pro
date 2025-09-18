"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Search, TrendingUp, TrendingDown, Calendar } from "lucide-react"

interface FinancialTransaction {
  id: string
  type: string
  amount: number
  description: string
  category: string | null
  transaction_date: string
  payment_method: string | null
  created_at: string
  client: {
    name: string
  } | null
  appointment: {
    service_type: string
  } | null
  created_by_profile: {
    full_name: string
  } | null
}

interface FinancialTransactionsTableProps {
  transactions: FinancialTransaction[]
}

export function FinancialTransactionsTable({ transactions }: FinancialTransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = Array.from(new Set(transactions.map((t) => t.category).filter(Boolean)))

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.client?.name && transaction.client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.category && transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter

    return matchesSearch && matchesType && matchesCategory
  })

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
        <CardTitle>Transações Financeiras</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="revenue">Receita</SelectItem>
              <SelectItem value="expense">Despesa</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category!}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente/Serviço</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getTransactionIcon(transaction.type)}
                    <span className="font-medium">{transaction.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTransactionColor(transaction.type)}>
                    {getTransactionLabel(transaction.type)}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">
                  {transaction.type === "revenue" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.category || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(transaction.transaction_date).toLocaleDateString("pt-BR")}
                  </div>
                </TableCell>
                <TableCell>{transaction.client?.name || transaction.appointment?.service_type || "-"}</TableCell>
                <TableCell>{transaction.payment_method || "-"}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/financial/transactions/${transaction.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm || typeFilter !== "all" || categoryFilter !== "all"
              ? "Nenhuma transação encontrada."
              : "Nenhuma transação registrada ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
