import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarID } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  //State para el presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) || 0
  );
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')
      ? JSON.parse(localStorage.getItem('gastos'))
      : []
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [totalGastado, setTotalGastado] = useState(0);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //Sincronizar localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  //Crear useEffect para calcular el gasto total
  useEffect(() => {
    const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);
    setTotalGastado(totalGastos);
  }, [gastos]);

  //useEfect para escuchar el gastoEditar
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  //Se ejeecuta cuando carga la aplicacion
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) || 0;
    if (presupuestoLS > 0) {
      setPresupuesto(presupuestoLS);
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    //Filtrar por categoria
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
      
    }
  },[filtro]);

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
    if (gasto.id) {
      //Actualizar
      const gastoActualizado = gastos.map((gastoActual) =>
        gastoActual.id === gasto.id ? gasto : gastoActual
      );
      setGastos(gastoActualizado);
    } else {
      //Nuevo gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
  };

  const eliminarGasto = (id) => {
    const gastosActuales = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActuales);
  };

  return (
    <div className={modal ? 'fijar' : undefined}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        totalGastado={totalGastado}
        setGastos={setGastos}
      />

      {/* Si el presupuesto es válido mostramos un boton para agregar gastos */}
      {isValidPresupuesto && (
        <>
          <main>
            {gastos.length > 0 && <Filtros filtro={filtro} setFiltro={setFiltro}/>}

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
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
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
