import storeAuth from "../context/storeAuth"


const PrivateRoutesWithRole = ({children}) => {
    const {rol} = storeAuth
    return ("paciente" === rol) ? <Forbidden/> : children
}

export default PrivateRoutesWithRole