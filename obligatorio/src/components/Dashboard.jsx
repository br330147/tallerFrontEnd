import FormularioRegistro from "./AgregarActividad";
import ListaRegistrosActividad from "./ListaRegistrosActividad";
import BotonLogout from "./Logout";
import InformeTiempoTotal from "./InformeTiempoTotal"
import InformeTiempoDiario from "./InformeTiempoDiario";
import GraficoMinutosPorActividad from "./GraficoMinutosPorActividad";
import GraficoMinutosUltimosSieteDias from "./GraficoMinutosUltimosSieteDias";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerActividades } from "../services/cargaActividadesService";
import { setActividades } from "../redux/features/sliceActividadesDisponibles";
import { Container, Row, Col } from "react-bootstrap";
import { obtenerRegistrosActividad } from "../services/registrosActividadService";
import { setRegistros } from "../redux/features/sliceRegistros";
import '../estilos/estilos.css'
import Pagination from 'react-bootstrap/Pagination';

const Dashboard = () => {
  const usuario = localStorage.getItem("usuario")
  const idUsuario = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const registros = useSelector((state) => state.registros.registros)
  const actividades = useSelector((state) => state.actividadesDisponibles.actividades);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(registros.length / 5); // Suponiendo 5 registros por página

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
          <FormularioRegistro />
        </Col>

        <Col lg={6} md={12} className="cuadranteListaRegistros">
          <ListaRegistrosActividad registros={registros.slice((currentPage - 1) * 6, currentPage * 6)} />

          <Pagination className="mt-3 justify-content-center">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
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