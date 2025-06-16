import { config as browserstackIosConfig } from "./browserstack.ios.conf.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "Mobile", ".env") });

export const config = browserstackIosConfig;
