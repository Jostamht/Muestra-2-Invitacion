/*
  Datos de la invitación.
  Todo lo que cambia entre una pareja y otra vive en este archivo.
*/
window.INVITE = {
  novios: { primero: "Marido", segundo: "Mujer" },

  // Fecha y hora de la ceremonia (con zona horaria de Bolivia, UTC-4)
  fecha: "2027-03-20T17:00:00-04:00",
  zonaHoraria: "America/La_Paz",

  mensaje: "Nos casamos, y queremos celebrarlo contigo.",

  lugar: {
    nombre: "Salón Los Jazmines",
    direccion: "Calle de ejemplo 123, La Paz",
    mapa: "https://www.google.com/maps/search/?api=1&query=La+Paz+Bolivia"
  },

  itinerario: [
    { hora: "17:00", texto: "Ceremonia" },
    { hora: "18:30", texto: "Cóctel y fotos" },
    { hora: "19:30", texto: "Cena" },
    { hora: "21:30", texto: "Primer baile" },
    { hora: "22:00", texto: "Fiesta" }
  ],

  vestimenta: {
    codigo: "Formal elegante",
    nota: "Te pedimos evitar el blanco y el marfil.",
    colores: [
      { nombre: "Burdeos", hex: "#8c1a2b", texto: "#f3e6d3" },
      { nombre: "Dorado", hex: "#c9a24b", texto: "#2a1209" },
      { nombre: "Negro", hex: "#17090d", texto: "#d9b45f" }
    ]
  },

  regalos: {
    titulo: "Lluvia de sobres",
    texto: "Tu compañía ya es nuestro mejor regalo. Si quieres tener un detalle con nosotros, habrá un buzón en la fiesta."
  },

  confirmacion: {
    limite: "2027-02-20",
    texto: "Confirma tu asistencia antes del 20 de febrero."
  },

  musica: { src: "audio/fairytale.mp3", volumen: 0.55 }
};
