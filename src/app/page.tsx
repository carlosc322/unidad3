'use client'

import { useState, useEffect } from "react";
import { Datos } from "./interfaces/IPersonas";
import MostrarDatos from "./MostrarDatos";

const datosIniciales: Datos = {// nombreG-Datos nombreG-name tienen que ser iguales//
  nombreG: "",
  idG: 0,
  fechaG: new Date(),
  descripcionG: "",
  turnoG: ""
}
export default function Home() {
  console.log("esto es home")
  const[datosIngr, setDatosIngr] = useState(datosIniciales)//lista dato
  const[datosLocalS, setDatosLocalS] = useState<Datos[]>([])
  const[datosA, setDatosA] = useState(datosIniciales)
  console.log(datosIngr ,"se imprime en vivo")

//primero recupera los datos del local storage y 
//y luego nunca mas se vuelve a ejecutar useEffect 

  useEffect(()=>{
    console.log("solo se ejcuta una vez")
    let datosStr = window.localStorage.getItem("datosE")
    if (datosStr!= null){
      let datosObj = JSON.parse(datosStr)
      setDatosLocalS(datosObj)
    }
  },[]);

  const registrarDatos = ()=>{
    const nuevoAgr = [...datosLocalS,datosIngr]
    localStorage.setItem("datosE",JSON.stringify(nuevoAgr))
    setDatosLocalS(nuevoAgr)
  };

  const agregarDatos = (name:string,value:string | number)=>{ //TypeScript//
    console.log("esto es agregar")
    console.log(name,value)
    setDatosIngr({...datosIngr, [name] : value})
  };

  const datosRecib =(d:Datos)=>{
    setDatosA(d) //me dio otr error
  }
  //const eliminarD = (id: number) => {

    return (
    <> 
      <h1>Ingreso Laboral</h1>
      <h1>{datosIngr.nombreG}</h1>
    <form>
      <label>Grupo de Trabajo : </label>
      <input type="text" name="nombreG" placeholder="Ingresa el nombre.."
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />
      <label>ID del Grupo : </label>
      <input type="number" name="idG" placeholder="Ingresa el id.."
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />
      <label>Fecha de ingreso : </label>
      <input type="date" name="fechaG"  
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />
      <label>Descripción. </label><br />
      <textarea name="descripcionG" placeholder="Descripcion del trabajo.."
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      ></textarea><br />
      <label>Turno : </label>
      <select name="turnoG" 
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}>
        <option value="">Seleccionar turno</option>
        <option value="Dia">Dia</option>
        <option value="Noche">Noche</option>
      </select><br />
      <button onClick={()=>{registrarDatos()}}>Registrar</button>
    </form>

    <MostrarDatos datosP = {datosRecib}/>

    <form>
      <h1>ACTUALIZAR DATOS</h1>
      <label>Nombre : </label>
      <input 
      type="text" 
      name="nombreG" 
      placeholder="Nuevo nombre.." 
      value={datosA.nombreG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}/><br/>
      <label>ID : </label>
      <input 
      type="number" 
      name="idG" 
      placeholder="Nuevo id.." 
      value={datosA.idG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}/><br/>
      <label>Fecha : </label>
      <input 
      type="date" 
      name="fechaG" 
      value={new Date(datosA.fechaG).toLocaleDateString()}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}/><br/>
      <label>Descripción : </label><br />
      <input 
      type="text" 
      name="descripcionG" 
      placeholder="Descripción.."
      value = {datosA.descripcionG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}/><br/>
      <label>Turno : </label>
      <select name="turnoG"
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}>
        <option value=""></option>
        <option value={datosA.turnoG}>Dia</option>
        <option value={datosA.turnoG}>Noche</option>
      </select>
      <button>Actualizar</button>
    </form>
    </>
  )
}
