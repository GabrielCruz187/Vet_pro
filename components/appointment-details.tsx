"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Calendar, Clock, User, Phone, Mail, PawPrint, FileText, DollarSign } from "lucide-react"

interface Appointment {
  id: string
  appointment_date: string
  duration_minutes: number
  service_type: string
  status: string
  notes: string | null
  created_at: string
  client: {
    id: string
    name: string
    email: string | null
    phone: string
    address: string | null
    city: string | null
  }
  pet: {
    id: string
    name: string
    species: string
    breed: string | null
    gender: string | null
    birth_date: string | null
    weight: number | null
  }
  veterinarian: {
    full_name: string
    specialization: string | null
  }
  service: {
    name: string
    price: number
    duration_minutes: number
  } | null
}

interface AppointmentDetailsProps {
  appointment: Appointment
}

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-emerald-100 text-emerald-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no_show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendado"
      case "confirmed":
        return "Confirmado"
      case "in_progress":
        return "Em andamento"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      case "no_show":
        return "Faltou"
      default:
        return status
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    const age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1
    }
    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detalhes do Agendamento</h1>
          <p className="text-gray-600">
            Agendado para {new Date(appointment.appointment_date).toLocaleDateString("pt-BR")} às{" "}
            {new Date(appointment.appointment_date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
          <Link href={`/dashboard/appointments/${appointment.id}/edit`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
                Informações do Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Data e Hora</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{new Date(appointment.appointment_date).toLocaleDateString("pt-BR")}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(appointment.appointment_date).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Duração</Label>
                  <div className="flex items-center mt-1">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {appointment.duration_minutes} minutos
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium text-gray-500">Tipo de Serviço</Label>
                <p className="mt-1 text-gray-900">{appointment.service_type}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Veterinário</Label>
                <div className="flex items-center mt-1">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div>{appointment.veterinarian.full_name}</div>
                    {appointment.veterinarian.specialization && (
                      <div className="text-sm text-muted-foreground">{appointment.veterinarian.specialization}</div>
                    )}
                  </div>
                </div>
              </div>

              {appointment.service && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Preço do Serviço</Label>
                  <div className="flex items-center mt-1">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    R$ {appointment.service.price.toFixed(2)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {appointment.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-emerald-600" />
                  Observações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{appointment.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PawPrint className="mr-2 h-5 w-5 text-emerald-600" />
                Informações do Pet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-500">Nome</Label>
                <p className="font-medium">{appointment.pet.name}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Espécie</Label>
                  <Badge variant="secondary">{appointment.pet.species}</Badge>
                </div>
                {appointment.pet.gender && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Sexo</Label>
                    <p className="capitalize">{appointment.pet.gender === "male" ? "Macho" : "Fêmea"}</p>
                  </div>
                )}
              </div>
              {appointment.pet.breed && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Raça</Label>
                  <p>{appointment.pet.breed}</p>
                </div>
              )}
              {appointment.pet.birth_date && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Idade</Label>
                  <p>{calculateAge(appointment.pet.birth_date)} anos</p>
                </div>
              )}
              {appointment.pet.weight && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Peso</Label>
                  <p>{appointment.pet.weight} kg</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proprietário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-500">Nome</Label>
                <p className="font-medium">{appointment.client.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.client.phone}</span>
              </div>
              {appointment.client.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.client.email}</span>
                </div>
              )}
              {appointment.client.address && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Endereço</Label>
                  <p className="text-sm">
                    {appointment.client.address}
                    {appointment.client.city && <br />}
                    {appointment.client.city}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
