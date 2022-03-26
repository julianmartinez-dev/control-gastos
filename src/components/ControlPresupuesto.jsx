import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatearCantidad } from "../helpers";

const ControlPresupuesto = ({presupuesto,totalGastado,setGastos, setPresupuesto, setIsValidPresupuesto}) => {

  const porcentaje = (totalGastado / presupuesto * 100).toFixed(2);

  const handleResetApp = () => {
    const resultado = confirm('¿Estas seguro de querer resetear la aplicación?');
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`Gastado:
          ${porcentaje}% `}
          styles={buildStyles({
            pathColor: '#3B82F6',
            textColor: '#3B82F6',
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Resetear app
        </button>
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