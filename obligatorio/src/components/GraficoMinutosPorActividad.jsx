import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { Card } from "react-bootstrap";
import { calcularMinutosPorActividad } from "../utilidades/calcularEstadisticas";

const GraficoMinutosPorActividad = () => {
  const registros = useSelector((state) => state.registros.registros);

  const actividadEstadis = calcularMinutosPorActividad(registros);

  const datos = Object.keys(actividadEstadis).map((actividad) => ({
    name: actividad,
    value: actividadEstadis[actividad].minutos,
    sesiones: actividadEstadis[actividad].sesiones,
  }));

  const colores = [
    "#FF5733", "#33FF57", "#3357FF", "#F0A500", 
    "#A833FF", "#33FFF0", "#FF33A8", "#A8FF33"
  ];

  return (
    <Card className="mt-3 p-3 text-center">
      <h4>Minutos por Actividad</h4>
      {datos.length > 0 ? (
        <PieChart width={700} height={400}>
          <Pie
            data={datos}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value, sesiones }) => `${name}: ${value} min. (Sesiones: ${sesiones})`}
          >
            {datos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </Card>
  );
};

export default GraficoMinutosPorActividad;
