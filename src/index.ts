import * as http from "node:http";
import * as hello from "./routes/hello.js";
import * as tsHTTP from "ts-http";

const routes = new Map<string, http.RequestListener>();

routes.set("/", hello.New());

const server = http.createServer(
  tsHTTP.NewAppListener(routes, function (_req, res) {
    res.statusCode = 404;
    res.end();
  })
);

server.listen(8080);
