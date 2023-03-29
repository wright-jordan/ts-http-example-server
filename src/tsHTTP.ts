import * as http from "node:http";
import * as net from "node:net";

interface Context {}

export interface Handler<Ctx extends Context> {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Ctx
  ): Promise<void>;
}

interface TestServer {
  _sockets: net.Socket[];
  _server: http.Server;
  stop(this: TestServer): Promise<void>;
  listen(this: TestServer, port: number): void;
}

async function stop(this: TestServer): Promise<void> {
  return new Promise<void>((resolve) => {
    this._server.close(() => {
      for (const socket of this._sockets) {
        socket.destroy();
      }
      resolve();
    });
  });
}

function listen(this: TestServer, port: number): void {
  this._server.listen(port);
}

export function NewTestServer(listener: http.RequestListener): TestServer {
  const server = http.createServer(listener);
  const sockets: net.Socket[] = [];
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

export function NewListener(
  routes: Map<string, http.RequestListener>,
  fallback: http.RequestListener
): http.RequestListener {
  return async (req, res) => {
    (routes.get(req.url!.split("?", 1)[0]!) || fallback)(req, res);
  };
}

export interface Middleware<Ctx extends Context> {
  use: (this: Middleware<Ctx>, next: Handler<Ctx & any>) => Handler<Ctx>;
}
