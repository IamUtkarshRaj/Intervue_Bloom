import Vapi from "@vapi-ai/web";
import { config } from "./config";

export const vapi = new Vapi(config.vapi.webToken);