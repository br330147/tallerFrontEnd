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
    "#76d7c4", "#138d75", "#f1c40f", "#e59866", 
    "#d35400", "#a93226", "#76448a", "#2471a3"
  ];

  return (
    <Card className="p-3 mb-5 justify-content-center align-items-center cuadranteMinutosPorActividad">
      <h4>Minutos totales por actividad</h4>
      {datos.length > 0 ? (
        <PieChart width={900} height={400}>
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
