import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarID } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  //State para el presupuesto
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  //State para el modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  //State para guardar gastos
  const [gastos, setGastos] = useState([]);
  const [totalGastado, setTotalGastado] = useState(0);

  const [gastoEditar, setGastoEditar] = useState({});

  //Crear useEffect para calcular el gasto total
  useEffect(() => {
    const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);
    setTotalGastado(totalGastos);
  }, [gastos]);

  //useEfect para escuchar el gastoEditar
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
       setModal(true);
       setTimeout(() => {
         setAnimarModal(true);
       }, 500);
    }

  },[gastoEditar]);


  //Cuando hacemos click en el boton de agregar gasto
  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
    setGastoEditar({});
  };

  //Se ejectuta desde el modal cuando se hace click en el boton de guardar
  const guardarGasto = (gasto) => {

    if(gasto.id){
      //Actualizar
      const gastoActualizado = gastos.map(gastoActual => gastoActual.id === gasto.id ? gasto : gastoActual);
      setGastos(gastoActualizado);

    }else{
      //Nuevo gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
  };

  const eliminarGasto = (id) => {
    const gastosActuales = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActuales);
  }

  return (
    <div className={modal ? 'fijar' : undefined}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        totalGastado={totalGastado}
      />

      {/* Si el presupuesto es válido mostramos un boton para agregar gastos */}
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {/* Cuando damos click en el boton mostramos una ventana modal */}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          presupuesto={presupuesto}
          totalGastado={totalGastado}
          gastoEditar={gastoEditar}
        />
      )}
    </div>
  );
}

export default App;
