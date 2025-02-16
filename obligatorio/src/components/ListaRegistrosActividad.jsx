import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerRegistrosActividad, eliminarRegistroActividad } from "../services/registrosActividadService";
import { setRegistros, eliminarRegistroRedux } from "../redux/features/sliceRegistros";
import { Container, Table, Form } from "react-bootstrap";
import RegistroActividad from "./RegistroActividad"; 

const ListaRegistrosActividad = () => {
  const idUsuario = useSelector((state) => state.usuario.id);
  const token = useSelector((state) => state.usuario.token);
  const actividades = useSelector((state) => state.actividadesDisponibles.actividades)
  const registros = useSelector((state) => state.registros.registros);
  const dispatch = useDispatch();
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    if (idUsuario && token && actividades.length > 0) {
      console.log("Obteniendo registros para usuario:", idUsuario, "con API Key:", token);
      obtenerRegistrosActividad(idUsuario, token, actividades)
        .then((data) => {
          console.log("Registros obtenidos con actividades:", data);
          dispatch(setRegistros(data));
        })
        .catch((error) => console.error("Error cargando registros:", error));
    }
  }, [dispatch, idUsuario, token, actividades]);

  const handleEliminar = async (idRegistro) => {
    try {
      await eliminarRegistroActividad(idRegistro, idUsuario, token);
      dispatch(eliminarRegistroRedux(idRegistro));
    } catch (error) {
      console.error("Error eliminando registro:", error);
    }
  };

  const filtrarRegistros = (registros) => {
    const hoy = new Date();
    return registros.filter(registro => {
      const fechaRegistro = new Date(registro.fecha);
      if (filtro === "semana") {
        return (hoy - fechaRegistro) / (1000 * 60 * 60 * 24) <= 7;
      } else if (filtro === "mes") {
        return (hoy - fechaRegistro) / (1000 * 60 * 60 * 24) <= 30;
      }
      return true;
    });
  };

  return (
    <Container>
      <h3>Registros de Actividades</h3>
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
          {filtrarRegistros(registros).map((registro) => (
            <RegistroActividad
              key={registro.id}
              registro={registro}
              onEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaRegistrosActividad;
