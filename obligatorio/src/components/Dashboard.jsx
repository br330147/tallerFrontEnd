import FormularioRegistro from "./AgregarActividad";
import ListaRegistrosActividad from "./ListaRegistrosActividad";
import BotonLogout from "./Logout";
import InformeTiempoTotal from "./InformeTiempoTotal"
import InformeTiempoDiario from "./InformeTiempoDiario";
import GraficoMinutosPorActividad from "./GraficoMinutosPorActividad";
import GraficoMinutosUltimosSieteDias from "./GraficoMinutosUltimosSieteDias";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerActividades } from "../services/cargaActividadesService";
import { setActividades } from "../redux/features/sliceActividadesDisponibles";

import { Container, Row, Col } from "react-bootstrap";



const Dashboard = () => {
  const usuario = useSelector((state) => state.usuario.usuario);
  const idUsuario = useSelector((state) => state.usuario.id);
  const token = useSelector((state) => state.usuario.token);
  const actividades = useSelector((state) => state.actividadesDisponibles.actividades);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActividades = async () => {
      console.log("Obteniendo actividades para usuario:", idUsuario);
      try {
        const actividades = await obtenerActividades(idUsuario, token);
        console.log("Actividades obtenidas en Dashboard:", actividades);
        dispatch(setActividades(actividades));
      } catch (error) {
        console.error("Error obteniendo actividades:", error);
      }
    };

    if (idUsuario && token && actividades.length === 0) {
      fetchActividades();
    }
  }, [dispatch, idUsuario, token, actividades.length]);

  return (
    <Container fluid className="mt-4">
      <Row className="mb-3">
        <Col className="text-end">
          <BotonLogout />
        </Col>
      </Row>

      <h2 className="text-center mb-4">Bienvenido, {usuario} - ID: {idUsuario}</h2>

      <Row className="g-4">
        <Col lg={6} md={12}>
          <FormularioRegistro />
          <Row className="mt-3 d-flex align-items-stretch">
            <Col md={6} xs={12} className="d-flex">
              <InformeTiempoTotal />
            </Col>
            <Col md={6} xs={12} className="d-flex">
              <InformeTiempoDiario />
            </Col>
          </Row>
        </Col>

        <Col lg={6} md={12}>
          <GraficoMinutosPorActividad />
        </Col>

        <Col lg={6} md={12}>
          <ListaRegistrosActividad />
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