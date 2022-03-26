import { useState } from 'react';
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

  //Cuando hacemos click en el boton de agregar gasto
  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  //Se ejectuta desde el modal cuando se hace click en el boton de guardar
  const guardarGasto = (gasto) => {
    gasto.id = generarID();
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto]);
  };

  return (
    <div className={modal && 'fijar'}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* Si el presupuesto es válido mostramos un boton para agregar gastos */}
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos gastos={gastos}/>
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
        />
      )}
    </div>
  );
}

export default App;
