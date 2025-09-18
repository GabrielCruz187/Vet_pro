"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Search } from "lucide-react"

interface Pet {
  id: string
  name: string
  species: string
  breed: string | null
  gender: string | null
  birth_date: string | null
  client: {
    name: string
    phone: string
  }
  created_at: string
}

interface PetsTableProps {
  pets: Pet[]
}

export function PetsTable({ pets }: PetsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.client.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    <Card>
      <CardHeader>
        <CardTitle>Lista de Pets</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Espécie</TableHead>
              <TableHead>Raça</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Cadastrado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell className="font-medium">{pet.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{pet.species}</Badge>
                </TableCell>
                <TableCell>{pet.breed || "-"}</TableCell>
                <TableCell>{pet.birth_date ? `${calculateAge(pet.birth_date)} anos` : "-"}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{pet.client.name}</div>
                    <div className="text-sm text-muted-foreground">{pet.client.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(pet.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/dashboard/pets/${pet.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/pets/${pet.id}/edit`}>
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
        {filteredPets.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "Nenhum pet encontrado." : "Nenhum pet cadastrado ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
