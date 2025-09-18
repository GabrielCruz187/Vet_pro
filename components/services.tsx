import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "R$ 89",
    period: "/mês",
    description: "Ideal para clínicas pequenas",
    features: ["Até 500 pacientes", "Prontuário digital", "Agenda básica", "Controle financeiro", "Suporte por email"],
    popular: false,
  },
  {
    name: "Profissional",
    price: "R$ 149",
    period: "/mês",
    description: "Para clínicas em crescimento",
    features: [
      "Pacientes ilimitados",
      "WhatsApp integrado",
      "Controle de estoque",
      "Relatórios avançados",
      "Múltiplos veterinários",
      "Suporte prioritário",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R$ 249",
    period: "/mês",
    description: "Para grandes clínicas e hospitais",
    features: [
      "Tudo do Profissional",
      "API personalizada",
      "Integração com laboratórios",
      "Treinamento dedicado",
      "Suporte 24/7",
      "Customizações",
    ],
    popular: false,
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Planos que se adaptam ao seu negócio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha o plano ideal para sua clínica e comece a transformar seu atendimento
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border ${
                plan.popular ? "border-primary shadow-lg scale-105" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
                  }`}
                >
                  Começar Teste Grátis
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
