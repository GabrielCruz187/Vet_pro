import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppointmentsCalendar } from "@/components/appointments-calendar"
import { AppointmentsTable } from "@/components/appointments-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function AppointmentsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get all appointments with related data
  const { data: appointments } = await supabase
    .from("appointments")
    .select(`
      *,
      client:clients(name, phone),
      pet:pets(name, species),
      veterinarian:profiles(full_name),
      service:services(name, price)
    `)
    .order("appointment_date", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerencie os agendamentos da clínica</p>
        </div>
        <Link href="/dashboard/appointments/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <AppointmentsCalendar appointments={appointments || []} />
        </TabsContent>
        <TabsContent value="list">
          <AppointmentsTable appointments={appointments || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
