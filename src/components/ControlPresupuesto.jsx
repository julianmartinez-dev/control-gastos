import { formatearCantidad } from "../helpers";

const ControlPresupuesto = ({presupuesto,totalGastado}) => {

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Grafica aqui</p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span>
          {formatearCantidad(presupuesto - totalGastado)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(totalGastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto