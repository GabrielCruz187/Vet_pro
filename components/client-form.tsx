"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Client {
  id?: string
  name: string
  email: string | null
  phone: string
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  notes: string | null
}

interface ClientFormProps {
  client?: Client
}

export function ClientForm({ client }: ClientFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    address: client?.address || "",
    city: client?.city || "",
    state: client?.state || "",
    zip_code: client?.zip_code || "",
    notes: client?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (client?.id) {
        // Update existing client
        const { error } = await supabase.from("clients").update(formData).eq("id", client.id)
        if (error) throw error
        toast.success("Cliente atualizado com sucesso!")
      } else {
        // Create new client
        const { error } = await supabase.from("clients").insert([formData])
        if (error) throw error
        toast.success("Cliente cadastrado com sucesso!")
      }
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao salvar cliente")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{client ? "Editar Cliente" : "Novo Cliente"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip_code">CEP</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
              />
            </div>
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
              {isLoading ? "Salvando..." : client ? "Atualizar" : "Cadastrar"}
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
