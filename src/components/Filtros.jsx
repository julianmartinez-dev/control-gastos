
const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="filtrar">Filtrar gastos</label>
          <select name="filtrar" id="filtrar" value={filtro} onChange={ e => setFiltro(e.target.value) } >
            <option value="">Ver todos</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filtros