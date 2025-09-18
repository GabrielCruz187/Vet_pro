"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, TrendingDown, Calendar, User } from "lucide-react"

interface InventoryMovement {
  id: string
  movement_type: string
  quantity: number
  reason: string | null
  created_at: string
  inventory: {
    name: string
    sku: string | null
  }
  created_by_profile: {
    full_name: string
  } | null
}

interface InventoryMovementsTableProps {
  movements: InventoryMovement[]
}

export function InventoryMovementsTable({ movements }: InventoryMovementsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredMovements = movements.filter((movement) => {
    const matchesSearch =
      movement.inventory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movement.inventory.sku && movement.inventory.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (movement.reason && movement.reason.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" || movement.movement_type === typeFilter

    return matchesSearch && matchesType
  })

  const getMovementIcon = (type: string) => {
    return type === "in" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getMovementColor = (type: string) => {
    return type === "in" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getMovementLabel = (type: string) => {
    return type === "in" ? "Entrada" : "Saída"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimentações de Estoque</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar movimentações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="in">Entrada</SelectItem>
              <SelectItem value="out">Saída</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Usuário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{movement.inventory.name}</div>
                    {movement.inventory.sku && (
                      <div className="text-sm text-muted-foreground">SKU: {movement.inventory.sku}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getMovementIcon(movement.movement_type)}
                    <Badge className={getMovementColor(movement.movement_type)}>
                      {getMovementLabel(movement.movement_type)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {movement.movement_type === "in" ? "+" : "-"}
                  {movement.quantity}
                </TableCell>
                <TableCell>{movement.reason || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    <div>
                      <div>{new Date(movement.created_at).toLocaleDateString("pt-BR")}</div>
                      <div className="text-muted-foreground">
                        {new Date(movement.created_at).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {movement.created_by_profile ? (
                    <div className="flex items-center text-sm">
                      <User className="mr-1 h-3 w-3" />
                      {movement.created_by_profile.full_name}
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredMovements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm || typeFilter !== "all"
              ? "Nenhuma movimentação encontrada."
              : "Nenhuma movimentação registrada ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
