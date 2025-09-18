"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar } from "lucide-react"

export function FinancialReports() {
  const [reportType, setReportType] = useState("monthly")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [category, setCategory] = useState("all")

  const reportTypes = [
    { value: "monthly", label: "Relatório Mensal" },
    { value: "quarterly", label: "Relatório Trimestral" },
    { value: "annual", label: "Relatório Anual" },
    { value: "custom", label: "Período Personalizado" },
  ]

  const categories = ["all", "Consultas", "Cirurgias", "Vacinas", "Medicamentos", "Exames"]

  const handleGenerateReport = () => {
    // Here you would implement the report generation logic
    console.log("Generating report:", { reportType, startDate, endDate, category })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-emerald-600" />
              Relatório de Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Análise detalhada das receitas por período e categoria</p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-red-600" />
              Relatório de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Controle de gastos e despesas operacionais</p>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              Fluxo de Caixa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Análise do fluxo de caixa e projeções</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatório Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {reportType === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Inicial</Label>
                  <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Final</Label>
                  <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            )}

            <Button onClick={handleGenerateReport} className="bg-emerald-600 hover:bg-emerald-700">
              <Calendar className="mr-2 h-4 w-4" />
              Gerar Relatório Personalizado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
