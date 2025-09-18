"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Calendar, User, Phone, Mail, PawPrint, Stethoscope, Pill, FileText, Clock } from "lucide-react"

interface MedicalRecord {
  id: string
  visit_date: string
  reason_for_visit: string
  symptoms: string | null
  diagnosis: string | null
  treatment: string | null
  medications: string | null
  follow_up_date: string | null
  notes: string | null
  created_at: string
  pet: {
    id: string
    name: string
    species: string
    breed: string | null
    gender: string | null
    birth_date: string | null
    weight: number | null
    client: {
      id: string
      name: string
      email: string | null
      phone: string
      address: string | null
      city: string | null
    }
  }
  veterinarian: {
    full_name: string
    specialization: string | null
  }
}

interface MedicalRecordDetailsProps {
  medicalRecord: MedicalRecord
}

export function MedicalRecordDetails({ medicalRecord }: MedicalRecordDetailsProps) {
  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    const age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1
    }
    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prontuário Médico</h1>
          <p className="text-gray-600">
            Consulta realizada em {new Date(medicalRecord.visit_date).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <Link href={`/dashboard/medical-records/${medicalRecord.id}/edit`}>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Edit className="mr-2 h-4 w-4" />
            Editar Prontuário
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5 text-emerald-600" />
                Informações da Consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Data da Consulta</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {new Date(medicalRecord.visit_date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Veterinário</Label>
                  <div className="flex items-center mt-1">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{medicalRecord.veterinarian.full_name}</div>
                      {medicalRecord.veterinarian.specialization && (
                        <div className="text-sm text-muted-foreground">{medicalRecord.veterinarian.specialization}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium text-gray-500">Motivo da Consulta</Label>
                <p className="mt-1 text-gray-900">{medicalRecord.reason_for_visit}</p>
              </div>

              {medicalRecord.symptoms && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Sintomas Observados</Label>
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">{medicalRecord.symptoms}</p>
                </div>
              )}

              {medicalRecord.diagnosis && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Diagnóstico</Label>
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">{medicalRecord.diagnosis}</p>
                </div>
              )}

              {medicalRecord.treatment && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tratamento Prescrito</Label>
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">{medicalRecord.treatment}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {(medicalRecord.medications || medicalRecord.follow_up_date || medicalRecord.notes) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-emerald-600" />
                  Informações Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicalRecord.medications && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center">
                      <Pill className="mr-1 h-4 w-4" />
                      Medicamentos
                    </Label>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">{medicalRecord.medications}</p>
                  </div>
                )}

                {medicalRecord.follow_up_date && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Data de Retorno
                    </Label>
                    <Badge variant="secondary" className="mt-1">
                      {new Date(medicalRecord.follow_up_date).toLocaleDateString("pt-BR")}
                    </Badge>
                  </div>
                )}

                {medicalRecord.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Observações Gerais</Label>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">{medicalRecord.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PawPrint className="mr-2 h-5 w-5 text-emerald-600" />
                Informações do Pet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-500">Nome</Label>
                <p className="font-medium">{medicalRecord.pet.name}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Espécie</Label>
                  <Badge variant="secondary">{medicalRecord.pet.species}</Badge>
                </div>
                {medicalRecord.pet.gender && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Sexo</Label>
                    <p className="capitalize">{medicalRecord.pet.gender === "male" ? "Macho" : "Fêmea"}</p>
                  </div>
                )}
              </div>
              {medicalRecord.pet.breed && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Raça</Label>
                  <p>{medicalRecord.pet.breed}</p>
                </div>
              )}
              {medicalRecord.pet.birth_date && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Idade</Label>
                  <p>{calculateAge(medicalRecord.pet.birth_date)} anos</p>
                </div>
              )}
              {medicalRecord.pet.weight && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Peso</Label>
                  <p>{medicalRecord.pet.weight} kg</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proprietário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-500">Nome</Label>
                <p className="font-medium">{medicalRecord.pet.client.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{medicalRecord.pet.client.phone}</span>
              </div>
              {medicalRecord.pet.client.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{medicalRecord.pet.client.email}</span>
                </div>
              )}
              {medicalRecord.pet.client.address && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Endereço</Label>
                  <p className="text-sm">
                    {medicalRecord.pet.client.address}
                    {medicalRecord.pet.client.city && <br />}
                    {medicalRecord.pet.client.city}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
