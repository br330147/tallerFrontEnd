// import { useState } from "react";
// import { useDispatch,} from "react-redux";
// import { eliminarRegistroActividad } from "../services/registrosActividadService";
// import { eliminarRegistroRedux } from "../redux/features/sliceRegistros";
import { Container, Table, Form } from "react-bootstrap";
import RegistroActividad from "./RegistroActividad"; 
import PropTypes from "prop-types";

const ListaRegistrosActividad = ({ registros, setFiltro }) => {
  return (
    <Container>
      <h3 className="text-center mt-3 mb-3 titleRegistroAct">Registros de actividades</h3>
      <Form.Select onChange={(e) => setFiltro(e.target.value)}>
        <option value="todos">Todas las actividades</option>
        <option value="mes">Último mes</option>
        <option value="semana">Última semana</option>
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
          {registros.map((registro) => (
            <RegistroActividad key={registro.id} registro={registro} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

ListaRegistrosActividad.propTypes = {
  registros: PropTypes.array.isRequired,
  setFiltro: PropTypes.func.isRequired
};

export default ListaRegistrosActividad;