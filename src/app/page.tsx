'use client'

import { useState, useEffect } from "react";
import { Datos } from "./interfaces/IPersonas";
import MostrarDatos from "./MostrarDatos";
import { collection, addDoc} from "firebase/firestore";
import { updateDoc , doc } from "firebase/firestore";
import {db} from "../conexion/firebase";
import {datosR} from "./funUseEff";


const datosIniciales: Datos = {
  nombreG: "",
  idG: 0,
  fechaG: new Date,
  descripcionG: "",
  turnoG: ""
}

export default function Home() {
  console.log("esto es home")
  const[datosIngr, setDatosIngr] = useState(datosIniciales)//lista dato
  const[datosLocalS, setDatosLocalS] = useState<Datos[]>([]) //datos principal
  const[datosA, setDatosA] = useState(datosIniciales) //Id que recibimos de hijo y lo volvimos a dato
  const[iDA,setIda]= useState("") // contiene el id de editar
  const[datosAct, setDatosAct]=useState(datosIniciales) //set datos para actualizar
  const[idds, setIdes]= useState("") // el id para pasar al hijo para renderizar
  console.log(datosLocalS,"datoslocalS")
  

//primero recupera los datos del local storage y 
//y luego nunca mas se vuelve a ejecutar useEffect
  useEffect(()=>{
    const traerD = async ()=>{
      const registrarD = await datosR()
      setDatosLocalS(registrarD)
      console.log("TRAGIMOS ESTOS DATOS DESDE", registrarD)
    }
    traerD()
  },[]);

  const registrarDatos = async()=>{
      console.log("datos a guardar ", datosIngr)
      const docuRf = await addDoc(collection(db, "Registros"),datosIngr) //Inicializamos las entradas...
      const traerD = async ()=>{
      const registrarD = await datosR()
      setDatosLocalS(registrarD)
      const idGen = docuRf.id
      setIdes(idGen) // guarda los ids que almacenamos
      setDatosIngr(datosIniciales)
  }
  traerD()
};

  const agregarDatos = (name:string,value:string | number)=>{ 
    setDatosIngr({...datosIngr, [name] : value})
  };

  const datosRecib =(d:string)=>{
      const traerD = async ()=>{
      const registrarA = await datosR()
      const dFiltrados = registrarA.filter((a)=>a.id == d);
      dFiltrados.map((d)=>{
        const datoACT = {
            nombreG: d.nombreG,
            idG: d.idG,
            fechaG: d.fechaG,
            descripcionG: d.descripcionG,
            turnoG: d.turnoG
        }
        setDatosA(datoACT)
        console.log(datoACT+" este es el datosACT para actualizar")
      })
    }
    traerD()
    setIda(d)  // es el id que recibimos
  };

  const datosAC = (name:string,value:string | number | Date)=>{ 
    console.log("esto es actualizar")
    console.log(name,value)
    setDatosAct({...datosAct, [name] : value})
  };

  const actualizarDatos = ()=>{
    const docRef = doc(db, 'Registros',iDA);
    alert("la IDA es "+ iDA)
    const act = async () => {
      await updateDoc(docRef, {
        nombreG: datosAct.nombreG,
        idG: datosAct.idG,
        fechaG: datosAct.fechaG,
        descripcionG: datosAct.descripcionG,
        turnoG: datosAct.turnoG,
      });
    }
    act()
    setIdes(iDA)
  };


    return (
    <> 
      <h1>CONTROL DEL INGRESO LABORAL</h1>
      <h1>{datosIngr.nombreG}</h1>
    <form>
      <label>Grupo de Trabajo : </label>
      <input type="text" name="nombreG" placeholder="Ingresa el nombre.."
      value={datosIngr.nombreG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />
      <label>ID del Grupo : </label>
      <input type="number" name="idG" placeholder="Ingresa el id.."
      value={datosIngr.idG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />
      <label>Fecha de ingreso : </label>
      <input type="date" name="fechaG"  
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      /><br />
      <label>Descripción. </label><br />
      <textarea name="descripcionG" placeholder="Descripcion del trabajo.."
      value={datosIngr.descripcionG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}
      ></textarea><br />
      <label>Turno : </label>
      <select name="turnoG" 
      value={datosIngr.turnoG}
      onChange = {(e) => {agregarDatos(e.target.name, e.target.value)}}>
        <option value="">Seleccionar turno</option>
        <option value="Dia">Dia</option>
        <option value="Noche">Noche</option>
      </select><br />
      <div>
        <button onClick={(e) => {e.preventDefault(); registrarDatos();}}>Registrar</button>
      </div>
    </form>
    <MostrarDatos  datosP={datosRecib} setDatosLocalS={setDatosLocalS} idesAlm = {idds} />


    <form>
      <h1>ACTUALIZAR DATOS</h1>
      <label>Nombre : </label>
      <input 
      type="text" 
      name="nombreG" 
      value={datosA.nombreG}
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}/><br/>
      <label>ID : </label>
      <input 
      type="number" 
      name="idG" 
      value={String(datosA.idG)}
      onChange = {(e) => {datosAC(e.target.name, e.target.value)}}/><br/>
      <label>Fecha : </label>
      <input 
      type="date" 
      name="fechaG" 
      placeholder={datosIngr.fechaG.toISOString().substring(0, 10)}
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
      onClick={(e) => {e.preventDefault(); actualizarDatos()}}>Actualizar</button>
    </form>
    </>
  )
};
