"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddItemDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left px-4 py-2 rounded-md bg-[#124D58] text-white hover:bg-[#0F3F48]">
          Nueva incidencia
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle  className="text-center w-full">Cuéntanos tu incidencia</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Campo 1 - SELECT */}
          <div className="w-full max-w-md">
    <Select>
      <SelectTrigger className="justify-center text-center bg-[#124D58] text-white">
        <SelectValue placeholder="Número del aula" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aula1">Aula 1</SelectItem>
        <SelectItem value="aula2">Aula 2</SelectItem>
        <SelectItem value="aula2">Aula 3</SelectItem>
        <SelectItem value="aula2">Aula 4</SelectItem>
        <SelectItem value="aula2">Aula 5</SelectItem>
        <SelectItem value="aula2">Aula 6</SelectItem>
        <SelectItem value="aula2">Aula 7</SelectItem>
        <SelectItem value="aula2">Aula 8</SelectItem>
        <SelectItem value="aula2">Aula 9</SelectItem>
        <SelectItem value="aula2">Aula 10</SelectItem>
      </SelectContent>
    </Select>
  </div>

          {/* Campo 2 - SELECT */}
          <div className="w-full max-w-md">
    <Select>
      <SelectTrigger className="justify-center text-center bg-[#124D58] text-white">
        <SelectValue placeholder="Tipo de incidencia" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Proyector">Proyector</SelectItem>
        <SelectItem value="Ordenadores">Ordenadores</SelectItem>
        <SelectItem value="Internet/Red">Internet/Red</SelectItem>
        <SelectItem value="Mobiliario">Mobiliario</SelectItem>
        <SelectItem value="Electricidad/Iluminación">Electricidad/Iluminación</SelectItem>
        <SelectItem value="Otro">Otro</SelectItem>
      </SelectContent>
    </Select>
  </div>

          {/* Campo 3 - input texto */}
<div className="w-full max-w-md">
  <textarea
    placeholder="Explica tu incidencia con detalle"
    className="
      w-full h-40 
      p-4 
      rounded-xl 
      bg-[#124D58] 
      text-white 
      placeholder:text-white/60
      border border-white/20 
      outline-none 
      resize-none
      focus:ring-2 focus:ring-white/20
    "
  ></textarea>
</div>
</div>


{/* Barra deslizable */}
<div className="w-full flex justify-center">
  <div className="w-80 mt-[-5px] mb-8">   {/* <-- añade mb-8 aquí */}
    
    <div className="flex justify-between text-sm mb-1">
      <span>1</span>
      <span>5</span>
    </div>

    <input
  type="range"
  min={1}
  max={5}
  defaultValue={3}
  className="
    w-full 
    h-2 
    rounded-lg 
    appearance-none 
    cursor-pointer 
    bg-gray-300 
    transition-all duration-150
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-6
    [&::-webkit-slider-thumb]:w-12
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[#124D58]
    [&::-webkit-slider-thumb]:border
    [&::-webkit-slider-thumb]:border-gray-200
    [&::-webkit-slider-thumb]:shadow-md
    
    [&::-moz-range-thumb]:h-6
    [&::-moz-range-thumb]:w-12
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-[#124D58]
    [&::-moz-range-thumb]:border
    [&::-moz-range-thumb]:border-gray-200
    [&::-moz-range-thumb]:shadow-md
  "
/>

  </div>
</div>





        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
              Cancelar
            </button>
          </DialogClose>

          <button className="px-4 py-2 rounded-md bg-[#D46D95] hover:bg-[#c25f88] text-white">
            Enviar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
