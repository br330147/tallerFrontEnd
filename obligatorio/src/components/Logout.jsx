import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BotonLogout = () =>{

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
        <Button className="btnCerrarSesion" variant="danger" onClick={handleLogout}>
            Cerrar sesión
        </Button>
    )
}

export default BotonLogout;

