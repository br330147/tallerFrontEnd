import "../estilos/estilos.css";
import loadingGif from "../img/cargando.gif";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <img src={loadingGif} alt="Cargando..." className="loader-gif" />
        <h2>Estamos preparando todo para ti...</h2>
      </div>
    </div>
  );
};

export default Loader;
