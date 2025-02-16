import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";
import { calcularMinutosUltimosSieteDias } from "../utilidades/calcularEstadisticas";

const GraficoMinutosUltimosSieteDias = () => {
  const registros = useSelector((state) => state.registros.registros);

  const datos = calcularMinutosUltimosSieteDias(registros);

  return (
    <Card className="mt-3 p-3 text-center">
      <h4>Minutos por Día (Últimos 7 días)</h4>
      {datos.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datos}>
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutos" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </Card>
  );
};

export default GraficoMinutosUltimosSieteDias;
