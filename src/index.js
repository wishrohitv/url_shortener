import "dotenv/config";
import app from "./app.js";
import Env from "./config/env.js";
import { connectMongoDB } from "./db/index.js";

const env = new Env();

connectMongoDB(env.MONGO_URI)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`App is running on the port: http://localhost:${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server: ", error);
  });
