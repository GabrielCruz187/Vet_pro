"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, PawPrint } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  appointment_date: string
  duration_minutes: number
  service_type: string
  status: string
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

interface AppointmentsCalendarProps {
  appointments: Appointment[]
}

export function AppointmentsCalendar({ appointments }: AppointmentsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((appointment) => appointment.appointment_date.startsWith(dateString))
  }

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

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentDate)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="min-h-[120px] p-1 border border-gray-100">
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-900 mb-1">{day.getDate()}</div>
                  <div className="space-y-1">
                    {getAppointmentsForDate(day).map((appointment) => (
                      <Link key={appointment.id} href={`/dashboard/appointments/${appointment.id}`}>
                        <div className="p-1 rounded text-xs bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 cursor-pointer">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(appointment.appointment_date).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <PawPrint className="h-3 w-3" />
                            <span className="truncate">{appointment.pet.name}</span>
                          </div>
                          <Badge className={`text-xs mt-1 ${getStatusColor(appointment.status)}`}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
