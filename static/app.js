
//Terminal.loadAddon('fullscreen');  // Load the `fullscreen` addon

var term = new Terminal();
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon)
term.open(document.getElementById('term'));  // Open the terminal in #terminal-container
var conn = new WebSocket(location.protocol.replace("http","ws")+"//"+location.host);
var config = {};
function updateConf() {
    console.log('loading config',config);
    if (config.theme && typeof config.theme == 'object') {
        term.setOption('theme',config.theme);
    }
}
fetch('/conf').then(async x=>{
    if (x.status==200) {
        x.json().then(conf=>{
            config=conf;
            updateConf();
        }).catch(err=>{
            console.warn('config load failed with code',x.status,err);
        })
    }
}).catch(err=>{
    console.warn('config load failed with error',err);
})
conn.onmessage=(m)=>{
    var dat = m.data.toString();
if (dat.startsWith("d")) {
    term.write(dat.substring(1));
    return;
}
}
conn.onopen=()=>{
    conn.send("resize,"+term.cols+","+term.rows)
}
term.onData(d=>{
    if (conn.readyState==conn.OPEN) conn.send("d"+d);
})
onresize=()=>{
    fitAddon.fit();
    if (conn.readyState==conn.OPEN) conn.send("resize,"+term.cols+","+term.rows);
}
onfocus=()=>{
    term.element.focus()
}
onresize();
let termtl = ""
term.onTitleChange=(t)=>{
    console.log(t);
    termtl=t;
    if (t) {

        document.title=t+" - BrowserTerminal"
    } else {
        document.title="BrowserTerminal";
    }
}
conn.onclose=()=>{
    term.reset();
    term.write("DISCONNECTED\n");
    window.close();
}
//term.toggleFullscreen();
