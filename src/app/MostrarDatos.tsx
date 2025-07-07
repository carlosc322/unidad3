import React,{ useEffect, useState } from "react";
import { Datos } from "./interfaces/IPersonas";

interface Props{//me marco un error
    datosP: (d: Datos)=> void;
}

export const MostrarDatos =(props: Props) => {

    const[datos, setDatos] = useState<Datos[]>([])
    useEffect(()=>{
        let listaD = window.localStorage.getItem("datosE")
        if (listaD != null){
            let listaObj = JSON.parse(listaD)
            setDatos(listaObj)
        }
    },[])
    const editarD = (index:number)=>{
        props.datosP(datos[index])
    };

    const eliminarD = (indice:number)=>{
        const datosO =  JSON.parse(localStorage.getItem('datosE') || '[]' );
        const datosFil = datosO.filter((datos: any,index: number)=>index != indice)//no se sabe el dato
        localStorage.setItem('datosE', JSON.stringify(datosFil))
        setDatos(datosFil)
        //if(datosFil == null)

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
                                <button onClick ={()=>editarD(index)}>Editar</button>
                                <button onClick ={()=>eliminarD(index)}>Eliminar</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>          
        </>      
    )
}
export default MostrarDatos