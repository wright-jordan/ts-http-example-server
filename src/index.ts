import * as http from "node:http";
import * as hello from "./handlers/hello.js";
import * as tsHTTP from "./tsHTTP.js";

const routes = new Map<string, http.RequestListener>();

routes.set("/", hello.Listener());

const server = http.createServer(
  tsHTTP.App(routes, (_req, res) => {
    res.statusCode = 404;
    res.end();
  })
);

server.listen(8080);
