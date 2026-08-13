export default class {
  constructor() {
    this.MONGO_URI = process.env.MONGO_URI;
    if (!this.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    this.PORT = process.env.PORT || 8000;
    this.NODE_ENV = process.env.NODE_ENV || "development";
  }
}
