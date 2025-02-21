import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { calcularTiempoTotalDiarioYAyer } from "../utilidades/calcularTiempo";

const InformeTiempoTotal = () => {
  const registros = useSelector((state) => state.registros.registros);
  const { tiempoTotal } = calcularTiempoTotalDiarioYAyer(registros);
  const { tiempoAyer } = calcularTiempoTotalDiarioYAyer(registros);

  return (
    <Card className="p-3 text-center justify-content-center h-100 tiempoTotalRegistrado">
      <h4>Tiempo total registrado</h4>
      <p className="fw-bold minTotalRegistrado">{tiempoTotal} minutos</p>
      <p>
        <p className="ayer">Ayer:</p> <p className="minutosAyer">{tiempoAyer} minutos</p>
      </p>
    </Card>
  );
};

export default InformeTiempoTotal;
