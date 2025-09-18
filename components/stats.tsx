import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, FileText, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "1000+",
    label: "Clínicas Atendidas",
    description: "Veterinários confiam no VetPro",
  },
  {
    icon: Calendar,
    value: "50k+",
    label: "Consultas Agendadas",
    description: "Por mês em nossa plataforma",
  },
  {
    icon: FileText,
    value: "200k+",
    label: "Prontuários Digitais",
    description: "Históricos médicos organizados",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Satisfação",
    description: "Dos nossos clientes",
  },
]

export function Stats() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Números que impressionam</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Resultados comprovados de quem já transformou sua clínica com o VetPro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
