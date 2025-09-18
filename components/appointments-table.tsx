"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Search, Calendar, Clock, User, PawPrint } from "lucide-react"

interface Appointment {
  id: string
  appointment_date: string
  duration_minutes: number
  service_type: string
  status: string
  notes: string | null
  client: {
    name: string
    phone: string
  }
  pet: {
    name: string
    species: string
  }
  veterinarian: {
    full_name: string
  }
}

interface AppointmentsTableProps {
  appointments: Appointment[]
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian.full_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Agendamentos</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agendamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="confirmed">Confirmado</SelectItem>
              <SelectItem value="in_progress">Em andamento</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
              <SelectItem value="no_show">Faltou</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet / Cliente</TableHead>
              <TableHead>Data e Hora</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Veterinário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center">
                      <PawPrint className="mr-1 h-3 w-3" />
                      {appointment.pet.name}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {appointment.pet.species}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{appointment.client.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    <div>
                      <div>{new Date(appointment.appointment_date).toLocaleDateString("pt-BR")}</div>
                      <div className="text-muted-foreground">
                        {new Date(appointment.appointment_date).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{appointment.service_type}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <User className="mr-1 h-3 w-3" />
                    {appointment.veterinarian.full_name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    {appointment.duration_minutes} min
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/dashboard/appointments/${appointment.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/appointments/${appointment.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredAppointments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm || statusFilter !== "all"
              ? "Nenhum agendamento encontrado."
              : "Nenhum agendamento cadastrado ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
