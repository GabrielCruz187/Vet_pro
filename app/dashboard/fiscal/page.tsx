"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Settings, TrendingUp, AlertCircle, CheckCircle, Clock, X } from "lucide-react"

export default function FiscalPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - substituir por dados reais do Supabase
  const invoiceStats = {
    thisMonth: { total: 45, value: 12500.0 },
    pending: { total: 3, value: 850.0 },
    authorized: { total: 42, value: 11650.0 },
    cancelled: { total: 0, value: 0.0 },
  }

  const recentInvoices = [
    { id: 1, number: "001", client: "Maria Silva", pet: "Rex", value: 150.0, status: "authorized", date: "2024-01-15" },
    {
      id: 2,
      number: "002",
      client: "João Santos",
      pet: "Mimi",
      value: 280.0,
      status: "processing",
      date: "2024-01-15",
    },
    { id: 3, number: "003", client: "Ana Costa", pet: "Thor", value: 95.0, status: "authorized", date: "2024-01-14" },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      authorized: { label: "Autorizada", variant: "default" as const, icon: CheckCircle },
      processing: { label: "Processando", variant: "secondary" as const, icon: Clock },
      cancelled: { label: "Cancelada", variant: "destructive" as const, icon: X },
      error: { label: "Erro", variant: "destructive" as const, icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema Fiscal</h1>
          <p className="text-muted-foreground">Emissão e controle de notas fiscais eletrônicas</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Nova NFe
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="invoices">Notas Fiscais</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NFes Este Mês</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoiceStats.thisMonth.total}</div>
                <p className="text-xs text-muted-foreground">
                  R$ {invoiceStats.thisMonth.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoiceStats.pending.total}</div>
                <p className="text-xs text-muted-foreground">
                  R$ {invoiceStats.pending.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Autorizadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoiceStats.authorized.total}</div>
                <p className="text-xs text-muted-foreground">
                  R$ {invoiceStats.authorized.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
                <X className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoiceStats.cancelled.total}</div>
                <p className="text-xs text-muted-foreground">
                  R$ {invoiceStats.cancelled.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Notas Fiscais Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Fiscais Recentes</CardTitle>
              <CardDescription>Últimas NFes emitidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">NFe #{invoice.number}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.client} - {invoice.pet}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">
                          R$ {invoice.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Fiscais</CardTitle>
              <CardDescription>Configure a integração com provedores de NFe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="provider">Provedor de NFe</Label>
                  <Select defaultValue="focus_nfe">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="focus_nfe">Focus NFe</SelectItem>
                      <SelectItem value="bling">Bling</SelectItem>
                      <SelectItem value="nfse_nacional">NFSe Nacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="environment">Ambiente</Label>
                  <Select defaultValue="sandbox">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandbox">Sandbox (Teste)</SelectItem>
                      <SelectItem value="production">Produção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api_token">Token da API</Label>
                <Input id="api_token" type="password" placeholder="Seu token da API" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0001-00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inscricao_municipal">Inscrição Municipal</Label>
                  <Input id="inscricao_municipal" placeholder="Inscrição Municipal" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
                  <Input id="inscricao_estadual" placeholder="Inscrição Estadual" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regime_tributario">Regime Tributário</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Simples Nacional</SelectItem>
                      <SelectItem value="2">Simples Excesso</SelectItem>
                      <SelectItem value="3">Regime Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificado">Certificado Digital A1</Label>
                <Input id="certificado" type="file" accept=".pfx,.p12" />
                <p className="text-sm text-muted-foreground">
                  Faça upload do seu certificado digital A1 (.pfx ou .p12)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha_certificado">Senha do Certificado</Label>
                <Input id="senha_certificado" type="password" placeholder="Senha do certificado digital" />
              </div>

              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
