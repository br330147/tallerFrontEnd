const API_URL = "https://movetrack.develotion.com/";

export const obtenerActividades = async (idUsuario, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    "apikey": token,
    "iduser": idUsuario.toString(),
  };

  console.log("Enviando Headers para obtener actividades:", myHeaders);

  return fetch(`${API_URL}actividades.php`, {
    method: "GET",
    headers: myHeaders,
  })
    .then(response => response.json())
    .then((result) => {
      console.log("Actividades obtenidas:", result);
      if (!result || result.codigo !== 200) {
        return Promise.reject(result);
      } else {
        return result.actividades;
      }
    })
    .catch((error) => {
      console.error("Error al obtener actividades", error);
      throw new Error(error.mensaje || "Error al obtener actividades.");
    });
};
