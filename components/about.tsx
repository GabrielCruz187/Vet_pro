import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Shield, Zap } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Agilidade no Atendimento",
    description: "Reduza o tempo de consulta em até 40% com prontuários digitais e histórico completo",
  },
  {
    icon: Heart,
    title: "Cuidado Personalizado",
    description: "Histórico detalhado permite atendimento mais preciso e cuidado individualizado",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Dados protegidos com criptografia de ponta e backup automático na nuvem",
  },
  {
    icon: CheckCircle,
    title: "Controle Completo",
    description: "Gerencie agenda, estoque, financeiro e relatórios em uma única plataforma",
  },
]

export function About() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Por que escolher o <span className="text-primary">VetPro</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Desenvolvido especialmente para veterinários brasileiros, o VetPro combina tecnologia avançada com
              simplicidade de uso. Nossa plataforma foi criada para otimizar cada aspecto da sua clínica, desde o
              primeiro contato com o cliente até o acompanhamento pós-consulta.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Conhecer o Sistema
            </Button>
          </div>

          <div className="relative">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">14 dias</div>
                    <div className="text-lg font-semibold text-foreground">Teste Gratuito</div>
                    <div className="text-sm text-muted-foreground">Sem compromisso</div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold text-foreground mb-4">Incluso no teste:</h4>
                    <ul className="space-y-2">
                      {[
                        "Acesso completo ao sistema",
                        "Suporte técnico dedicado",
                        "Treinamento personalizado",
                        "Migração dos seus dados",
                        "Sem taxa de setup",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
