import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerActividades } from "../services/cargaActividadesService";
import { obtenerRegistrosActividad } from "../services/registrosActividadService";
import { setActividades } from "../redux/features/sliceActividadesDisponibles";
import { setRegistros } from "../redux/features/sliceRegistros";
import { Container, Row, Col } from "react-bootstrap";
import FormularioRegistro from "./AgregarActividad";
import ListaRegistrosActividad from "./ListaRegistrosActividad";
import BotonLogout from "./Logout";
import InformeTiempoTotal from "./InformeTiempoTotal";
import InformeTiempoDiario from "./InformeTiempoDiario";
import GraficoMinutosPorActividad from "./GraficoMinutosPorActividad";
import GraficoMinutosUltimosSieteDias from "./GraficoMinutosUltimosSieteDias";
import Loader from "./Loader";
import Footer from "./Footer";
import "../estilos/estilos.css";

const Dashboard = () => {
  const usuario = localStorage.getItem("usuario");
  const idUsuario = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const registros = useSelector((state) => state.registros.registros);
  const dispatch = useDispatch();

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actividadesObtenidas = await obtenerActividades(idUsuario, token);
        dispatch(setActividades(actividadesObtenidas));

        const registrosObtenidos = await obtenerRegistrosActividad(
          idUsuario,
          token,
          actividadesObtenidas
        );
        dispatch(setRegistros(registrosObtenidos));
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setTimeout(() => setCargando(false), 1500);
      }
    };

    fetchData();
  }, [dispatch, idUsuario, token]);

  if (cargando) {
    return <Loader />;
  }

  return (
    <>
      <Container fluid className="dashboard">
        <Row className="mb-3">
          <Col className="text-center pt-4">
            <BotonLogout />
          </Col>
        </Row>

        <h2 className="text-center mb-4 tituloDash">
          Bienvenido {usuario} - ID: {idUsuario}
        </h2>

        <Row className="g-4 justify-content-center">
          <Col lg={5} md={12} className="cuadrante primerCuadrante m-3">
            <Row className="m-auto d-flex">
              <Col md={6} xs={12} className="d-flex">
                <InformeTiempoTotal />
              </Col>
              <Col md={6} xs={12} className="d-flex">
                <InformeTiempoDiario />
              </Col>
            </Row>
            <FormularioRegistro />
          </Col>

          <Col lg={5} md={12} className="cuadrante cuadranteListaRegistros m-3">
            <ListaRegistrosActividad registros={registros} />
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          <Col lg={5} md={12} className="cuadrante m-3">
            <GraficoMinutosPorActividad />
          </Col>

          <Col lg={5} md={12} className="cuadrante m-3 align-items-flex-start">
            <GraficoMinutosUltimosSieteDias />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
