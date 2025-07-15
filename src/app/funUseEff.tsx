
import { collection, getDocs } from "firebase/firestore";
import {db} from "../conexion/firebase";

export async function datosR() {
    const qdatos = await getDocs(collection(db,"Registros"));
    console.log("esto es datos RE--" ,qdatos)
    const datosO = qdatos.docs.map(datO =>{//datO es una instancia de QueryDocumentSnapshot__id_data->Foreach
    const datRec = datO.data();//funcioa que devuelve los datos reales
        return{
            id: datO.id,
            nombreG: datRec.nombreG ?? '',
            idG: datRec.idG ?? '',
            fechaG: datRec.fechaG?.toDate?.() ?? new Date(),
            descripcionG: datRec.descripcionG ?? '',
            turnoG: datRec.turnoG ?? ''
        }
    })
    return datosO
};