import React,{ useEffect, useState } from "react";
import { Datos } from "./interfaces/IPersonas";

interface Props{//me marco un error
    datosP: (d: Datos)=> void;
}

export const MostrarDatos =(props: Props) => {
        const localStor = window.localStorage
        const[datos, setDatos] = useState<Datos[]>([])
            useEffect(()=>{
                let listaD = localStor.getItem("datosE")
                if (listaD != null){
                    let listaObj = JSON.parse(listaD)
                    setDatos(listaObj)
                }
        },[])
        const editarD = (index:number)=>{
            alert("Le diste al "+index)
            props.datosP(datos[index])
        }
    return (
        <>
        <h1>{}</h1>
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
                            <td></td>
                            <td>{d.descripcionG}</td>
                            <td>{d.turnoG}</td>
                            <td>
                                <button onClick ={()=>editarD(index)}>Editar</button>
                            </td>
                            <td><button>Eliminar</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>          
        </>      
    )
}
export default MostrarDatos