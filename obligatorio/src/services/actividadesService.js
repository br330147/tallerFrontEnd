const API_URL = "https://movetrack.develotion.com/";

export const addActividad = async (
  idUsuario,
  idActividad,
  tiempo,
  fecha,
  token
) => {

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("apikey", token);
  headers.append("iduser", idUsuario.toString());

  const bodyData = JSON.stringify({
    idActividad : idActividad,
    idUsuario : idUsuario,
    tiempo: tiempo,
    fecha,
  });

  console.log("Enviando Body:", bodyData);

  const requestOptions = {
    method: "POST",
    headers: headers,
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
