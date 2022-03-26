import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  totalGastado
}) => {
  return (
    <header>
      <h1>Control de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} totalGastado={totalGastado} />
      ) : (
        <NuevoPresupuesto
          setPresupuesto={setPresupuesto}
          presupuesto={presupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
