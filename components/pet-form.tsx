"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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

interface Pet {
  id?: string
  client_id: string
  name: string
  species: string
  breed: string | null
  gender: string | null
  birth_date: string | null
  weight: number | null
  color: string | null
  microchip_number: string | null
  notes: string | null
}

interface PetFormProps {
  clients: Client[]
  pet?: Pet
}

export function PetForm({ clients, pet }: PetFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    client_id: pet?.client_id || searchParams.get("client") || "",
    name: pet?.name || "",
    species: pet?.species || "",
    breed: pet?.breed || "",
    gender: pet?.gender || "",
    birth_date: pet?.birth_date || "",
    weight: pet?.weight?.toString() || "",
    color: pet?.color || "",
    microchip_number: pet?.microchip_number || "",
    notes: pet?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const petData = {
        ...formData,
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        birth_date: formData.birth_date || null,
        breed: formData.breed || null,
        gender: formData.gender || null,
        color: formData.color || null,
        microchip_number: formData.microchip_number || null,
        notes: formData.notes || null,
      }

      if (pet?.id) {
        // Update existing pet
        const { error } = await supabase.from("pets").update(petData).eq("id", pet.id)
        if (error) throw error
        toast.success("Pet atualizado com sucesso!")
      } else {
        // Create new pet
        const { error } = await supabase.from("pets").insert([petData])
        if (error) throw error
        toast.success("Pet cadastrado com sucesso!")
      }
      router.push("/dashboard/pets")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao salvar pet")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{pet ? "Editar Pet" : "Novo Pet"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client_id">Proprietário *</Label>
            <Select
              value={formData.client_id}
              onValueChange={(value) => setFormData({ ...formData, client_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o proprietário" />
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
              <Label htmlFor="species">Espécie *</Label>
              <Select value={formData.species} onValueChange={(value) => setFormData({ ...formData, species: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a espécie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cão">Cão</SelectItem>
                  <SelectItem value="Gato">Gato</SelectItem>
                  <SelectItem value="Pássaro">Pássaro</SelectItem>
                  <SelectItem value="Coelho">Coelho</SelectItem>
                  <SelectItem value="Hamster">Hamster</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Raça</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Sexo</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Macho</SelectItem>
                  <SelectItem value="female">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth_date">Data de Nascimento</Label>
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Cor</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="microchip_number">Número do Microchip</Label>
            <Input
              id="microchip_number"
              value={formData.microchip_number}
              onChange={(e) => setFormData({ ...formData, microchip_number: e.target.value })}
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
              {isLoading ? "Salvando..." : pet ? "Atualizar" : "Cadastrar"}
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
