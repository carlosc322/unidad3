'use client'

import { useState, useEffect } from "react"

const Datos = {// nombreG-Datos nombreG-name tienen que ser iguales//
  nombreG: "",
  idG: "",
  fechaG: "",
  descripcionG: "",
  turnoG: ""
}

export default function Home() {
  console.log("esto es home")
  const[lista, setLista] = useState(Datos)
  console.log(lista ,"se imprime en vivo")



  useEffect(()=>{
    const localS = window.localStorage
    localS.setItem("datos",JSON.stringify(lista))
  })
  

  const agregarDatos = (name:string,value:string)=>{ //TypeScript//
    console.log("esto es agregarD")
    console.log(name,value)
    setLista({...lista, [name] : value})
  };




    return (
    <>
      <h1>Control Laboral</h1>

      <h1>{lista.nombreG}</h1>
    <form>
      <label>Grupo de Trabajo : </label>
      <input type="text" name="nombreG" placeholder="Ingresa el nombre.." 
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />

      <label>ID del Grupo : </label>
      <input type="number" name="id" placeholder="Ingresa el id.."/><br />
      <label>Fecha : </label>
      <input type="date" name="fecha" placeholder="Ingrese fecha de laburo.." /><br />
      <label>Descripción. </label><br />
      <textarea name="Descripcion" placeholder="Descripcion del trabajo.."></textarea><br />
      <label>Turno : </label>
      <select>
        <option value="dia">Dia</option>
        <option value="noche">Noche</option>
      </select>

    </form>
    </>

  )
}
