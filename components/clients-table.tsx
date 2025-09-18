"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Search, Phone, Mail } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string | null
  phone: string
  city: string | null
  pets: { count: number }[]
  created_at: string
}

interface ClientsTableProps {
  clients: Client[]
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
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
              <TableHead>Contato</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Pets</TableHead>
              <TableHead>Cadastrado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Phone className="mr-1 h-3 w-3" />
                      {client.phone}
                    </div>
                    {client.email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {client.email}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{client.city || "-"}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{client.pets[0]?.count || 0} pets</Badge>
                </TableCell>
                <TableCell>{new Date(client.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/clients/${client.id}/edit`}>
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
        {filteredClients.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
