import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Phone } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  appointment_date: string
  appointment_time: string
  status: string
  pets: { name: string; species: string } | null
  clients: { name: string; phone: string } | null
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendado"
      case "confirmed":
        return "Confirmado"
      case "in_progress":
        return "Em Andamento"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          Próximas Consultas
        </CardTitle>
        <CardDescription>Agendamentos para hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Nenhuma consulta agendada para hoje</p>
          ) : (
            appointments.map((appointment) => (
              <Link key={appointment.id} href={`/dashboard/appointments/${appointment.id}`} className="block">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">
                        {appointment.pets?.name} - {appointment.pets?.species}
                      </p>
                      <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Cliente: {appointment.clients?.name}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.appointment_time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.clients?.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        {appointments.length > 0 && (
          <div className="mt-4 text-center">
            <Link
              href="/dashboard/appointments"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Ver todos os agendamentos →
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
