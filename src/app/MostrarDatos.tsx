import React,{ useEffect, useState } from "react";
import { Datos } from "./interfaces/IPersonas";
import {datosR} from "./funUseEff"
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/conexion/firebase";

interface Props{//me marco un error
    datosP: (d: Datos, index:number)=> void;
    setDatosLocalS: (a:Datos[])=>void;
}

export const MostrarDatos =(props: Props) => {
    const[datos, setDatos] = useState<Datos[]>([])
    console.log("esto mostrara datos", datos)

    useEffect(()=>{
        const datosRec = async ()=>{
            const listaOj = await datosR() //sin wait guardamos una promesa pendiente
            setDatos(listaOj)
        }
        datosRec()
    },[])

    const editarD = (index:string)=>{

    };

const eliminarD = async (indice: string) => {
    try {
        const noElim = datos.filter((o) => o.id !== indice);
        await deleteDoc(doc(db, "Registros", indice));
        setDatos(noElim);
        props.setDatosLocalS(noElim)
    } catch (error) {
        console.error("Error al eliminar el documento:", error);
        alert("Ocurrió un error al eliminar el registro.");
    }
};


    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Turno</th>
                </tr>
            </thead>
            <tbody>
                {datos.map((d,index)=>{
                    return(
                        <tr key={index}>
                            <td>{d.nombreG}</td>
                            <td>{d.idG}</td>
                            <td>{new Date(d.fechaG).toLocaleDateString()}</td>
                            <td>{d.descripcionG}</td>
                            <td>{d.turnoG}</td>
                        <td>
                            <button onClick ={()=>editarD(d.id!)}>Editar</button>
                            <button onClick ={()=>eliminarD(d.id!)}>Eliminar</button>
                        </td>
                    </tr>
                    )})}
            </tbody>
        </table>          
        </>      
    )
}
export default MostrarDatos




//el `!` le dice a TypeScript: "Confía en mí, esto no es undefined"
//wait
//📦 Analogía rápida:
//Imagina que datosR() es como pedir comida a domicilio:
//Tú haces: const listaOj = datosR();
//Pero datosR() es un pedido que todavía está en camino (una promesa).
//Así que listaOj es la caja vacía con un cartel que dice "en camino", no la comida.
//Si quieres la comida real, tienes que esperar a que llegue.
//→ Eso es lo que hace await.