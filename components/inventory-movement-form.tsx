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

interface InventoryItem {
  id: string
  name: string
  sku: string | null
  current_stock: number
}

interface InventoryMovementFormProps {
  inventory: InventoryItem[]
}

export function InventoryMovementForm({ inventory }: InventoryMovementFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    inventory_id: "",
    movement_type: "in",
    quantity: "",
    reason: "",
  })

  const selectedItem = inventory.find((item) => item.id === formData.inventory_id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error("User not authenticated")

      const movementData = {
        ...formData,
        quantity: Number.parseInt(formData.quantity),
        reason: formData.reason || null,
        created_by: userData.user.id,
      }

      // Check if there's enough stock for outgoing movements
      if (formData.movement_type === "out" && selectedItem) {
        if (Number.parseInt(formData.quantity) > selectedItem.current_stock) {
          toast.error("Quantidade maior que o estoque disponível")
          setIsLoading(false)
          return
        }
      }

      const { error } = await supabase.from("inventory_movements").insert([movementData])
      if (error) throw error

      toast.success("Movimentação registrada com sucesso!")
      router.push("/dashboard/inventory/movements")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao registrar movimentação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Nova Movimentação de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inventory_id">Produto *</Label>
            <Select
              value={formData.inventory_id}
              onValueChange={(value) => setFormData({ ...formData, inventory_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent>
                {inventory.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} {item.sku && `(${item.sku})`} - Estoque: {item.current_stock}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedItem && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Estoque atual:</strong> {selectedItem.current_stock} unidades
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="movement_type">Tipo de Movimentação *</Label>
              <Select
                value={formData.movement_type}
                onValueChange={(value) => setFormData({ ...formData, movement_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">Entrada</SelectItem>
                  <SelectItem value="out">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              placeholder="Descreva o motivo da movimentação..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Registrando..." : "Registrar Movimentação"}
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
