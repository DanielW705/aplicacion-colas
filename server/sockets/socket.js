const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");
const ticketControl = new TicketControl();
io.on("connection", (client) => {
  console.log("Usuario conectado");
  client.emit("estadoActual", {
    actual: ticketControl.getestado(),
    ultimos4: ticketControl.getultimos4(),
  });
  client.on("nuevoTicket", () => {
    let turno = ticketControl.siguiente();
    client.emit("nuevoTurno", turno);
  });
  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        error: true,
        mensaje: "Es necesario el escritorio",
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    client.broadcast.emit("ultimos4", { ultimos4: ticketControl.getultimos4() });
    callback(atenderTicket);
  });
});
