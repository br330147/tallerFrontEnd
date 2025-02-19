import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { obtenerFechaGMT3 } from "../utilidades/formatearFecha";

const RegistroActividad = ({ registro, onEliminar }) => {
    return (
        <tr>
            <td>
                <img src={registro.imagen} alt={registro.actividad} width="50" />
            </td>
            <td>{registro.actividad}</td>
            <td>{registro.tiempo}</td>
            <td>{obtenerFechaGMT3(new Date(registro.fecha))}</td>
            <td>
                <Button variant="danger" onClick={() => onEliminar(registro.id)}>
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};

RegistroActividad.propTypes = {
    registro: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imagen: PropTypes.string.isRequired,
        actividad: PropTypes.string.isRequired,
        tiempo: PropTypes.number.isRequired,
        fecha: PropTypes.string.isRequired,
    }).isRequired,
    onEliminar: PropTypes.func.isRequired,
};

export default RegistroActividad;
