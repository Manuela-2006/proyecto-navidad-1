"use client"

import { useEffect, useState } from "react"

type Incidencia = {
  aula: string | null
  tipo: string | null
  descripcion: string
  prioridad: number | null
}

export default function IncidenciasPage() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])

  useEffect(() => {
    const raw = localStorage.getItem("incidencias")
    try {
      setIncidencias(raw ? (JSON.parse(raw) as Incidencia[]) : [])
    } catch {
      setIncidencias([])
    }
  }, [])

  return (
    <main className="min-h-screen bg-white text-[#124D58] p-8">
      <h1 className="font-['Libre_Baskerville'] text-2xl mb-4">
        Incidencias guardadas
      </h1>

      <div className="grid gap-4 max-w-2xl">
        {incidencias.length === 0 ? (
          <p>No hay incidencias guardadas.</p>
        ) : (
          incidencias.map((inc, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl p-4"
            >
              <div className="mb-3">
                <span className="font-semibold block">#</span>
                <span>{idx + 1}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold block">Aula</span>
                <span>{inc.aula ?? ""}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold block">Tipo</span>
                <span>{inc.tipo ?? ""}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold block">Descripción</span>
                <span className="whitespace-pre-wrap">{inc.descripcion}</span>
              </div>
              <div>
                <span className="font-semibold block">Prioridad</span>
                <span>{inc.prioridad ?? "Sin prioridad"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
