import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import { Card, Table } from "react-bootstrap";
import { calcularMinutosPorActividad } from "../utilidades/calcularEstadisticas";
import "../estilos/estilos.css";

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
        <>
          <div style={{ width: "100%", height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datos}
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <Table striped bordered hover className="mt-3 text-center">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Minutos</th>
                <th>Sesiones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((actividad, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "bold", color: colores[index % colores.length] }}>
                    {actividad.name}
                  </td>
                  <td>{actividad.value} min</td>
                  <td>{actividad.sesiones}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </Card>
  );
};

export default GraficoMinutosPorActividad;
