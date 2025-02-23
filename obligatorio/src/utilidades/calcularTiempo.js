import { obtenerFechaGMT3 } from "./formatearFecha";

export const calcularTiempoTotalDiarioYAyer = (registros) => {
    const hoy = new Date(obtenerFechaGMT3());
    const ayer = new Date(hoy); 
    ayer.setDate(hoy.getDate() - 1);

    // formato `YYYY-MM-DD`
    const obtenerFechaSinHora = (fecha) => fecha.toISOString().split("T")[0];
    const hoyFormato = obtenerFechaSinHora(hoy);
    const ayerFormato = obtenerFechaSinHora(ayer);
    const tiempoTotal = registros.reduce((total, registro) => total + Number(registro.tiempo), 0);

    const tiempoDiario = registros
        .filter(registro => registro.fecha === hoyFormato)
        .reduce((total, registro) => total + Number(registro.tiempo), 0);

    const tiempoAyer = registros
        .filter(registro => {
            return registro.fecha === ayerFormato;
        })
        .reduce((total, registro) => total + Number(registro.tiempo), 0);

    return { tiempoTotal, tiempoDiario, tiempoAyer};
};
  