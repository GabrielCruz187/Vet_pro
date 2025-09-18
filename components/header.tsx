import { Button } from "@/components/ui/button"
import { Heart, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">VetPro</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#funcionalidades"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Funcionalidades
          </a>
          <a
            href="#servicos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Serviços
          </a>
          <a
            href="#depoimentos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Depoimentos
          </a>
          <a
            href="#contato"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Entrar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Teste Grátis</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
