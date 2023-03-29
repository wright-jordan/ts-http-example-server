import * as http from "node:http";
import * as net from "node:net";
async function stop() {
    return new Promise((resolve) => {
        this._server.close(() => {
            for (const socket of this._sockets) {
                socket.destroy();
            }
            resolve();
        });
    });
}
function listen(port) {
    this._server.listen(port);
}
export function NewTestServer(listener) {
    const server = http.createServer(listener);
    const sockets = [];
    server.on("connection", (socket) => {
        sockets.push(socket);
    });
    return {
        _sockets: sockets,
        _server: server,
        stop,
        listen,
    };
}
export function NewListener(routes, fallback) {
    return async (req, res) => {
        (routes.get(req.url.split("?", 1)[0]) || fallback)(req, res);
    };
}
