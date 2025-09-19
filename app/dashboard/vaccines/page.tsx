"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Calendar, Syringe, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Vaccine {
  id: string
  pet_name: string
  client_name: string
  vaccine_name: string
  vaccine_date: string
  next_dose_date: string
  veterinarian: string
  status: "scheduled" | "applied" | "overdue"
  notes?: string
}

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchVaccines()
  }, [])

  const fetchVaccines = async () => {
    try {
      const { data, error } = await supabase
        .from("vaccines")
        .select(`
          *,
          pets!inner(name, clients!inner(name))
        `)
        .order("vaccine_date", { ascending: true })

      if (error) throw error

      const formattedVaccines =
        data?.map((vaccine) => ({
          id: vaccine.id,
          pet_name: vaccine.pets.name,
          client_name: vaccine.pets.clients.name,
          vaccine_name: vaccine.vaccine_name,
          vaccine_date: vaccine.vaccine_date,
          next_dose_date: vaccine.next_dose_date,
          veterinarian: vaccine.veterinarian,
          status: getVaccineStatus(vaccine.vaccine_date, vaccine.next_dose_date),
          notes: vaccine.notes,
        })) || []

      setVaccines(formattedVaccines)
    } catch (error) {
      console.error("Erro ao carregar vacinas:", error)
    } finally {
      setLoading(false)
    }
  }

  const getVaccineStatus = (vaccineDate: string, nextDoseDate: string): "scheduled" | "applied" | "overdue" => {
    const today = new Date()
    const vaccine = new Date(vaccineDate)
    const nextDose = new Date(nextDoseDate)

    if (vaccine > today) return "scheduled"
    if (nextDose < today) return "overdue"
    return "applied"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "applied":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendada"
      case "applied":
        return "Aplicada"
      case "overdue":
        return "Atrasada"
      default:
        return "Desconhecido"
    }
  }

  const filteredVaccines = vaccines.filter(
    (vaccine) =>
      vaccine.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.vaccine_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const overdueCount = vaccines.filter((v) => v.status === "overdue").length
  const scheduledCount = vaccines.filter((v) => v.status === "scheduled").length
  const appliedCount = vaccines.filter((v) => v.status === "applied").length

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Controle de Vacinas</h1>
          <p className="text-muted-foreground">Gerencie o calendário vacinal dos pets</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/vaccines/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Vacina
          </Link>
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Syringe className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{vaccines.length}</p>
                <p className="text-sm text-muted-foreground">Total de Vacinas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{appliedCount}</p>
                <p className="text-sm text-muted-foreground">Aplicadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{scheduledCount}</p>
                <p className="text-sm text-muted-foreground">Agendadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{overdueCount}</p>
                <p className="text-sm text-muted-foreground">Atrasadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por pet, cliente ou vacina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de Vacinas */}
      <div className="grid gap-4">
        {filteredVaccines.map((vaccine) => (
          <Card key={vaccine.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{vaccine.pet_name}</CardTitle>
                  <CardDescription>Cliente: {vaccine.client_name}</CardDescription>
                </div>
                <Badge className={getStatusColor(vaccine.status)}>{getStatusText(vaccine.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Vacina</p>
                  <p className="text-muted-foreground">{vaccine.vaccine_name}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Data da Aplicação</p>
                  <p className="text-muted-foreground">{new Date(vaccine.vaccine_date).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Próxima Dose</p>
                  <p className="text-muted-foreground">
                    {new Date(vaccine.next_dose_date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Veterinário</p>
                  <p className="text-muted-foreground">{vaccine.veterinarian}</p>
                </div>
              </div>
              {vaccine.notes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="font-medium text-foreground text-sm">Observações</p>
                  <p className="text-muted-foreground text-sm">{vaccine.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVaccines.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Syringe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma vacina encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Tente ajustar os filtros de busca" : "Comece cadastrando a primeira vacina"}
            </p>
            <Button asChild>
              <Link href="/dashboard/vaccines/new">
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar Vacina
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
