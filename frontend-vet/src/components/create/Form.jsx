import { useState } from "react";
import { useForm } from "react-hook-form"; // 1. Importar hook form
import { useFetch } from "../../hooks/useFetch"; // 2. Importar tu hook de petición
import { useNavigate } from "react-router"; 
import { toast } from "react-toastify";

export const Form = () => {
    const [stateAvatar, setStateAvatar] = useState({
        generatedImage: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png",
        prompt: "",
        loading: false
    });

    const [selectedOption, setSelectedOption] = useState("ia");
    
    // 3. Inicializar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm();
    const fetchDataBackend = useFetch();
    const navigate = useNavigate();

    // 4. Función para enviar los datos
    const onSubmit = async (data) => {
        
        // Crear instancia de FormData (Obligatorio para archivos)
        const formData = new FormData();

        // Agregar datos de texto
        formData.append("nombrePropietario", data.nombrePropietario);
        formData.append("cedulaPropietario", data.cedulaPropietario);
        formData.append("emailPropietario", data.emailPropietario);
        formData.append("celularPropietario", data.celularPropietario);
        formData.append("nombreMascota", data.nombreMascota);
        formData.append("tipoMascota", data.tipoMascota);
        formData.append("fechaNacimientoMascota", data.fechaNacimientoMascota);
        formData.append("detalleMascota", data.detalleMascota);

        // Agregar la imagen solo si se seleccionó la opción de subir
        if (selectedOption === "upload" && data.imagen && data.imagen[0]) {
            // "imagen" debe coincidir con req.files.imagen en tu backend
            formData.append("imagen", data.imagen[0]); 
        }

        // Agregar imagen de IA si aplica (Opcional según tu lógica)
        if (selectedOption === "ia") {
             formData.append("avatarMascotaIA", stateAvatar.generatedImage);
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
            
            // 5. Enviar usando tu hook, IMPORTANTE: headers undefined para que axios detecte multipart
            await fetchDataBackend(url, formData, "POST", { "Content-Type": "multipart/form-data" });
            
            navigate('/dashboard/list');
        } catch (error) {
            console.log(error);
            toast.error("Error al registrar paciente");
        }
    };

    return (
        // 6. Conectar el handleSubmit
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información del propietario
                </legend>

                {/* Cédula */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Cédula</label>
                    <div className="flex items-center gap-10 mb-5">
                        <input
                            type="number"
                            placeholder="Ingresa la cédula"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            {...register("cedulaPropietario", { required: true })} 
                        />
                    </div>
                </div>

                {/* Nombre completo */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombres completos</label>
                    <input
                        type="text"
                        placeholder="Ingresa nombre y apellido"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("nombrePropietario", { required: true })}
                    />
                </div>

                {/* Correo electrónico */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa el correo electrónico"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("emailPropietario", { required: true })}
                    />
                </div>

                {/* Celular */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Celular</label>
                    <input
                        type="number"
                        placeholder="Ingresa el celular"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("celularPropietario", { required: true })}
                    />
                </div>
            </fieldset>

            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg mt-10">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información de la mascota
                </legend>

                {/* Nombre de la mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombre</label>
                    <input
                        type="text"
                        placeholder="Ingresar nombre"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("nombreMascota", { required: true })}
                    />
                </div>

                {/* Lógica de selección de imagen */}
                <label className="mb-2 block text-sm font-semibold">Imagen de la mascota</label>
                <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="ia"
                            checked={selectedOption === "ia"}
                            onChange={() => setSelectedOption("ia")}
                        />
                        Generar con IA
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="upload"
                            checked={selectedOption === "upload"}
                            onChange={() => setSelectedOption("upload")}
                        />
                        Subir Imagen
                    </label>
                </div>

                {selectedOption === "ia" && (
                    <div className="mt-5">
                        {/* ... tu lógica de IA existente ... */}
                    </div>
                )}

                {/* INPUT DE ARCHIVO IMPORTANTE */}
                {selectedOption === "upload" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Subir Imagen</label>
                        <input
                            type="file"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("imagen")} // 7. Registrar el input file
                        />
                    </div>
                )}

                {/* Tipo de mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Tipo</label>
                    <select
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("tipoMascota", { required: true })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="gato">Gato</option>
                        <option value="perro">Perro</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("fechaNacimientoMascota", { required: true })}
                    />
                </div>

                {/* Síntomas */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Síntoma u observación</label>
                    <textarea
                        placeholder="Ingresa el síntoma u observación de forma general"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("detalleMascota", { required: true })}
                    />
                </div>
            </fieldset>

            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-600 cursor-pointer transition-all"
                value="Registrar"
            />
        </form>
    );
};