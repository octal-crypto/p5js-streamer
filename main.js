const cluster = require("cluster")
const os = require("os")
const p5 = require("node-p5");
const ws = require("ws");
const https = require('https');
const fs = require('fs');
const crypto = require('crypto')
const snowcrash = require("./art/snowcrash");
const axons = require("./art/axons");

// Allow nodejs to leverage multiple cores when clients connect concurrently
if (cluster.isPrimary) {
    const cpus = os.cpus().length;
    for (let i=0; i < cpus; i++) cluster.fork();
    return;
}

// Bring our own font for consistency across systems
p5.loadFont("./art/courier.ttf");

// The maximum size of (uncompressed) data in bytes allowed to be
// network buffered per client before rendering FPS will be reduced.
const maxBuffer = 5 * 1024 * 1024; // 5MB

// Start a secure websocket server with compression enabled
const server = https.createServer({
    cert: fs.readFileSync("/etc/letsencrypt/live/ws.octal.art/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/ws.octal.art/privkey.pem")
});
const wss = new ws.WebSocketServer({server: server, perMessageDeflate: {}});
server.listen(443);

// When a client opens a connection
wss.on("connection", ws => {

    // Assign them a unique idenfifier
    const clientId = crypto.randomUUID();
    console.debug({clientId:clientId, message:"Connection open"});
    let sketch = null;

    // When a message is received from the client
    ws.on("message", data => {
        data = JSON.parse(data);
        console.debug({clientId:clientId, message:"Message received", data:data});

        if (data.start) {
            // Start a new sketch, replacing the old one if it exists
            sketch?.remove();
            const art = data.start.art == "snowcrash" ? snowcrash :
                        data.start.art == "axons" ? axons : null;

            sketch = !art ? null : p5.createSketch(art?.sketch(data.start, frame => {
                // For each frame, send width + height + RGBA pixels
                ws.send(new Uint16Array([frame.width, frame.height]), {fin:false});
                ws.send(frame.data, {fin:true});

                // Reduce rendering FPS if data is buffered due to slow network
                if (ws.bufferedAmount > maxBuffer) sketch?.frameRate(sketch.frameRate()*0.95);
            }));
        }

        // Client requested modifications to in-progress renders
        if (data.pause) sketch?.noLoop();
        if (data.resume) sketch?.loop();
        if (data.stop) sketch?.remove();
        if (data.mouseClicked) sketch?.mouseClicked?.(data.mouseClicked);
        if (data.keyPressed) sketch?.keyPressed?.(data.keyPressed);
        if (data.fps && (data.fps < sketch?._targetFrameRate || ws.bufferedAmount <= maxBuffer)) {
            sketch?.frameRate(data.fps);
        }
    });
    ws.on("close", () => {
        console.debug({clientId:clientId, message:"Connection closed"});
        sketch?.remove();
    });
    ws.on("error", e => console.error({clientId:clientId, message:"Connection error", data:e}));
});