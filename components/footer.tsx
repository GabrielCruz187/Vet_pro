import { Heart, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contato" className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">VetPro</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
              Sistema completo de gestão para clínicas veterinárias. Simplifique seus processos e ofereça o melhor
              atendimento aos seus pacientes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                contato@vetpro.com.br
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                (11) 9999-9999
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                São Paulo, SP
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Demonstração
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Treinamentos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">© 2024 VetPro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
