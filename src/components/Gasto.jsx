import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { formatearCantidad, formatearFecha } from '../helpers';


const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
  const { nombre, cantidad, categoria, fecha, id } = gasto;

  //Editar gasto
  const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => setGastoEditar(gasto)}>
      Editar
    </SwipeAction>
  </LeadingActions>
);

//Eliminar gasto
const trailingActions = () => (
  <TrailingActions>
    <SwipeAction
      destructive={true}
      onClick={() => eliminarGasto(id)}
    >
      Delete
    </SwipeAction>
  </TrailingActions>

  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra ">
          <div className="contenido-gasto">
            <img
              src={`./src/img/icono_${categoria}.svg`}
              alt="imagen categoria"
            />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{formatearCantidad(cantidad)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
