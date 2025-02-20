import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActividad } from "../services/actividadesService";
import { setRegistros } from "../redux/features/sliceRegistros";
import { Form, Button, Alert } from "react-bootstrap";
import SelectActividades from "./SelectActividades";
import { obtenerFechaGMT3 } from "../utilidades/formatearFecha";

const FormularioRegistro = () => {
  const idUsuario = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const actividades = useSelector((state) => state.actividadesDisponibles.actividades);

  const dispatch = useDispatch();

  const [idActividad, setIdActividad] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const registros = useSelector((state) => state.registros.registros);

  const handleRegistro = async () => {
    if (!idActividad || !tiempo || !fecha) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if(tiempo<=0){
      setError("Debe ingresar un valor positivo");
      return;
    }
    
    const fechaSeleccionada = new Date(`${fecha}T00:00:00`); 
    const fechaActual = new Date();

    const fechaSeleccionadaNormalizada = new Date(
      fechaSeleccionada.getFullYear(),
      fechaSeleccionada.getMonth(),
      fechaSeleccionada.getDate()
    );
    const fechaActualNormalizada = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate()
    );

    if (fechaSeleccionadaNormalizada > fechaActualNormalizada) {
      setError("La fecha no puede ser futura.");
      return;
    }
  
    try {
      const nuevoEjercicioTemporal = {
        id: Math.floor(Math.random() * 100000000000), // id temporal para sumarlo a la lista
        usuarioId: idUsuario,
        actividadId: idActividad,
        tiempo,
        fecha,
      };
  
      //enviamos el registro y nos quedamos con el id real
      const respuestaAPI = await addActividad(idUsuario, idActividad, tiempo, fecha, token);
  
      if (!respuestaAPI.idRegistro) {
        throw new Error("ID inválido");
      }
  
      // Buscamos nombre e imagen 
      const actividadEncontrada = actividades.find(a => a.id === Number(idActividad)) || {};
  
      // Creamos el registro con el ID real de la API y los datos
      const nuevoEjercicioReal = {
        ...nuevoEjercicioTemporal,
        id: respuestaAPI.idRegistro, // cambiamos el id ficticio por el real
        actividad: actividadEncontrada.nombre || "Desconocida",
        imagen: actividadEncontrada.imagen ? `https://movetrack.develotion.com/imgs/${actividadEncontrada.imagen}.png` : "",
      };
  
      dispatch(setRegistros([...registros, nuevoEjercicioReal]));
  
      setExito("Ejercicio registrado correctamente.");
      setError(null);
    } catch (err) {
      setError(err.message);
      setExito(null);
    }
  };
  

  return (
    <Form className="mt-5 formRegistroActividad">
      {error && <Alert variant="danger">{error}</Alert>}
      {exito && <Alert variant="success">{exito}</Alert>}

      <SelectActividades idActividad={idActividad} setIdActividad={setIdActividad} />

      <Form.Group className="mb-3">
        <Form.Label>Tiempo (minutos)</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Ejemplo: 30"
          value={tiempo}
          min="1"
          onChange={(e) => {
            const valor = Number(e.target.value)
            if(valor>0 || e.target.value===""){
              setTiempo(e.target.value)
            }
          }
        }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fecha</Form.Label>
        <Form.Control 
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          max={obtenerFechaGMT3()}
        />
      </Form.Group>

      <Button  className="botonRegistro" variant="primary" onClick={handleRegistro}>
        Registrar Ejercicio
      </Button>
    </Form>
  );
};

export default FormularioRegistro;
