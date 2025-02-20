import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { calcularTiempoTotalDiarioYAyer } from "../utilidades/calcularTiempo";

const InformeTiempoTotal = () => {
  const registros = useSelector((state) => state.registros.registros); 
  const { tiempoTotal } = calcularTiempoTotalDiarioYAyer(registros);

  return (
    <Card className="p-3 text-center  justify-content-center h-100">
      <h4>Tiempo Total Registrado</h4>
      <p className="fw-bold">{tiempoTotal} minutos</p>
    </Card>
  );
};

export default InformeTiempoTotal;


