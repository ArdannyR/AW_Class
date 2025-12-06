import { create } from "zustand"
import axios from "axios"
import storeAuth from "./storeAuth"
import { toast } from "react-toastify"

const storeProfile = create((set) => ({
    
    user: null,
    error: null,

    // Limpiar usuario del estado
    clearUser: () => set({ user: null }),

    // Obtener datos del perfil
    profile: async () => {
        const token = storeAuth.getState().token
        if (!token) return

        try {
            // CORRECCIÓN: La ruta correcta según tu backend es /veterinario/perfil
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/perfil`
            
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }

            const respuesta = await axios.get(url, options)
            set({ user: respuesta.data })
        } catch (error) {
            console.error(error)
            set({ error: error.message })
        }
    },

    // Actualizar datos del perfil
    updateProfile: async (url, data) => {
        const token = storeAuth.getState().token
        if (!token) return

        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }

            const respuesta = await axios.put(url, data, options)
            
            // Actualizamos el usuario en el estado con la respuesta del backend
            set({ user: respuesta.data })
            
            toast.success("Perfil actualizado correctamente")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg || "Error al actualizar perfil")
        }
    },

    updatePasswordProfile:async(url,data)=>{
        try {
            const respuesta = await axios.put(url, data, getAuthHeaders())
            return respuesta
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg)
        }
    }

}))

export default storeProfile