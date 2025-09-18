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

interface Pet {
  id: string
  name: string
  species: string
  client: {
    name: string
  }
}

interface Veterinarian {
  id: string
  full_name: string
}

interface MedicalRecord {
  id?: string
  pet_id: string
  veterinarian_id: string
  visit_date: string
  reason_for_visit: string
  symptoms: string | null
  diagnosis: string | null
  treatment: string | null
  medications: string | null
  follow_up_date: string | null
  notes: string | null
}

interface MedicalRecordFormProps {
  pets: Pet[]
  veterinarians: Veterinarian[]
  medicalRecord?: MedicalRecord
}

export function MedicalRecordForm({ pets, veterinarians, medicalRecord }: MedicalRecordFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    pet_id: medicalRecord?.pet_id || "",
    veterinarian_id: medicalRecord?.veterinarian_id || "",
    visit_date: medicalRecord?.visit_date
      ? new Date(medicalRecord.visit_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    reason_for_visit: medicalRecord?.reason_for_visit || "",
    symptoms: medicalRecord?.symptoms || "",
    diagnosis: medicalRecord?.diagnosis || "",
    treatment: medicalRecord?.treatment || "",
    medications: medicalRecord?.medications || "",
    follow_up_date: medicalRecord?.follow_up_date || "",
    notes: medicalRecord?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const recordData = {
        ...formData,
        visit_date: new Date(formData.visit_date).toISOString(),
        symptoms: formData.symptoms || null,
        diagnosis: formData.diagnosis || null,
        treatment: formData.treatment || null,
        medications: formData.medications || null,
        follow_up_date: formData.follow_up_date || null,
        notes: formData.notes || null,
      }

      if (medicalRecord?.id) {
        // Update existing medical record
        const { error } = await supabase.from("medical_records").update(recordData).eq("id", medicalRecord.id)
        if (error) throw error
        toast.success("Prontuário atualizado com sucesso!")
      } else {
        // Create new medical record
        const { error } = await supabase.from("medical_records").insert([recordData])
        if (error) throw error
        toast.success("Prontuário cadastrado com sucesso!")
      }
      router.push("/dashboard/medical-records")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao salvar prontuário")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{medicalRecord ? "Editar Prontuário" : "Novo Prontuário"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pet_id">Pet *</Label>
              <Select value={formData.pet_id} onValueChange={(value) => setFormData({ ...formData, pet_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} ({pet.species}) - {pet.client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="veterinarian_id">Veterinário *</Label>
              <Select
                value={formData.veterinarian_id}
                onValueChange={(value) => setFormData({ ...formData, veterinarian_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veterinário" />
                </SelectTrigger>
                <SelectContent>
                  {veterinarians.map((vet) => (
                    <SelectItem key={vet.id} value={vet.id}>
                      {vet.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit_date">Data da Consulta *</Label>
              <Input
                id="visit_date"
                type="date"
                required
                value={formData.visit_date}
                onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason_for_visit">Motivo da Consulta *</Label>
            <Input
              id="reason_for_visit"
              required
              value={formData.reason_for_visit}
              onChange={(e) => setFormData({ ...formData, reason_for_visit: e.target.value })}
              placeholder="Ex: Consulta de rotina, vacinação, sintomas..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Sintomas Observados</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              rows={3}
              placeholder="Descreva os sintomas apresentados pelo animal..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnóstico</Label>
            <Textarea
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              rows={3}
              placeholder="Diagnóstico médico..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Tratamento Prescrito</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              rows={3}
              placeholder="Descreva o tratamento recomendado..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medications">Medicamentos</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                rows={3}
                placeholder="Liste os medicamentos prescritos..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="follow_up_date">Data de Retorno</Label>
              <Input
                id="follow_up_date"
                type="date"
                value={formData.follow_up_date}
                onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações Gerais</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Observações adicionais..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Salvando..." : medicalRecord ? "Atualizar" : "Cadastrar"}
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
