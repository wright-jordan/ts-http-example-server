import { NewCookiesMiddleware } from "./cookiesMiddleware.js";
import { NewSendStringMiddleware } from "./sendStringMiddleware.js";

export const cookies = NewCookiesMiddleware();
export const sendString = NewSendStringMiddleware();
