import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientDetails } from "@/components/client-details"

interface ClientPageProps {
  params: Promise<{ id: string }>
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get client with pets
  const { data: client } = await supabase
    .from("clients")
    .select(`
      *,
      pets:pets(*)
    `)
    .eq("id", id)
    .single()

  if (!client) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <ClientDetails client={client} />
    </div>
  )
}
