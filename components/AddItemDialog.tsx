"use client"

import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/**
 * Prioridad automática según el tipo de incidencia
 * null = requiere evaluación manual
 */
const PRIORITY_BY_TYPE: Record<string, number | null> = {
  "Electricidad/Iluminación": 5,
  "Internet/Red": 5,
  Proyector: 3,
  Mobiliario: 1,
  Otro: null,
}

export function AddItemDialog() {
  const [aula, setAula] = useState<string | null>(null)
  const [tipo, setTipo] = useState<string | null>(null)
  const [descripcion, setDescripcion] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("incidencia-form")
    if (!saved) return

    try {
      const parsed = JSON.parse(saved) as {
        aula: string | null
        tipo: string | null
        descripcion: string
      }
      setAula(parsed.aula ?? null)
      setTipo(parsed.tipo ?? null)
      setDescripcion(parsed.descripcion ?? "")
    } catch {
      localStorage.removeItem("incidencia-form")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "incidencia-form",
      JSON.stringify({ aula, tipo, descripcion }),
    )
  }, [aula, tipo, descripcion])

  useEffect(() => {
    if (submitted) setSubmitted(false)
    if (error) setError(null)
  }, [aula, tipo, descripcion])

  const prioridad = tipo ? PRIORITY_BY_TYPE[tipo] : null

  const handleSubmit = () => {
    if (!aula || !tipo || !descripcion.trim()) {
      setSubmitted(false)
      setError("Necesitas rellenar todos los campos.")
      return
    }

    const incidencia = {
      aula,
      tipo,
      descripcion,
      prioridad, // number | null
    }

    const raw = localStorage.getItem("incidencias")
    const prev = raw ? (JSON.parse(raw) as typeof incidencia[]) : []
    const next = [...prev, incidencia]
    localStorage.setItem("incidencias", JSON.stringify(next))

    // Por ahora solo lo mostramos por consola
    // Más adelante aquí irá el fetch al backend
    console.log("Incidencia enviada:", incidencia)

    setError(null)
    setSubmitted(true)
    setAula(null)
    setTipo(null)
    setDescripcion("")
    localStorage.removeItem("incidencia-form")
  }

  const handleOpenPreview = () => {
    const win = window.open("/incidencias", "_blank")
    if (!win) return
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full px-4 py-2 rounded-md bg-[#124D58] text-white hover:bg-[#0F3F48] text-center font-['Libre_Baskerville']">
          Nueva incidencia
        </button>
      </DialogTrigger>

      <DialogContent className="font-montserrat">
        <DialogHeader>
          <DialogTitle className="text-center font-['Libre_Baskerville'] text-3xl font-light tracking-wide">
            INCIDENCIAS
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Aula */}
          <div className="w-full max-w-md">
            <Select value={aula ?? ""} onValueChange={setAula}>
              <SelectTrigger className="justify-center text-center bg-[#124D58] text-white">
                <SelectValue placeholder="Número del aula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aula 1">Aula 1</SelectItem>
                <SelectItem value="Aula 2">Aula 2</SelectItem>
                <SelectItem value="Aula 3">Aula 3</SelectItem>
                <SelectItem value="Aula 4">Aula 4</SelectItem>
                <SelectItem value="Aula 5">Aula 5</SelectItem>
                <SelectItem value="Aula 6">Aula 6</SelectItem>
                <SelectItem value="Aula 7">Aula 7</SelectItem>
                <SelectItem value="Aula 8">Aula 8</SelectItem>
                <SelectItem value="Aula 9">Aula 9</SelectItem>
                <SelectItem value="Aula 10">Aula 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de incidencia */}
          <div className="w-full max-w-md">
            <Select value={tipo ?? ""} onValueChange={setTipo}>
              <SelectTrigger className="justify-center text-center bg-[#124D58] text-white">
                <SelectValue placeholder="Tipo de incidencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Internet/Red">Internet/Red</SelectItem>
                <SelectItem value="Electricidad/Iluminación">
                  Electricidad / Iluminación
                </SelectItem>
                <SelectItem value="Proyector">Proyector</SelectItem>
                <SelectItem value="Mobiliario">Mobiliario</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Descripción */}
          <div className="w-full max-w-md">
            <textarea
              placeholder="Explica tu incidencia con detalle"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full h-40 p-4 rounded-xl bg-[#124D58] text-white placeholder:text-white/60 border border-white/20 outline-none resize-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Información de prioridad (solo informativa) */}
          {tipo && (
            <p className="text-center text-sm text-gray-500">
              Prioridad asignada:{" "}
              <span className="font-semibold">
                {prioridad ?? "Sin prioridad"}
              </span>
            </p>
          )}
        </div>

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        {submitted && (
          <p className="text-center text-sm text-emerald-600">
            El formulario se ha enviado correctamente.
          </p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
              Cancelar
            </button>
          </DialogClose>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#D46D95] hover:bg-[#c25f88] text-white"
          >
            Enviar
          </button>

          <button
            onClick={handleOpenPreview}
            className="px-4 py-2 rounded-md bg-[#124D58] hover:bg-[#0F3F48] text-white"
          >
            Ver datos
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
