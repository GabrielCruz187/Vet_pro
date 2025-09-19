"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Settings, Building, Users, Bell, Shield, Palette } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ClinicSettings {
  name: string
  address: string
  phone: string
  email: string
  cnpj: string
  description: string
  opening_hours: string
  closing_hours: string
}

interface NotificationSettings {
  email_appointments: boolean
  sms_reminders: boolean
  whatsapp_notifications: boolean
  marketing_emails: boolean
}

export default function SettingsPage() {
  const [clinicSettings, setClinicSettings] = useState<ClinicSettings>({
    name: "",
    address: "",
    phone: "",
    email: "",
    cnpj: "",
    description: "",
    opening_hours: "08:00",
    closing_hours: "18:00",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_appointments: true,
    sms_reminders: false,
    whatsapp_notifications: true,
    marketing_emails: false,
  })

  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      // Carregar configurações da clínica
      const { data: clinic } = await supabase.from("clinic_settings").select("*").single()

      if (clinic) {
        setClinicSettings(clinic)
      }

      // Carregar configurações de notificação
      const { data: notif } = await supabase.from("notification_settings").select("*").single()

      if (notif) {
        setNotifications(notif)
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error)
    }
  }

  const saveClinicSettings = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.from("clinic_settings").upsert(clinicSettings)

      if (error) throw error

      toast.success("Configurações da clínica salvas com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  const saveNotificationSettings = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.from("notification_settings").upsert(notifications)

      if (error) throw error

      toast.success("Configurações de notificação salvas!")
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="clinic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="clinic" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Clínica</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Aparência</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clinic">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Clínica</CardTitle>
              <CardDescription>Configure as informações básicas da sua clínica veterinária</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Clínica</Label>
                  <Input
                    id="name"
                    value={clinicSettings.name}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, name: e.target.value })}
                    placeholder="Clínica Veterinária..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={clinicSettings.cnpj}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={clinicSettings.address}
                  onChange={(e) => setClinicSettings({ ...clinicSettings, address: e.target.value })}
                  placeholder="Rua, número, bairro, cidade - UF"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={clinicSettings.phone}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clinicSettings.email}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, email: e.target.value })}
                    placeholder="contato@clinica.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="opening">Horário de Abertura</Label>
                  <Input
                    id="opening"
                    type="time"
                    value={clinicSettings.opening_hours}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, opening_hours: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing">Horário de Fechamento</Label>
                  <Input
                    id="closing"
                    type="time"
                    value={clinicSettings.closing_hours}
                    onChange={(e) => setClinicSettings({ ...clinicSettings, closing_hours: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={clinicSettings.description}
                  onChange={(e) => setClinicSettings({ ...clinicSettings, description: e.target.value })}
                  placeholder="Descreva sua clínica, especialidades, diferenciais..."
                  rows={4}
                />
              </div>

              <Button onClick={saveClinicSettings} disabled={loading}>
                {loading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>Configure como e quando receber notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações de Agendamento por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba e-mails quando novos agendamentos forem criados
                  </p>
                </div>
                <Switch
                  checked={notifications.email_appointments}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email_appointments: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes por SMS</Label>
                  <p className="text-sm text-muted-foreground">Envie lembretes automáticos por SMS para os clientes</p>
                </div>
                <Switch
                  checked={notifications.sms_reminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms_reminders: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">Integração com WhatsApp para comunicação com clientes</p>
                </div>
                <Switch
                  checked={notifications.whatsapp_notifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, whatsapp_notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-mails de Marketing</Label>
                  <p className="text-sm text-muted-foreground">Receba dicas, novidades e campanhas promocionais</p>
                </div>
                <Switch
                  checked={notifications.marketing_emails}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing_emails: checked })}
                />
              </div>

              <Button onClick={saveNotificationSettings} disabled={loading}>
                {loading ? "Salvando..." : "Salvar Notificações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>Gerencie os usuários que têm acesso ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento. Em breve você poderá gerenciar usuários, definir permissões e
                controlar o acesso ao sistema.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configure as opções de segurança e privacidade</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento. Em breve você poderá configurar autenticação de dois fatores,
                políticas de senha e logs de acesso.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento. Em breve você poderá escolher temas, cores e personalizar a interface
                do sistema.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
