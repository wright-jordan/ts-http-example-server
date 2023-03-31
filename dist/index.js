import * as http from "node:http";
import * as hello from "./listeners/hello.js";
import * as tsHTTP from "./tsHTTP.js";
const routes = new Map();
routes.set("/", hello.New());
const server = http.createServer(tsHTTP.NewAppListener(routes, function (_req, res) {
    res.statusCode = 404;
    res.end();
}));
server.listen(8080);
