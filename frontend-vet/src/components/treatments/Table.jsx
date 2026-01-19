import { MdDeleteForever, MdOutlinePayments } from "react-icons/md";
import ModalPayment from "./ModalPayment";
// 1. IMPORTAR EL HOOK AQUÍ
import storeTreatments from "../../context/storeTreatments";

// 2. AÑADIR listPatient A LOS PROPS (asegúrate de pasarlo desde el componente padre)
const TableTreatments = ({ treatments, listPatient }) => {
    const { deleteTreatments } = storeTreatments()

    const handleDelete = async (id) => {
        // Asegúrate de que el id sea válido antes de llamar
        const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/eliminar/${id}`
        await deleteTreatments(url) // Es recomendable esperar con await
        
        // Verificamos si listPatient existe antes de ejecutarlo
        if(listPatient) listPatient();
    }

    return (
        <table className='w-full mt-5 table-auto shadow-lg bg-white'>
            {/* ... (tu thead sigue igual) ... */}
            <thead className='bg-gray-800 text-slate-400'>
                <tr>
                    <th className="p-2">N°</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Descripción</th>
                    <th className="p-2">Prioridad</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Estado pago</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    treatments.map((treatment, index) => (
                        <tr className="hover:bg-gray-300 text-center" key={treatment._id || index}>
                            <td>{index + 1}</td>
                            <td>{treatment.nombre}</td>
                            <td>{treatment.detalle}</td>
                            <td>{treatment.prioridad}</td>
                            <td>${treatment.precio}</td>
                            <td>
                                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    {treatment.estadoPago}
                                </span>
                            </td>

                            <td className='py-2 text-center'>
                                <MdOutlinePayments
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                    title="Pagar"
                                />

                                <MdDeleteForever
                                    className="h-8 w-8 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                    title="Eliminar" 
                                    // 3. CORRECCIÓN: Usar _id en lugar de id
                                    onClick={() => {handleDelete(treatment._id)}}
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TableTreatments