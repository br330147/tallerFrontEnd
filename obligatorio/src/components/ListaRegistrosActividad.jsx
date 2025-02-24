import { useState } from "react";
import { useDispatch } from "react-redux";
import { eliminarRegistroActividad } from "../services/registrosActividadService";
import { eliminarRegistroRedux } from "../redux/features/sliceRegistros";
import { Container, Table, Form, Toast, ToastContainer } from "react-bootstrap";
import RegistroActividad from "./RegistroActividad";
import PropTypes from "prop-types";
import "../estilos/estilos.css";

const ListaRegistrosActividad = ({ registros }) => {
  const idUsuario = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [filtro, setFiltro] = useState("todos");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  const handleEliminar = async (idRegistro) => {
    try {
      await eliminarRegistroActividad(idRegistro, idUsuario, token);
      dispatch(eliminarRegistroRedux(idRegistro));

      setToastMessage("Actividad eliminada con éxito");
      setToastError(false);
      setShowToast(true);
    } catch {
      setToastMessage("Error al eliminar la actividad");
      setToastError(true);
      setShowToast(true);
    }
  };

  const filtrarRegistros = (registros) => {
    const hoy = new Date();
    return registros.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha);
      if (filtro === "semana") {
        return (hoy - fechaRegistro) / (1000 * 60 * 60 * 24) <= 7;
      } else if (filtro === "mes") {
        return (hoy - fechaRegistro) / (1000 * 60 * 60 * 24) <= 30;
      }
      return true;
    });
  };

  const registrosFiltrados = filtrarRegistros(registros);

  return (
    <Container>
      <h3 className="titleRegistroAct text-center mb-3">
        Registros de Actividades
      </h3>
      <Form.Select onChange={(e) => setFiltro(e.target.value)}>
        <option value="todos">Todos</option>
        <option value="semana">Última Semana</option>
        <option value="mes">Último Mes</option>
      </Form.Select>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Actividad</th>
            <th>Tiempo (min)</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registrosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                <strong>No hay registro de actividades ¡Registra una!</strong>
              </td>
            </tr>
          ) : (
            registrosFiltrados.map((registro) => (
              <RegistroActividad
                key={registro.id}
                registro={registro}
                onEliminar={handleEliminar}
              />
            ))
          )}
        </tbody>
      </Table>

      <ToastContainer
        position="top-start"
        style={{ zIndex: 1050 }}
      >
        <Toast
          bg={toastError ? "danger" : "success"}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          show={showToast}
        >
          <Toast.Body style={{ color: "white" }}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

ListaRegistrosActividad.propTypes = {
  registros: PropTypes.array,
};

export default ListaRegistrosActividad;