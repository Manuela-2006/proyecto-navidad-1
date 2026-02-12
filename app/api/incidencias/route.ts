import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  const { data, error } = await supabase
    .from("incidencias")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const aula = typeof body.aula === "string" ? body.aula.trim() : ""
  const tipo = typeof body.tipo === "string" ? body.tipo.trim() : ""
  const descripcion =
    typeof body.descripcion === "string" ? body.descripcion.trim() : ""
  const prioridad =
    typeof body.prioridad === "number" ? body.prioridad : null

  if (!aula || !tipo || !descripcion) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    )
  }

  const payload =
    prioridad === null
      ? { aula, tipo, descripcion }
      : { aula, tipo, descripcion, prioridad }

  const { data, error } = await supabase
    .from("incidencias")
    .insert(payload)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
