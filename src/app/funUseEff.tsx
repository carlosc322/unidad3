
import { collection, getDocs } from "firebase/firestore";
import {db} from "../conexion/firebase";


export async function datosR() {
    const qdatos = await getDocs(collection(db, "Registros"));
    const datosO = qdatos.docs.map((doc) => ({
        id: doc.id,
        nombreG: doc.data().nombreG,
        idG: doc.data().idG,
        fechaG: doc.data().fechaG?.toDate() ?? new Date(),
        descripcionG: doc.data().descripcionG,
        turnoG: doc.data().turnoG,
    }));
return datosO;
};
