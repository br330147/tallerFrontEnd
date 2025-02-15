import { useDispatch } from "react-redux";
import { logout } from "../redux/features/sliceUsuarios.js";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BotonLogout = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return(
        <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
        </Button>
    )
}

export default BotonLogout;

