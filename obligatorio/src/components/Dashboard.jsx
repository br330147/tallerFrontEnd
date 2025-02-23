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

const Dashboard = () => {
  const usuario = localStorage.getItem("usuario");
  const idUsuario = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const registros = useSelector((state) => state.registros.registros);
  const actividades = useSelector(
    (state) => state.actividadesDisponibles.actividades
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const actividadesObtenidas = await obtenerActividades(idUsuario, token);
        dispatch(setActividades(actividadesObtenidas));
      } catch (error) {
        console.error("Error obteniendo actividades:", error);
      }
    };

    if (idUsuario && token && actividades.length === 0) {
      fetchActividades();
    }
  }, [dispatch, idUsuario, token, actividades.length]);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const registrosObtenidos = await obtenerRegistrosActividad(
          idUsuario,
          token,
          actividades
        );
        dispatch(setRegistros(registrosObtenidos));
      } catch (error) {
        console.error("Error cargando:", error);
      }
    };

    if (idUsuario && token && actividades.length > 0) {
      fetchRegistros();
    }
  }, [dispatch, idUsuario, token, actividades]);

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
    <Container fluid className="dashboard">
      <Row className="mb-3">
        <Col className="text-center pt-4">
          <BotonLogout />
        </Col>
      </Row>
  
      <h2 className="text-center mb-4 tituloDash">
        Bienvenido {usuario} - ID: {idUsuario}
      </h2>
  
      <Row className="g-4 justify-content-center"> {/* Asegura que los elementos estén centrados */}
        <Col lg={5} md={12} className="primerCuadrante mx-5"> {/* Añade mx-3 para margen lateral */}
          <Row className="m-auto d-flex mt-2">
            <Col md={6} xs={12} className="d-flex">
              <InformeTiempoTotal />
            </Col>
            <Col md={6} xs={12} className="d-flex">
              <InformeTiempoDiario />
            </Col>
          </Row>
          <FormularioRegistro />
        </Col>
  
        <Col lg={5} md={12} className="cuadranteListaRegistros mx-3"> {/* Añade mx-3 para margen lateral */}
          {/* Pasamos el filtro al componente y usamos los registros paginados */}
          <ListaRegistrosActividad 
            registros={registrosPaginados} 
            setFiltro={setFiltro}
          />
  
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
        <Col lg={5} md={12} className="d-flex justify-content-center mx-3">
          <GraficoMinutosPorActividad />
        </Col>
  
        <Col lg={5} md={12} className="d-flex justify-content-center mx-3">
          <GraficoMinutosUltimosSieteDias />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
