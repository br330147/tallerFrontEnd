export const obtenerFechaGMT3 = (fecha = new Date()) => {
    const opciones = { timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("fr-CA", opciones).format(fecha);
  };