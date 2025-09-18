"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface FinancialChartProps {
  data: {
    month: string
    revenue: number
    expenses: number
  }[]
}

export function FinancialChart({ data }: FinancialChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Despesas (Últimos 6 meses)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, ""]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#10b981" name="Receitas" />
            <Bar dataKey="expenses" fill="#ef4444" name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
