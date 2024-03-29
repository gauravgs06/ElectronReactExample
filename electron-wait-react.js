const { Socket } = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 5000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new Socket();
let startedElectron = false;

const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log("starting electron");
      startedElectron = true;
      const exec = require("child_process").exec;
      exec("yarn electron");
    }
  });

tryConnection();
client.on("error", error => {
  setTimeout(tryConnection, 1000);
});
