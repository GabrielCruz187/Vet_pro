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
  phone: string
  pets: {
    id: string
    name: string
    species: string
  }[]
}

interface Veterinarian {
  id: string
  full_name: string
}

interface Service {
  id: string
  name: string
  price: number
  duration_minutes: number
}

interface Appointment {
  id?: string
  client_id: string
  pet_id: string
  veterinarian_id: string
  appointment_date: string
  duration_minutes: number
  service_type: string
  status: string
  notes: string | null
}

interface AppointmentFormProps {
  clients: Client[]
  veterinarians: Veterinarian[]
  services: Service[]
  appointment?: Appointment
}

export function AppointmentForm({ clients, veterinarians, services, appointment }: AppointmentFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedClient, setSelectedClient] = useState(appointment?.client_id || "")
  const [formData, setFormData] = useState({
    client_id: appointment?.client_id || "",
    pet_id: appointment?.pet_id || "",
    veterinarian_id: appointment?.veterinarian_id || "",
    appointment_date: appointment?.appointment_date
      ? new Date(appointment.appointment_date).toISOString().slice(0, 16)
      : "",
    duration_minutes: appointment?.duration_minutes?.toString() || "30",
    service_type: appointment?.service_type || "",
    status: appointment?.status || "scheduled",
    notes: appointment?.notes || "",
  })

  const selectedClientData = clients.find((client) => client.id === selectedClient)

  const handleServiceChange = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setFormData({
        ...formData,
        service_type: service.name,
        duration_minutes: service.duration_minutes.toString(),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const appointmentData = {
        ...formData,
        appointment_date: new Date(formData.appointment_date).toISOString(),
        duration_minutes: Number.parseInt(formData.duration_minutes),
        notes: formData.notes || null,
      }

      if (appointment?.id) {
        // Update existing appointment
        const { error } = await supabase.from("appointments").update(appointmentData).eq("id", appointment.id)
        if (error) throw error
        toast.success("Agendamento atualizado com sucesso!")
      } else {
        // Create new appointment
        const { error } = await supabase.from("appointments").insert([appointmentData])
        if (error) throw error
        toast.success("Agendamento cadastrado com sucesso!")
      }
      router.push("/dashboard/appointments")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro ao salvar agendamento")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{appointment ? "Editar Agendamento" : "Novo Agendamento"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_id">Cliente *</Label>
              <Select
                value={formData.client_id}
                onValueChange={(value) => {
                  setFormData({ ...formData, client_id: value, pet_id: "" })
                  setSelectedClient(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pet_id">Pet *</Label>
              <Select
                value={formData.pet_id}
                onValueChange={(value) => setFormData({ ...formData, pet_id: value })}
                disabled={!selectedClient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o pet" />
                </SelectTrigger>
                <SelectContent>
                  {selectedClientData?.pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} ({pet.species})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="service">Serviço</Label>
              <Select onValueChange={handleServiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - R$ {service.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_type">Tipo de Serviço *</Label>
            <Input
              id="service_type"
              required
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
              placeholder="Ex: Consulta geral, vacinação, cirurgia..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointment_date">Data e Hora *</Label>
              <Input
                id="appointment_date"
                type="datetime-local"
                required
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duração (min) *</Label>
              <Input
                id="duration_minutes"
                type="number"
                required
                min="15"
                step="15"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="in_progress">Em andamento</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                  <SelectItem value="no_show">Faltou</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Observações sobre o agendamento..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Salvando..." : appointment ? "Atualizar" : "Agendar"}
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
