import { useState } from "react";
import { loginUser } from "../services/loginService.js";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
    const [usuario, setUsuarioInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!usuario || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const datosUsuario = await loginUser(usuario, password);

            localStorage.setItem("usuario", usuario)
            localStorage.setItem("token", datosUsuario.apiKey)
            localStorage.setItem("id", datosUsuario.id)

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

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
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleLogin} className="w-100" disabled={!usuario.trim() || !password.trim()}>
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
