export const calcularMinutosPorActividad = (registros) => {
    return registros.reduce((acc, registro) => {
      const actividad = registro.actividad || "Desconocida";
      if (!acc[actividad]) {
        acc[actividad] = { minutos: 0, sesiones: 0 };
      }
      acc[actividad].minutos += Number(registro.tiempo);
      acc[actividad].sesiones += 1;
      return acc;
    }, {});
  };
  
export const calcularMinutosUltimosSieteDias = (registros) => {
  const hoy = new Date();
  const ultimosSieteDias = [];

  for (let i = 6; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() - i);
    const formatoFecha = fecha.toISOString().split("T")[0];
    ultimosSieteDias.push({ fecha: formatoFecha, minutos: 0 });
  }
  
  registros.forEach((registro) => {
    const dia = ultimosSieteDias.find(d => d.fecha === registro.fecha);
    if (dia) {
      dia.minutos += Number(registro.tiempo);
    }
  });

  return ultimosSieteDias;
};
    