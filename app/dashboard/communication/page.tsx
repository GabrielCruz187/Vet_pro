"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Mail, MessageSquare, Phone, Send, Calendar, Bell, TrendingUp } from "lucide-react"

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - substituir por dados reais do Supabase
  const communicationStats = {
    thisMonth: { emails: 156, sms: 89, whatsapp: 234 },
    scheduled: { total: 45, today: 12 },
    delivered: { rate: 94.5, total: 423 },
    pending: { total: 8 },
  }

  const recentCommunications = [
    {
      id: 1,
      type: "email",
      recipient: "maria@email.com",
      subject: "Lembrete de consulta",
      status: "delivered",
      date: "2024-01-15 14:30",
    },
    {
      id: 2,
      type: "sms",
      recipient: "(11) 99999-9999",
      subject: "Alerta de vacinação",
      status: "delivered",
      date: "2024-01-15 14:25",
    },
    {
      id: 3,
      type: "whatsapp",
      recipient: "(11) 88888-8888",
      subject: "Follow-up pós-consulta",
      status: "pending",
      date: "2024-01-15 14:20",
    },
  ]

  const scheduledCommunications = [
    {
      id: 1,
      type: "email",
      client: "João Silva",
      pet: "Rex",
      category: "appointment_reminder",
      scheduledFor: "2024-01-16 09:00",
    },
    {
      id: 2,
      type: "sms",
      client: "Ana Costa",
      pet: "Mimi",
      category: "vaccine_alert",
      scheduledFor: "2024-01-16 10:30",
    },
    {
      id: 3,
      type: "email",
      client: "Carlos Santos",
      pet: "Thor",
      category: "birthday",
      scheduledFor: "2024-01-17 08:00",
    },
  ]

  const getTypeIcon = (type: string) => {
    const icons = {
      email: Mail,
      sms: MessageSquare,
      whatsapp: Phone,
    }
    const Icon = icons[type as keyof typeof icons] || Mail
    return <Icon className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { label: "Entregue", variant: "default" as const },
      sent: { label: "Enviado", variant: "secondary" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      failed: { label: "Falhou", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Comunicação</h1>
          <p className="text-muted-foreground">Lembretes automáticos e comunicação com clientes</p>
        </div>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Enviar Comunicação
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Este Mês</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communicationStats.thisMonth.emails}</div>
                <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SMS Este Mês</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communicationStats.thisMonth.sms}</div>
                <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">WhatsApp Este Mês</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communicationStats.thisMonth.whatsapp}</div>
                <p className="text-xs text-muted-foreground">+25% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communicationStats.delivered.rate}%</div>
                <p className="text-xs text-muted-foreground">{communicationStats.delivered.total} mensagens</p>
              </CardContent>
            </Card>
          </div>

          {/* Comunicações Agendadas para Hoje */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Agendadas para Hoje
              </CardTitle>
              <CardDescription>{communicationStats.scheduled.today} comunicações programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledCommunications.slice(0, 3).map((comm) => (
                  <div key={comm.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(comm.type)}
                      <div>
                        <p className="font-medium">
                          {comm.client} - {comm.pet}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">{comm.category.replace("_", " ")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{comm.scheduledFor}</p>
                      <Badge variant="secondary">Agendado</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comunicações Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Comunicações Recentes</CardTitle>
              <CardDescription>Últimas mensagens enviadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCommunications.map((comm) => (
                  <div key={comm.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(comm.type)}
                      <div>
                        <p className="font-medium">{comm.subject}</p>
                        <p className="text-sm text-muted-foreground">{comm.recipient}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{comm.date}</p>
                      </div>
                      {getStatusBadge(comm.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Comunicação</CardTitle>
              <CardDescription>Gerencie templates para diferentes tipos de comunicação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas categorias</SelectItem>
                      <SelectItem value="appointment_reminder">Lembrete de consulta</SelectItem>
                      <SelectItem value="vaccine_alert">Alerta de vacinação</SelectItem>
                      <SelectItem value="birthday">Aniversário</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Novo Template</Button>
              </div>

              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Lembrete de Consulta - Email</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge>Email</Badge>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Template para lembretes de consultas agendadas via email
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        Testar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Alerta de Vacinação - SMS</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">SMS</Badge>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Template para alertas de vacinação via SMS</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        Testar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Configurações de Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configurações de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Provedor de Email</Label>
                  <Select defaultValue="smtp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Servidor SMTP</Label>
                  <Input placeholder="smtp.gmail.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Porta</Label>
                    <Input placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label>Segurança</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="clinica@exemplo.com" />
                </div>

                <div className="space-y-2">
                  <Label>Senha</Label>
                  <Input type="password" placeholder="Senha do email" />
                </div>

                <Button className="w-full">Salvar Configurações</Button>
              </CardContent>
            </Card>

            {/* Configurações de SMS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Configurações de SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Provedor de SMS</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="zenvia">Zenvia</SelectItem>
                      <SelectItem value="totalvoice">TotalVoice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Account SID</Label>
                  <Input placeholder="Seu Account SID" />
                </div>

                <div className="space-y-2">
                  <Label>Auth Token</Label>
                  <Input type="password" placeholder="Seu Auth Token" />
                </div>

                <div className="space-y-2">
                  <Label>Número de Origem</Label>
                  <Input placeholder="+5511999999999" />
                </div>

                <Button className="w-full">Salvar Configurações</Button>
              </CardContent>
            </Card>
          </div>

          {/* Configurações de Automação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Automações
              </CardTitle>
              <CardDescription>Configure quando e como enviar comunicações automáticas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Lembretes de Consulta</Label>
                    <p className="text-sm text-muted-foreground">Enviar lembretes automáticos de consultas agendadas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="ml-6 space-y-2">
                  <Label>Enviar com antecedência de:</Label>
                  <Select defaultValue="24">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 horas</SelectItem>
                      <SelectItem value="24">24 horas</SelectItem>
                      <SelectItem value="48">48 horas</SelectItem>
                      <SelectItem value="72">72 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Alertas de Vacinação</Label>
                    <p className="text-sm text-muted-foreground">Alertar sobre vacinas próximas do vencimento</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="ml-6 space-y-2">
                  <Label>Alertar com antecedência de:</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="15">15 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Aniversários de Pets</Label>
                    <p className="text-sm text-muted-foreground">Enviar parabéns no aniversário dos pets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Follow-up Pós-Consulta</Label>
                    <p className="text-sm text-muted-foreground">Acompanhar clientes após consultas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="ml-6 space-y-2">
                  <Label>Enviar após:</Label>
                  <Select defaultValue="3">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 dia</SelectItem>
                      <SelectItem value="3">3 dias</SelectItem>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="14">14 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
