import Gasto from './Gasto';
const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? ( // Si hay un filtro iteramos sobre los gastos filtrados
        <>
          <h2>
            {gastosFiltrados.length
              ? 'Gastos'
              : 'No hay gastos en esta categoría'}
          </h2>
          {gastosFiltrados.map((gato) => (
            <Gasto
              key={gato.id}
              gasto={gato}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
          {gastos.map((gato) => (
            <Gasto
              key={gato.id}
              gasto={gato}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
