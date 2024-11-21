export const FormatearFecha = (Fecha) => {
  const fechaFormateada = Fecha.split("-").reverse().join("/");
  return fechaFormateada;
};

export const ObtenerFechaActual = () => {
  const now = new Date();
  const tzoffset = now.getTimezoneOffset() * 60000; // offset en milisegundos
  return new Date(now - tzoffset).toISOString().split("T")[0];
};

export const CalcularTotalConceptos = (Conceptos) => {
  const total = Conceptos.reduce(
    (acumulador, item) => acumulador + item.ImporteConcepto,
    0
  );

  return total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
