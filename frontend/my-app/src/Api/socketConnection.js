import { Intent } from "../scripts/intentVerify.js";
// api/index.js
class SocketSend {
  constructor(intent, msg) {
    this.intent = intent 
    this.msg = msg
  }
}
var socket = new WebSocket("ws://localhost:8080/ws");

let Connect = () => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

   socket.onmessage = msg => {
    //console.log(JSON.stringify(msg.data).replace(/\\/g, ''))
    Intent(JSON.parse(msg.data.replace(/\\/g, '')))
  }; 

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };  
};

let Register = (info) => {
  info.intent = "register"
  socket.send(JSON.stringify(info));
};
let Login = (info) => {
  info.intent = "login"
  socket.send(JSON.stringify(info));
};
let Colour = (colour, email) => {
  let infoSend = new SocketSend
  infoSend.intent = "colour"
  infoSend.colour = colour
  infoSend.email = email
  socket.send(JSON.stringify(infoSend));
};

export { Connect, Register, Login, Colour };