import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Maria Silva",
    role: "Veterinária - Clínica Pet Care",
    content:
      "O VetPro revolucionou nossa clínica. O prontuário digital e a agenda integrada economizaram horas do nosso dia a dia.",
    rating: 5,
  },
  {
    name: "Dr. João Santos",
    role: "Diretor - Hospital Veterinário Central",
    content: "Excelente sistema! O controle financeiro e os relatórios nos ajudaram a aumentar nossa receita em 30%.",
    rating: 5,
  },
  {
    name: "Dra. Ana Costa",
    role: "Veterinária - Clínica Vida Animal",
    content:
      "A integração com WhatsApp é fantástica. Nossos clientes adoram receber lembretes automáticos das consultas.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">O que nossos clientes dizem</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mais de 1.000 clínicas já confiam no VetPro para gerenciar seus negócios
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</blockquote>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
