import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { calcularTiempoTotalDiarioYAyer } from "../utilidades/calcularTiempo";
import EvolucionPersonal from "./EvolucionPersonal";

const InformeTiempoDiario = () => {
  const registros = useSelector((state) => state.registros.registros);
  const { tiempoDiario, tiempoAyer } = calcularTiempoTotalDiarioYAyer(registros);

  return (
    <Card className="p-3 text-center h-100">
      <h4>Tiempo Registrado Hoy</h4>
      <p className="fw-bold">{tiempoDiario} minutos</p>
      <p><strong>Ayer:</strong> {tiempoAyer} minutos</p>
      <EvolucionPersonal tiempoDiario={tiempoDiario} tiempoAyer={tiempoAyer} />
    </Card>
  );
};

export default InformeTiempoDiario;

