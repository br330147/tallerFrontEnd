import { Container } from "react-bootstrap";
import "../estilos/estilos.css";

const Footer = () => {
  return (
    <footer className="footer py-3 text-center">
      <Container>
        <p className="mb-0">
          Desarrollado por <strong>Alan Martínez - 294134</strong> & <strong>Benjamin Rodriguez - 330147</strong> © {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
