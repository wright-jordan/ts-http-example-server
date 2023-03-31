function use(next) {
    return async (req, res, ctx) => {
        ctx.message = this.config.message;
        await next(req, res, ctx);
    };
}
export function New(config) {
    return {
        config,
        use,
    };
}
