const socket = io();
let searchParams = new URLSearchParams(window.location.search);
let escritorio = searchParams.get("escritorio");
const h1 = document.querySelector("h1");
const botton = document.querySelector("button");
const small = document.querySelector("small");
if (!searchParams.has("escritorio") || !escritorio) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
} else {
  h1.innerText = `Escritorio ${escritorio}`;
}
botton.addEventListener("click", () => {
  socket.emit("atenderTicket", { escritorio: escritorio }, (res) => {
    if (res === "No hay tickets") {
      alert(res);
      small.innerText = "Ya no hay tickets";
      return;
    }
    small.innerText = res.numero;
  });
});
