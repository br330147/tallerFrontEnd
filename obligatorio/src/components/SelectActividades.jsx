import PropTypes from "prop-types"; // usamos cuando un componente recibe props de otro y para documentacion
import { useSelector } from "react-redux";
import { Form, Spinner } from "react-bootstrap";


const SelectActividades = ({ idActividad, setIdActividad }) => {
  const actividades = useSelector((state) => state.actividadesDisponibles.actividades);
  
  return (
    <Form.Group className="mb-3">
      <Form.Label>Actividad</Form.Label>
      {actividades.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Form.Select 
          value={idActividad} 
          onChange={(e) => setIdActividad(e.target.value)}
        >
          <option value="">Selecciona una actividad</option>
          {actividades.map((actividad) => (
            <option key={actividad.id} value={actividad.id}>
              {actividad.nombre}
            </option>
          ))}
        </Form.Select>
      )}
    </Form.Group>
  );
};

//gregamos `PropTypes` para validar las `props`
SelectActividades.propTypes = {
  idActividad: PropTypes.string.isRequired, 
  setIdActividad: PropTypes.func.isRequired, 
};

export default SelectActividades;
