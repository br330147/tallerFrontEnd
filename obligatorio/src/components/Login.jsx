import { useState } from "react";
import { loginUser } from "../services/loginService.js";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../estilos/estilos.css";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const Login = () => {
  const [usuario, setUsuarioInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usuario || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const datosUsuario = await loginUser(usuario, password);

      localStorage.setItem("usuario", usuario);
      localStorage.setItem("token", datosUsuario.apiKey);
      localStorage.setItem("id", datosUsuario.id);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="login">
          <h2 className="text-center mb-4">Iniciar sesión</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3" controlId="formUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuarioInput(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleLogin}
              className="w-100 botonLogin"
              disabled={!usuario.trim() || !password.trim()}
            >
              Ingresar
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
