// Comando para establecer la conexion
const socket = io();
const boton = document.getElementById("nvoticket");
const label = document.getElementById("lblNuevoTicket");
socket.on("connect", () => {
  console.log("Conectado al servidor");
});
socket.on("disconnect", () => {
  console.log("Desconectado al servidor");
});
socket.on("estadoActual", (data) => {
  label.innerHTML = data.actual;
});
boton.addEventListener("click", () => {
  socket.emit("nuevoTicket");
});
socket.on("nuevoTurno", (data) => {
  label.innerText = data;
});
