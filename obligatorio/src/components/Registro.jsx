import { useState, useEffect } from "react";
import { registroUser } from "../services/registroService";
import { getPaises } from "../services/paisesService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Modal } from "react-bootstrap";
import '../estilos/estilos.css';

const Registro = () => {
  const [usuario, setUsuarioInput] = useState("");
  const [password, setPassword] = useState("");
  const [paises, setPaises] = useState([]);
  const [idPais, setIdPais] = useState(""); 
  const [error, setError] = useState(null);
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPaises = async () => {
      try {
        const paisesData = await getPaises();
        setPaises(paisesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPaises(false);
      }
    };

    cargarPaises();
  }, []);

  const handleRegistro = async () => {
    if (!usuario || !password || !idPais) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const datosUsuario = await registroUser(usuario, password, idPais);

      localStorage.setItem("usuario", usuario);
      localStorage.setItem("token", datosUsuario.apiKey);
      localStorage.setItem("id", datosUsuario.id);

      setShowModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRedirigir = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="registro">
          <h2 className="text-center mb-4">Registrarse</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3" controlId="formUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese un usuario" 
                value={usuario} 
                onChange={(e) => setUsuarioInput(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Ingrese una contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPais">
              <Form.Label>Selecciona un país</Form.Label>
              {loadingPaises ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Form.Select 
                  value={idPais} 
                  onChange={(e) => setIdPais(e.target.value)}
                >
                  <option value="">Selecciona un país</option>
                  {paises.map((pais) => (
                    <option key={pais.id} value={pais.id}>
                      {pais.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>
            <Button variant="success" onClick={handleRegistro} className="w-100 botonRegistro" disabled={!usuario.trim() || !password.trim() || !idPais}>
              Registrarse
            </Button>
          </Form>

          <p className="mt-3 text-center">
            ¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
          </p>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleRedirigir} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Bienvenido a MoveTrack, {usuario}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>En esta web podrás:</p>
          <ul>
            <li>🏃‍♂️ Registrar tus actividades físicas.</li>
            <li>📊 Ver estadísticas sobre tu rendimiento.</li>
            <li>🔥 Desafiarte a mejorar cada día.</li>
          </ul>
          <p>¡Esperamos que disfrutes la experiencia!</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="success" onClick={handleRedirigir}>
            ¡Vamos a eso!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Registro;
