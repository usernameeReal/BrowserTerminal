const port = 40486;//Math.floor(Math.random()*2000)+40000;
const cp = require("child_process");
let probeRes = cp.spawnSync("curl", ["--fail", "127.0.0.1:"+port+"/open"]);
if (!probeRes.status) {
    console.log('Already running or curl is not installed.')
    process.exit();
};

const express = require("express");
const {WebSocketServer} = require("ws");
const app = express();
const fs = require("fs");
const pty = require('node-pty');
app.get("/probe",(req,res)=>{
    res.send("ok")
})
app.get("/conf",(req,res)=>{
    if (fs.existsSync('~/.config/browserterminal.json')) {
        res.sendFile("~/.config/browserterminal.json")

    } else {
        res.status(404).send('no config');
    }
})
app.get("/stop",(req,res)=>{
    process.exit();
    res.send("ok")
})
app.get("/open",(req,res)=>{
    open("http://127.0.0.1:"+port);
    res.send("ok");
})
app.use(express.static(__dirname+"/static"));
const httpSrv = require("http").createServer(app);
const wss = new WebSocketServer({ noServer: true });
wss.on("connection",(sock)=>{

    var ptyProcess = pty.spawn("bash", ["-c","TERM=xterm-256color TERM_PROGRAM=BrowserTerminal TERM_PROGRAM_VERSION=v1 exec $0"], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
      });
      ptyProcess.onData((e)=>{
          sock.send("d"+e);
      })
      ptyProcess.onExit(()=>{
          sock.close();
      })
      sock.on("message",(dat)=>{
          dat = dat.toString();
          if (dat.startsWith("d")) return ptyProcess.write(dat.substring(1));
          if (dat.startsWith("resize")) {
              let [x, cols, rows] = dat.split(",",3);
              cols=parseInt(cols);
              if (isNaN(cols)) return;
              rows=parseInt(rows);
              if (isNaN(rows)) return;
              ptyProcess.resize(cols,rows);
          }
      })
      sock.on("close",()=>{
          console.log("closing shell");
          ptyProcess.kill();
      })
})
httpSrv.on("upgrade",(request, socket, head)=>{
    if (request.headers.origin!="http://127.0.0.1:40486") return socket.destroy();
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
      });
})
httpSrv.listen(port,"127.0.0.1");
const open = require("open");
open("http://127.0.0.1:"+port);
console.log(port)
