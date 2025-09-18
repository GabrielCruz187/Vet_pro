"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Users,
  FileText,
  Package,
  DollarSign,
  Settings,
  Home,
  Stethoscope,
  PawPrint,
  Syringe,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Pets", href: "/dashboard/pets", icon: PawPrint },
  { name: "Agendamentos", href: "/dashboard/appointments", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/medical-records", icon: FileText },
  { name: "Vacinações", href: "/dashboard/vaccinations", icon: Syringe },
  { name: "Estoque", href: "/dashboard/inventory", icon: Package },
  { name: "Financeiro", href: "/dashboard/invoices", icon: DollarSign },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 text-emerald-600">
          <Stethoscope className="h-8 w-8" />
          <span className="text-2xl font-bold">VetPro</span>
        </div>
      </div>
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors",
                pathname === item.href
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
