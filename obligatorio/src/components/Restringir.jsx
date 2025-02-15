import { Navigate,Outlet } from "react-router-dom";

//outlet se usa especificamente para mostrar las rutas hijas dentro de otro route. En nuestro caso
//preguntamos si está autenticado verificando si está el token en local storage

//replace nos sirve para que el usuario no pueda hacer un back en la web y llegar a la ruta que queremos restingir

const Restringir = () =>{
    const token = localStorage.getItem("token")

    return token ? <Outlet/> : <Navigate to="/" replace /> 
}

export default Restringir

