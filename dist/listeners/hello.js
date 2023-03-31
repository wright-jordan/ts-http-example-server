import * as middleware from "../middleware/index.js";
export function NewHandler(_deps) {
    return async (_req, res, ctx) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: ctx.message }));
    };
}
const handler = middleware.sample.use(NewHandler(null));
export function New() {
    return (req, res) => {
        const ctx = {
            message: "",
        };
        handler(req, res, ctx);
    };
}
