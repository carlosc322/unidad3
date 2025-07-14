'use client'

import { useState, useEffect } from "react";
import { Datos } from "./interfaces/IPersonas";
import MostrarDatos from "./MostrarDatos";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from "../conexion/firebase";
import { error } from "console";


const datosIniciales: Datos = {
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
  const[indiceA,setIndice]= useState(0)
  const[datosAct, setDatosAct]=useState(datosIniciales)
  

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

  const registrarDatos = async()=>{
    try {
      console.log("datos a guardar ", datosIngr)
      const docuRf = await addDoc(collection(db, "Registros"),datosIngr);
      console.log("el ID del documento:",docuRf)
    }catch(error){
      console.log("Error al registrar "+ error)
    }
  };

  const agregarDatos = (name:string,value:string | number)=>{ 
    setDatosIngr({...datosIngr, [name] : value})
  };

  const datosRecib =(d:Datos,indiceE:number)=>{
    setDatosA(d)
    setIndice(indiceE)
  };

  const datosAC = (name:string,value:string | number)=>{ 
    console.log("esto es actualizar")
    console.log(name,value)
    setDatosAct({...datosAct, [name] : value})
  };

  const actualizarDatos =()=>{
    if(indiceA != null){
      const nuevaListA = [...datosLocalS]
      nuevaListA[indiceA] ={
      nombreG: datosAct.nombreG,
      idG: datosAct.idG,
      fechaG: datosAct.fechaG,
      descripcionG: datosAct.descripcionG,
      turnoG: datosAct.turnoG
    }
    setDatosLocalS(nuevaListA)
    localStorage.setItem("datosE",JSON.stringify(nuevaListA))
    }

  }
    return (
    <> 
      <h1>CONTROL DEL INGRESO LABORAL</h1>
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
      <button onClick={(e) => {e.preventDefault(); registrarDatos();}}>Registrar</button>
    </form>
    
    <MostrarDatos datosP = {datosRecib} setDatosLocalS = {setDatosLocalS}/>

    <form>
      <h1>ACTUALIZAR DATOS</h1>
      <label>Nombre : </label>
      <input 
      type="text" 
      name="nombreG" 
      placeholder={datosA.nombreG}
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}/><br/>
      <label>ID : </label>
      <input 
      type="number" 
      name="idG" 
      placeholder={String(datosA.idG)}
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}/><br/>
      <label>Fecha : </label>
      <input 
      type="date" 
      name="fechaG" 
      placeholder={new Date(datosA.fechaG).toLocaleDateString()}
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}/><br/>
      <label>Descripción : </label><br />
      <input 
      type="text" 
      name="descripcionG" 
      placeholder={datosA.descripcionG}
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}/><br/>
      <label>Turno : </label>
      <select name="turnoG"
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}>
        <option value=""></option>
        <option value="Dia">Dia</option>
        <option value="Noche">Noche</option>
      </select><br />
      <button
      onClick={actualizarDatos}
      >Actualizar</button>
    </form>
    </>
  )
}
