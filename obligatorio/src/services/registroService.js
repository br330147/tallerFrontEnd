const API_URL = "https://movetrack.develotion.com/";

export const registroUser = async (usuario, password, idPais) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const bodyData = JSON.stringify({ usuario, password, idPais });

    const requestOptions = { 
        method: "POST", 
        headers: myHeaders, 
        body: bodyData 
    };

    return fetch(`${API_URL}usuarios.php`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log("API Response (Registro):", result);
            const parsedResult = JSON.parse(result);
            
            if (parsedResult.codigo !== 200) {
                return Promise.reject(parsedResult);
            } else {
                return parsedResult; // Devuelve los datos del usuario registrado
            }
        })
        .catch(error => {
            console.error("Error en el registro:", error);
            throw new Error(error.mensaje || "Error al registrarse.");
        });
};
