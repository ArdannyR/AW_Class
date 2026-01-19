import Tratamiento from "../models/Tratamiento.js"
import Paciente from "../models/Paciente.js" 
import mongoose from "mongoose"
import { Stripe } from "stripe"

const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`)

const registrarTratamiento = async (req,res)=>{
    try {
        const {paciente} = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Debes llenar todos los campos"})
        if( !mongoose.Types.ObjectId.isValid(paciente)) return res.status(404).json({msg:`No existe el paciente ${paciente}`})
        
        // 1. Crear el tratamiento y guardar la referencia en una variable
        const tratamientoNuevo = await Tratamiento.create(req.body)

        // 2. Actualizar al paciente agregando el ID del tratamiento a su lista
        await Paciente.findByIdAndUpdate(paciente, {
            $push: { tratamientos: tratamientoNuevo._id }
        })

        res.status(201).json({msg:"Registro exitoso del tratamiento"})

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}

const eliminarTratamiento = async (req,res)=>{
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: `No existe el Tratamiento ${id}`})
        await Tratamiento.findByIdAndDelete(id)
        res.status(200).json({msg: "Tratamiento eliminado exitosamente"})
    } catch (error) {
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}

const pagarTratamiento = async (req, res) => {

    try {
        const { paymentMethodId, treatmentId, cantidad, motivo } = req.body
        const tratamiento = await Tratamiento.findById(treatmentId)
        if (tratamiento.estadoPago === "Pagado") return res.status(400).json({ message: "Este tratamiento ya fue pagado" })
        if (!paymentMethodId) return res.status(400).json({ message: "paymentMethodId no proporcionado" })
        const paciente = await Paciente.findById(tratamiento.paciente)
        const clienteStripe = await stripe.customers.create({name: paciente.nombrePropietario,email: paciente.emailPropietario})

        const payment = await stripe.paymentIntents.create({
            amount:cantidad,
            currency: "usd",
            description: motivo,
            payment_method: paymentMethodId,
            confirm: true,
            customer: clienteStripe.id,
            receipt_email: paciente.email,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            }
        })

        if (payment.status === "succeeded") {
            await Tratamiento.findByIdAndUpdate(treatmentId, { estadoPago: "Pagado" })
            return res.status(200).json({ msg: "El pago se realizó exitosamente" })
        }else{
            return res.status(400).json({ msg: `El pago no se completó ${payment.status}` })
        }
    } catch (error) {
        res.status(500).json({ msg: `❌ Error al intentar pagar el tratamiento - ${error}` })
    }
}


export{
    registrarTratamiento,
    eliminarTratamiento,
    pagarTratamiento
}