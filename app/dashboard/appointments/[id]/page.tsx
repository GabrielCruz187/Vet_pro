import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppointmentDetails } from "@/components/appointment-details"

interface AppointmentPageProps {
  params: Promise<{ id: string }>
}

export default async function AppointmentPage({ params }: AppointmentPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get appointment with all related data
  const { data: appointment } = await supabase
    .from("appointments")
    .select(`
      *,
      client:clients(*),
      pet:pets(*),
      veterinarian:profiles(full_name, specialization),
      service:services(name, price, duration_minutes)
    `)
    .eq("id", id)
    .single()

  if (!appointment) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <AppointmentDetails appointment={appointment} />
    </div>
  )
}
