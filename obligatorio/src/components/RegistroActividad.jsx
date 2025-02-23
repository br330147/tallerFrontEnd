import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const RegistroActividad = ({ registro, onEliminar }) => {
  // Estados para manejar el modal y el toast
  const [showModal, setShowModal] = useState(false);

  // Función para cerrar el modal
  const handleClose = () => setShowModal(false);

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
          <Button variant="danger" onClick={() => { 
            onEliminar(registro.id);
            setShowModal(false);
          }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
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
