"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Phone, Mail, MapPin, Plus, PawPrint } from "lucide-react"

interface Pet {
  id: string
  name: string
  species: string
  breed: string | null
  gender: string | null
  birth_date: string | null
}

interface Client {
  id: string
  name: string
  email: string | null
  phone: string
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  notes: string | null
  created_at: string
  pets: Pet[]
}

interface ClientDetailsProps {
  client: Client
}

export function ClientDetails({ client }: ClientDetailsProps) {
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
          <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-gray-600">Cliente desde {new Date(client.created_at).toLocaleDateString("pt-BR")}</p>
        </div>
        <Link href={`/dashboard/clients/${client.id}/edit`}>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Edit className="mr-2 h-4 w-4" />
            Editar Cliente
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
              {client.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
              )}
              {(client.address || client.city) && (
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    {client.address && <div>{client.address}</div>}
                    {client.city && (
                      <div>
                        {client.city}
                        {client.state && `, ${client.state}`}
                        {client.zip_code && ` - ${client.zip_code}`}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {client.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{client.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center">
                <PawPrint className="mr-2 h-5 w-5" />
                Pets ({client.pets.length})
              </CardTitle>
              <Link href={`/dashboard/pets/new?client=${client.id}`}>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {client.pets.length > 0 ? (
                <div className="space-y-3">
                  {client.pets.map((pet) => (
                    <div key={pet.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{pet.name}</h4>
                        <Badge variant="secondary">{pet.species}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {pet.breed && <div>{pet.breed}</div>}
                        {pet.birth_date && <div>{calculateAge(pet.birth_date)} anos</div>}
                        {pet.gender && <div className="capitalize">{pet.gender}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Nenhum pet cadastrado ainda.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
