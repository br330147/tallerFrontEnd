import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { eliminarRegistroActividad } from "../services/registrosActividadService";
import { eliminarRegistroRedux } from "../redux/features/sliceRegistros";
import { Container, Table, Form, Toast, ToastContainer, Pagination } from "react-bootstrap";
import RegistroActividad from "./RegistroActividad";
import PropTypes from "prop-types";
import "../estilos/estilos.css";
import { obtenerFechaGMT3 } from "../utilidades/formatearFecha";

const ListaRegistrosActividad = ({ registros }) => {
  const idUsuario = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [filtro, setFiltro] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const filtrarRegistros = () => {
    const hoy = new Date(obtenerFechaGMT3());
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

  const registrosFiltrados = filtrarRegistros();

  const totalPages = Math.ceil(registrosFiltrados.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const registrosPaginados = registrosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <h3 className="titleRegistroAct text-center mb-3">Registros de Actividades</h3>
      <Form.Select value={filtro} onChange={(e) => {
        setFiltro(e.target.value);
        setCurrentPage(1);
      }}>
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
          {registrosPaginados.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                <strong>No hay registro de actividades ¡Registra una!</strong>
              </td>
            </tr>
          ) : (
            registrosPaginados.map((registro) => (
              <RegistroActividad key={registro.id} registro={registro} onEliminar={handleEliminar} />
            ))
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-3 justify-content-center">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}

      <ToastContainer
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
          width: "auto"
        }}
      >
        <Toast bg={toastError ? "danger" : "success"} onClose={() => setShowToast(false)} delay={5000} autohide show={showToast}>
          <Toast.Body style={{ color: "white" }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

ListaRegistrosActividad.propTypes = {
  registros: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imagen: PropTypes.string.isRequired,
      actividad: PropTypes.string.isRequired,
      tiempo: PropTypes.number.isRequired,
      fecha: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListaRegistrosActividad;
