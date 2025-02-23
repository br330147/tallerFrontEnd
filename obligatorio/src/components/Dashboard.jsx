import FormularioRegistro from "./AgregarActividad";
import ListaRegistrosActividad from "./ListaRegistrosActividad";
import BotonLogout from "./Logout";
import InformeTiempoTotal from "./InformeTiempoTotal";
import InformeTiempoDiario from "./InformeTiempoDiario";
import GraficoMinutosPorActividad from "./GraficoMinutosPorActividad";
import GraficoMinutosUltimosSieteDias from "./GraficoMinutosUltimosSieteDias";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerActividades } from "../services/cargaActividadesService";
import { setActividades } from "../redux/features/sliceActividadesDisponibles";
import { Container, Row, Col } from "react-bootstrap";
import { obtenerRegistrosActividad } from "../services/registrosActividadService";
import { setRegistros } from "../redux/features/sliceRegistros";
import "../estilos/estilos.css";
import Pagination from "react-bootstrap/Pagination";
import Loader from "./Loader";
import Footer from "./Footer";

const Dashboard = () => {
  const usuario = localStorage.getItem("usuario");
  const idUsuario = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const registros = useSelector((state) => state.registros.registros);
  const dispatch = useDispatch();

  const [cargando, setCargando] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState("todos");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const actividadesObtenidas = await obtenerActividades(idUsuario, token);
        dispatch(setActividades(actividadesObtenidas));

        const registrosObtenidos = await obtenerRegistrosActividad(idUsuario, token, actividadesObtenidas);
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

  // Función para filtrar registros antes de paginarr
  const filtrarRegistros = (registros) => {
    const hoy = new Date();
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

  const registrosFiltrados = filtrarRegistros(registros);
  const totalPages = Math.ceil(registrosFiltrados.length / 6);
  const registrosPaginados = registrosFiltrados.slice((currentPage - 1) * 6, currentPage * 6);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
  {/* 🔥 Primer Cuadrante */}
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

  {/* 🔥 Segundo Cuadrante */}
  <Col lg={5} md={12} className="cuadrante cuadranteListaRegistros m-3">
    <ListaRegistrosActividad registros={registrosPaginados} setFiltro={setFiltro} />

    <Pagination className="mt-3 justify-content-center">
      <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  </Col>
</Row>

<Row className="g-4 justify-content-center">
  {/* 🔥 Tercer Cuadrante */}
  <Col lg={5} md={12} className="cuadrante m-3">
    <GraficoMinutosPorActividad />
  </Col>

  {/* 🔥 Cuarto Cuadrante */}
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
