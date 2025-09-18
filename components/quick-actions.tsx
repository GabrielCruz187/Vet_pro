import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users, Package, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Nova Consulta",
      description: "Agendar consulta",
      icon: Calendar,
      href: "/dashboard/appointments/new",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Novo Cliente",
      description: "Cadastrar cliente",
      icon: Users,
      href: "/dashboard/clients/new",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Novo Produto",
      description: "Adicionar ao estoque",
      icon: Package,
      href: "/dashboard/inventory/new",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Novo Prontuário",
      description: "Registrar consulta",
      icon: FileText,
      href: "/dashboard/medical-records/new",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Nova Transação",
      description: "Registrar receita/despesa",
      icon: DollarSign,
      href: "/dashboard/financial/transactions/new",
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-600" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all bg-transparent"
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
