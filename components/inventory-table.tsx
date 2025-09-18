"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Search, AlertTriangle, Package, Calendar } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  description: string | null
  category: string
  sku: string | null
  current_stock: number
  minimum_stock: number
  unit_price: number | null
  supplier: string | null
  expiration_date: string | null
  created_at: string
}

interface InventoryTableProps {
  inventory: InventoryItem[]
}

export function InventoryTable({ inventory }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  const categories = Array.from(new Set(inventory.map((item) => item.category)))

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.current_stock <= item.minimum_stock) ||
      (stockFilter === "out" && item.current_stock === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { label: "Sem estoque", color: "bg-red-100 text-red-800" }
    if (current <= minimum) return { label: "Estoque baixo", color: "bg-orange-100 text-orange-800" }
    return { label: "Em estoque", color: "bg-green-100 text-green-800" }
  }

  const isExpiringSoon = (expirationDate: string) => {
    const today = new Date()
    const expiration = new Date(expirationDate)
    const diffTime = expiration.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays >= 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos em Estoque</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Estoque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="low">Estoque baixo</SelectItem>
              <SelectItem value="out">Sem estoque</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Preço Unit.</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item.current_stock, item.minimum_stock)
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center">
                        <Package className="mr-1 h-3 w-3" />
                        {item.name}
                        {item.current_stock <= item.minimum_stock && (
                          <AlertTriangle className="ml-2 h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      {item.description && <div className="text-sm text-muted-foreground">{item.description}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{item.sku || "-"}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {item.current_stock} / {item.minimum_stock}
                      </div>
                      <Badge className={`text-xs ${stockStatus.color}`}>{stockStatus.label}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{item.unit_price ? `R$ ${item.unit_price.toFixed(2)}` : "-"}</TableCell>
                  <TableCell>{item.supplier || "-"}</TableCell>
                  <TableCell>
                    {item.expiration_date ? (
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <div>
                          <div>{new Date(item.expiration_date).toLocaleDateString("pt-BR")}</div>
                          {isExpiringSoon(item.expiration_date) && (
                            <Badge variant="destructive" className="text-xs">
                              Vencendo
                            </Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/inventory/${item.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filteredInventory.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm || categoryFilter !== "all" || stockFilter !== "all"
              ? "Nenhum produto encontrado."
              : "Nenhum produto cadastrado ainda."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
