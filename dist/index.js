import * as http from "node:http";
import * as hello from "./handlers/hello.js";
import * as tsHTTP from "./tsHTTP.js";
import * as Mw from "./middleware/index.js";
const routes = new Map();
routes.set("/", hello.Listener(Mw.sendString, Mw.cookies, null));
const server = http.createServer(tsHTTP.NewListener(routes, (_req, res) => {
    res.statusCode = 404;
    res.end();
}));
server.listen(8080);
