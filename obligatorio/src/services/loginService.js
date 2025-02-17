const API_URL = "https://movetrack.develotion.com/";

export const loginUser = async (usuario, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const bodyData = JSON.stringify({ usuario, password });

    const requestOptions = { 
        method: "POST", 
        headers: myHeaders, 
        body: bodyData 
    };

    return fetch(`${API_URL}login.php`, requestOptions)
        .then(response => response.text())  // parseo a texto
        .then(result => {
            const parsedResult = JSON.parse(result); // parseo JSON
            
            // Sia no es 200, la API tira error
            if (parsedResult.codigo !== 200) {
                return Promise.reject(parsedResult);
            } else {
                localStorage.setItem("usuario", usuario);
                return parsedResult; // retornamos los datos
            }
        })
        .catch(error => {
            throw new Error(error.mensaje || "Error al iniciar sesión. Verifica tus credenciales.");
        });
};
