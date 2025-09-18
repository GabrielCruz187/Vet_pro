import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Pronto para transformar sua clínica?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
            Comece seu teste gratuito hoje e descubra como o VetPro pode revolucionar o atendimento da sua clínica
            veterinária.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Teste Grátis por 14 Dias
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="link" className="text-primary-foreground hover:text-primary-foreground/80">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
