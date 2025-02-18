import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BotonLogout = () =>{

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
        <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
        </Button>
    )
}

export default BotonLogout;

