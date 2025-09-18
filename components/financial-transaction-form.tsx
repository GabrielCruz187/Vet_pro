"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Client {
  id: string
  name: string
}

interface Appointment {
  id: string
  service_type: string
  appointment_date: string
  client: {
    name: string
  }
  pet: {
    name: string
  }
}

interface FinancialTransactionFormProps {
  clients: Client[]
  appointments: Appointment[]
  transaction?: any
}

export function FinancialTransactionForm({ clients, appointments, transaction }: FinancialTransactionFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: transaction?.type || "revenue",
    amount: transaction?.amount?.toString() || "",
    description: transaction?.description || "",
    category: transaction?.category || "",
    client_id: transaction?.client_id || "",
    appointment_id: transaction?.appointment_id || "",
    payment_method: transaction?.payment_method || "",
    transaction_date: transaction?.transaction_date
      ? new Date(transaction.transaction_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    notes: transaction?.notes || "",
  })

  const revenueCategories = ["Consultas", "Cirurgias", "Vacinas", "Medicamentos", "Exames", "Outros"]
  const expenseCategories = [
    "Salários",
    "Medicamentos",
    "Equipamentos",
    "Aluguel",
    "Energia",
    "Telefone",
    "Marketing",
    "Outros",
  ]

  const paymentMethods = ["Dinheiro", "Cartão de Débito", "Cartão de Crédito", "PIX", "Transferência", "Cheque"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error("User not authenticated")

      const transactionData = {
        ...formData,
        amount: Number.parseFloat(formData.amount),
        client_id: formData.client_id || null,
        appointment_id: formData.appointment_id || null,
        category: formData.category || null,
        payment_method: formData.payment_method || null,
        notes: formData.notes || null,
        created_by: userData.user.id,
      }

      if (transaction?.id) {
        // Update existing transaction
        const { error } = await supabase.from("financial_transactions").update(transactionData).eq("id", transaction.id)
        if (error) throw error
        toast.success("Transação atualizada com sucesso!")
      } else {
        // Create new transaction
        const { error } = await supabase.from("financial_transactions").insert([transactionData])
        if (error) throw error
        toast.success("Transação registrada com sucesso!")
      }
      router.push("/dashboard/financial/transactions")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao salvar transação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{transaction ? "Editar Transação" : "Nova Transação"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Input
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {(formData.type === "revenue" ? revenueCategories : expenseCategories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment_method">Forma de Pagamento</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === "revenue" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client_id">Cliente</Label>
                <Select
                  value={formData.client_id}
                  onValueChange={(value) => setFormData({ ...formData, client_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment_id">Agendamento</Label>
                <Select
                  value={formData.appointment_id}
                  onValueChange={(value) => setFormData({ ...formData, appointment_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o agendamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointments.map((appointment) => (
                      <SelectItem key={appointment.id} value={appointment.id}>
                        {appointment.service_type} - {appointment.client.name} ({appointment.pet.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="transaction_date">Data da Transação *</Label>
            <Input
              id="transaction_date"
              type="date"
              required
              value={formData.transaction_date}
              onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Salvando..." : transaction ? "Atualizar" : "Registrar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
