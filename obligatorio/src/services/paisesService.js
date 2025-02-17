const API_URL = "https://movetrack.develotion.com/";

export const getPaises = async () => {
    return fetch(`${API_URL}paises.php`)
        .then(response => response.text())
        .then(result => {
            const parsedResult = JSON.parse(result);

            if (parsedResult.codigo !== 200) {
                return Promise.reject(parsedResult);
            } else {
                return parsedResult.paises; 
            }
        })
        .catch(error => {
            console.error("Error obteniendo los países:", error);
            throw new Error("No se pudieron cargar los países.");
        });
};
