import { useState, useEffect } from 'react';
import CerrarBTN from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  presupuesto,
  totalGastado,
  gastoEditar
}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState(''); 

  //Cuando se cargue el modal se llena el formulario con los datos del gasto a editar
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  },[]);

  const ocultarModal = () => {
    setAnimarModal(false);
    
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validamos si todos los campos estan llenos
    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios');
      //Despues de 3s se elimina el mensaje
      setTimeout(() => {
        setMensaje('');
      }, 3000);
      return;
    }
    //Valida si el gasto es menor al disponible
    if(cantidad > (presupuesto - totalGastado)){
      setMensaje('No puedes gastar mas de lo que dispones');
      return;
    }
    //Si estan llenos enviamos el gasto al componente principal
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
    //Y ocultamos el modal
    ocultarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBTN} alt="boton cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad Gasto</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            placeholder="Añade la cantidad el gasto Ej. 300"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            name=""
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" defaultChecked disabled>
              Selecciona una opción
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.nombre ? 'Guardar edición' : 'Añadir gasto'}
        />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default Modal;
