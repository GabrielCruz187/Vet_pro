import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Sistema Completo para <span className="text-primary">Clínicas Veterinárias</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">
            Gerencie sua clínica veterinária com eficiência. Prontuário digital, controle de estoque, agenda integrada,
            financeiro e muito mais em uma única plataforma.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Começar Teste Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Ver Demonstração
            </Button>
          </div>
        </div>

        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-card/50 p-2 ring-1 ring-border backdrop-blur-sm">
            <img
              src="/modern-veterinary-clinic-dashboard-interface.jpg"
              alt="VetPro Dashboard"
              className="rounded-lg shadow-2xl ring-1 ring-border"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
