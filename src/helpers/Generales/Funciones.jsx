export const FormatearFecha = (Fecha) => {
  const fechaFormateada = Fecha.split("-").reverse().join("/");
  return fechaFormateada;
};

export const ObtenerFechaActual = () => {
  const now = new Date();
  const tzoffset = now.getTimezoneOffset() * 60000; // offset en milisegundos
  return new Date(now - tzoffset).toISOString().split("T")[0];
};

export const ObtenerHoraActual = () => {
  const ahora = new Date();
  const formatoHora = new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formatoHora.format(ahora);
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
