const API_URL = "https://movetrack.develotion.com/";

export const addActividad = async (
  idActividad,
  idUsuario,
  tiempo,
  fecha,
  token
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("apikey", token);
  const bodyData = JSON.stringify({
    idActividad,
    idUsuario,
    tiempo,
    fecha,
    token,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
  };

  return fetch(`${API_URL}registros.php`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const parsedResult = JSON.parse(result);
      // Si no es 200, la API tira error
      if (parsedResult.codigo !== 200) {
        return Promise.reject(parsedResult);
      } else {
        return parsedResult; // retornamos los datos
      }
    })
    .catch((error) => {
      console.error("Error al registrar actividad", error);
      throw new Error(
        error.mensaje || "Error al registrar actividad, intente luego."
      );
    });
};
