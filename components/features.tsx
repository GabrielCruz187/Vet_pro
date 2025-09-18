import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Package, CreditCard, MessageSquare, BarChart3, Shield, Smartphone } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Prontuário Digital",
    description: "Histórico completo dos pacientes com fotos, exames e prescrições digitais.",
  },
  {
    icon: Calendar,
    title: "Agenda Integrada",
    description: "Agendamento online, lembretes automáticos e controle de horários dos veterinários.",
  },
  {
    icon: Package,
    title: "Controle de Estoque",
    description: "Gestão inteligente de medicamentos, vacinas e produtos com alertas de vencimento.",
  },
  {
    icon: CreditCard,
    title: "Financeiro Completo",
    description: "Controle de receitas, despesas, comissões e emissão de notas fiscais.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integrado",
    description: "Envio automático de lembretes, resultados de exames e campanhas de marketing.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    description: "Dashboards com métricas importantes para tomada de decisões estratégicas.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Dados protegidos com criptografia e backup automático na nuvem.",
  },
  {
    icon: Smartphone,
    title: "100% Online",
    description: "Acesse de qualquer dispositivo, a qualquer hora e em qualquer lugar.",
  },
]

export function Features() {
  return (
    <section id="funcionalidades" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tudo que sua clínica precisa
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Funcionalidades completas para otimizar todos os processos da sua clínica veterinária
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
