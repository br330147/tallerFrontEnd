import { obtenerFechaGMT3 } from "./formatearFecha";

export const calcularTiempoTotalDiarioYAyer = (registros) => {

    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);
  
    const hoyFormato = obtenerFechaGMT3(new Date(hoy.toISOString().split("T")[0])); // para el formato yyyy-mm-dd
    const ayerFormato = obtenerFechaGMT3(new Date(ayer.toISOString().split("T")[0])); 
  
    const tiempoTotal = registros.reduce((total, registro) => total + Number(registro.tiempo), 0);
  
    const tiempoDiario = registros
      .filter(registro => registro.fecha === hoyFormato)
      .reduce((total, registro) => total + Number(registro.tiempo), 0);
  
    const tiempoAyer = registros
      .filter(registro => registro.fecha === ayerFormato)
      .reduce((total, registro) => total + Number(registro.tiempo), 0);
  
    return { tiempoTotal, tiempoDiario, tiempoAyer };
  };
  