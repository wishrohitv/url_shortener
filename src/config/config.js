import Env from "./env.js";

class Config extends Env {
  constructor() {
    super();
    this.APP_NAME = process.env.APP_NAME || "URL Shortener";
    this.VERSION = process.env.VERSION || "1.0.0";
  }
}

const config = new Config();
export default config;
