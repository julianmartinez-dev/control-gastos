export const generarID = () => {
     const fecha = Date.now().toString(36);
     const random = Math.random().toString(36).substring(2);

     return fecha + random;

}

export const formatearCantidad = (cantidad) => {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return fechaNueva.toLocaleDateString('es-ES', opciones);
}

