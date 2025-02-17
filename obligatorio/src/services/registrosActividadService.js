const API_URL = "https://movetrack.develotion.com/";
const IMG_URL = "https://movetrack.develotion.com/imgs/";

const formatearRegistroConActividad = (registro, actividades) => {

  const actividadEncontrada = actividades.find(a => a.id === Number(registro.idActividad)) || {};
  
  return {
    ...registro,
    actividad: actividadEncontrada.nombre || "Desconocida",
    imagen: actividadEncontrada.imagen ? `${IMG_URL}${actividadEncontrada.imagen}.png` : "",
  };
};


export const obtenerRegistrosActividad = async (idUsuario, token, actividades) => {
  const myHeaders = {
    "Content-Type": "application/json",
    "apikey": token,
    "iduser":idUsuario,
  };

  return fetch(`${API_URL}registros.php?idUsuario=${idUsuario}`, {
    method: "GET",
    headers: myHeaders,
  })
    .then(response => response.json())
    .then((result) => {
      if (result.codigo !== 200) {
        return Promise.reject(result);
      }
      return result.registros.map(registro => formatearRegistroConActividad(registro, actividades));;
    })
    .catch((error) => {
      console.error("Error al obtener registros de actividad", error);
      throw new Error("Error al obtener registros.");
    });
};


export const eliminarRegistroActividad = async (idRegistro, idUsuario, token) => {
    const myHeaders = {
      "Content-Type": "application/json",
      "apikey": token,
      "iduser": idUsuario.toString(),
    };
  
    return fetch(`${API_URL}registros.php?idRegistro=${idRegistro}`, {
      method: "DELETE",
      headers: myHeaders,
    })
      .then(response => response.json())
      .then((result) => {
        if (result.codigo !== 200) {
          return Promise.reject(result);
        } else {
          return result;
        }
      })
      .catch((error) => {
        console.error("Error al eliminar registro de actividad", error);
        throw new Error(error.mensaje || "Error al eliminar registro de actividad.");
      });
  };
