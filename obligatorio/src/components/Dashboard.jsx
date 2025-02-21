import FormularioRegistro from "./AgregarActividad";
import ListaRegistrosActividad from "./ListaRegistrosActividad";
import BotonLogout from "./Logout";
import InformeTiempoTotal from "./InformeTiempoTotal"
import InformeTiempoDiario from "./InformeTiempoDiario";
import GraficoMinutosPorActividad from "./GraficoMinutosPorActividad";
import GraficoMinutosUltimosSieteDias from "./GraficoMinutosUltimosSieteDias";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerActividades } from "../services/cargaActividadesService";
import { setActividades } from "../redux/features/sliceActividadesDisponibles";
import { Container, Row, Col } from "react-bootstrap";
import { obtenerRegistrosActividad } from "../services/registrosActividadService";
import { setRegistros } from "../redux/features/sliceRegistros";
import '../estilos/estilos.css'


const Dashboard = () => {
  const usuario = localStorage.getItem("usuario")
  const idUsuario = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const registros = useSelector((state) => state.registros.registros)
  const actividades = useSelector((state) => state.actividadesDisponibles.actividades);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActividades = async () => {
      // console.log("obtenemos act para el usuario usuario:", idUsuario);
      try {
        const actividadesObtenidas = await obtenerActividades(idUsuario, token);
        // console.log("actividades obtenidas:", actividades);
        dispatch(setActividades(actividadesObtenidas));
      } catch (error) {
        console.error("Error obteniendo actividades:", error);
      }
    };

    const fetchRegistros = async () =>{
      if(actividades.length>0){
        try{
          const registrosObtenidos = await obtenerRegistrosActividad(idUsuario,token,actividades)
          dispatch(setRegistros(registrosObtenidos));
        }catch(error){
          console.error("Error cargando:",error)
        }
      }
    }

    if (idUsuario && token && actividades.length === 0) {
      fetchActividades();
    }

    if(idUsuario && token){
      fetchRegistros();
    }
  }, [dispatch, idUsuario, token, actividades]);

  return (
    <Container fluid className="dashboard">
      <Row className="mb-3">
        <Col className="text-center pt-4">
          <BotonLogout />
        </Col>
      </Row>
      <h2 className="text-center mb-4 tituloDash">Bienvenido {usuario} - ID: {idUsuario}</h2>
      <Row className="g-4">
        <Col lg={6} md={12} className="primerCuadrante">
          <Row className="m-auto d-flex">
            <Col md={6} xs={12} className="d-flex">
              <InformeTiempoTotal />
            </Col>
            <Col md={6} xs={12} className="d-flex">
              <InformeTiempoDiario />
            </Col>
          </Row>
          <FormularioRegistro/>
        </Col>

        <Col lg={6} md={12}>
          <ListaRegistrosActividad registros={registros}/>
        </Col>

        <Col lg={6} md={12} className="d-flex">
          <GraficoMinutosPorActividad />
        </Col>

        <Col lg={6} md={12}>
          <Row>
            <Col md={12}>
              <GraficoMinutosUltimosSieteDias />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;