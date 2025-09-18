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
  id?: string
  name: string
  description: string | null
  category: string
  sku: string | null
  current_stock: number
  minimum_stock: number
  unit_price: number | null
  supplier: string | null
  expiration_date: string | null
}

interface InventoryFormProps {
  item?: InventoryItem
}

export function InventoryForm({ item }: InventoryFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    category: item?.category || "",
    sku: item?.sku || "",
    current_stock: item?.current_stock?.toString() || "0",
    minimum_stock: item?.minimum_stock?.toString() || "0",
    unit_price: item?.unit_price?.toString() || "",
    supplier: item?.supplier || "",
    expiration_date: item?.expiration_date || "",
  })

  const categories = [
    "Medicamentos",
    "Vacinas",
    "Alimentação",
    "Acessórios",
    "Higiene",
    "Material Médico",
    "Equipamentos",
    "Outros",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const itemData = {
        ...formData,
        current_stock: Number.parseInt(formData.current_stock),
        minimum_stock: Number.parseInt(formData.minimum_stock),
        unit_price: formData.unit_price ? Number.parseFloat(formData.unit_price) : null,
        description: formData.description || null,
        sku: formData.sku || null,
        supplier: formData.supplier || null,
        expiration_date: formData.expiration_date || null,
      }

      if (item?.id) {
        // Update existing item
        const { error } = await supabase.from("inventory").update(itemData).eq("id", item.id)
        if (error) throw error
        toast.success("Produto atualizado com sucesso!")
      } else {
        // Create new item
        const { error } = await supabase.from("inventory").insert([itemData])
        if (error) throw error
        toast.success("Produto cadastrado com sucesso!")
      }
      router.push("/dashboard/inventory")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao salvar produto")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{item ? "Editar Produto" : "Novo Produto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU/Código</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current_stock">Estoque Atual *</Label>
              <Input
                id="current_stock"
                type="number"
                min="0"
                required
                value={formData.current_stock}
                onChange={(e) => setFormData({ ...formData, current_stock: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimum_stock">Estoque Mínimo *</Label>
              <Input
                id="minimum_stock"
                type="number"
                min="0"
                required
                value={formData.minimum_stock}
                onChange={(e) => setFormData({ ...formData, minimum_stock: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit_price">Preço Unitário</Label>
              <Input
                id="unit_price"
                type="number"
                step="0.01"
                min="0"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration_date">Data de Vencimento</Label>
            <Input
              id="expiration_date"
              type="date"
              value={formData.expiration_date}
              onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Salvando..." : item ? "Atualizar" : "Cadastrar"}
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
