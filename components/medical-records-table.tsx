"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Search, Calendar, User } from "lucide-react"

interface MedicalRecord {
  id: string
  visit_date: string
  reason_for_visit: string
  diagnosis: string | null
  treatment: string | null
  follow_up_date: string | null
  pet: {
    id: string
    name: string
    species: string
    client: {
      name: string
      phone: string
    }
  }
  veterinarian: {
    full_name: string
  }
}

interface MedicalRecordsTableProps {
  medicalRecords: MedicalRecord[]
}

export function MedicalRecordsTable({ medicalRecords }: MedicalRecordsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.pet.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.reason_for_visit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.diagnosis && record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prontuários Médicos</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar prontuários..."
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
              <TableHead>Pet / Cliente</TableHead>
              <TableHead>Data da Consulta</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Diagnóstico</TableHead>
              <TableHead>Veterinário</TableHead>
              <TableHead>Retorno</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center">
                      {record.pet.name}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {record.pet.species}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{record.pet.client.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(record.visit_date).toLocaleDateString("pt-BR")}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate" title={record.reason_for_visit}>
                    {record.reason_for_visit}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  {record.diagnosis ? (
                    <div className="truncate" title={record.diagnosis}>
                      {record.diagnosis}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <User className="mr-1 h-3 w-3" />
                    {record.veterinarian.full_name}
                  </div>
                </TableCell>
                <TableCell>
                  {record.follow_up_date ? (
                    <Badge variant="secondary">{new Date(record.follow_up_date).toLocaleDateString("pt-BR")}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/dashboard/medical-records/${record.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/medical-records/${record.id}/edit`}>
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
        {filteredRecords.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "Nenhum prontuário encontrado." : "Nenhum prontuário cadastrado ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
