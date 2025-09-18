import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-800">Verifique seu email</CardTitle>
          <CardDescription>Enviamos um link de confirmação para seu email</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Clique no link enviado para seu email para ativar sua conta e fazer login no sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
