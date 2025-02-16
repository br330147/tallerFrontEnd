import { Card } from "react-bootstrap";
import PropTypes from "prop-types"

const EvolucionPersonal = ({ tiempoDiario, tiempoAyer }) => {
  let mensaje = "¡Vamo' Arriba!"; // por defecto

  if (tiempoDiario > tiempoAyer) {
    mensaje = "¡Bien hecho!";
  } else if (tiempoDiario < tiempoAyer) {
    mensaje = "¡Que no decaiga!";
  }

  return (
    <Card className="mt-2 p-2 text-center">
      <p className="fw-bold">{mensaje}</p>
    </Card>
  );
};

EvolucionPersonal.propTypes = {
    tiempoDiario: PropTypes.number.isRequired,
    tiempoAyer: PropTypes.number.isRequired,
  };

export default EvolucionPersonal;
