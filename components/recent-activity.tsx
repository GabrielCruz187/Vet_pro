import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, Users, Package, FileText, DollarSign } from "lucide-react"

export function RecentActivity() {
  // Simulated recent activities - in a real app, this would come from the database
  const activities = [
    {
      type: "appointment",
      message: "Nova consulta agendada para Rex",
      time: "há 2 minutos",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      type: "client",
      message: "Cliente Maria Santos cadastrado",
      time: "há 15 minutos",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      type: "inventory",
      message: "Estoque de Ração Premium atualizado",
      time: "há 1 hora",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      type: "medical",
      message: "Prontuário de Mimi atualizado",
      time: "há 2 horas",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      type: "financial",
      message: "Pagamento de R$ 150,00 recebido",
      time: "há 3 horas",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-600" />
          Atividades Recentes
        </CardTitle>
        <CardDescription>Últimas atividades do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            Ver todas as atividades →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
