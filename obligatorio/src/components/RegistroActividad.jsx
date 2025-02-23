import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Toast, ToastContainer } from "react-bootstrap";

const RegistroActividad = ({ registro, onEliminar }) => {
  // Estados para manejar el modal y el toast
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);

  // Función para cerrar el modal
  const handleClose = () => setShowModal(false);

  const handleConfirmarEliminar = () => {
    try {
      onEliminar(registro.id); // Llamamos a la función para eliminar la actividad
      setExito("Actividad eliminada con éxito");
      setError(false);
      setShowToast(true);
      setShowModal(false); // Cerramos el modal
    } catch {
      setError("Hubo un error al eliminar la actividad");
      setExito(false);
      setShowToast(true); // Mostramos el toast de error
    }
  };

  return (
    <>
      <tr>
        <td>
          <img src={registro.imagen} alt={registro.actividad} width="50" />
        </td>
        <td>{registro.actividad}</td>
        <td>{registro.tiempo}</td>
        <td>{registro.fecha}</td>
        <td>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Eliminar
          </Button>
        </td>
      </tr>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que quieres eliminar esta actividad?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast de confirmació*/}
      <ToastContainer
        style={{
          position: "fixed",
          top: "1px",
          left: "0px",
          boxShadow: "5px 5px 5px",
          zIndex: 1050,
        }}
      >
        {showToast && (
          <Toast
            bg={error ? "white" : "white"}
            onClose={() => setShowToast(false)}
            delay={5000}
            autohide
          >
            <Toast.Body
              style={{
                color: error ? "red" : "green", //rojo error, verde éxito
              }}
            >
              {error || exito}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </>
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
