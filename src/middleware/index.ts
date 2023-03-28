import { NewCookiesMiddleware } from "./cookiesMiddleware.js";
import { NewSendStringMiddleware } from "./sendStringMiddleware.js";

export const sendStringMiddleware = NewCookiesMiddleware();
export const cookiesMiddleware = NewSendStringMiddleware();
