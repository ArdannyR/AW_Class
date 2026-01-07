import { create } from "zustand"
import axios from "axios"
import storeAuth from "./storeAuth"
import { toast } from "react-toastify"

const storeProfile = create((set) => ({
    
    user: null,
    error: null,

    clearUser: () => set({ user: null }),

    profile: async () => {
        const token = storeAuth.getState().token
        if (!token) return

        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            // Asegúrate de que storedUser y storedUser.state existan antes de acceder a rol
            if (!storedUser || !storedUser.state) return; 
            
            const endpoint = storedUser.state.rol === "veterinario"
                ? "veterinario/perfil"
                : "paciente/perfil"
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`
            
            // CORRECCIÓN: Definir las opciones con el token aquí directamente
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            
            // Usar 'options' en lugar de 'getAuthHeaders()'
            const respuesta = await axios.get(url, options)
            set({ user: respuesta.data })
        } catch (error) {
            console.error(error)
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

    updatePasswordProfile: async (url, data) => {
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
            return respuesta
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg)
        }
    }

}))

export default storeProfile