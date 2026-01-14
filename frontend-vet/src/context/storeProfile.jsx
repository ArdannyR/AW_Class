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
            if (!storedUser || !storedUser.state) return; 
            
            const endpoint = storedUser.state.rol === "veterinario" ? "veterinario/perfil" : "paciente/perfil"
            const url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`
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
        }
    },

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