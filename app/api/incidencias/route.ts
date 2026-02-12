import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

export async function GET() {
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: "Missing Supabase environment variables" },
      { status: 500 },
    )
  }

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
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: "Missing Supabase environment variables" },
      { status: 500 },
    )
  }

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
