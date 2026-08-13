import "dotenv/config";
import app from "./app.js";
import Env  from "./config/env.js";
import connectDB from "./db/index.js";

const env = new Env();

connectDB(env.MONGO_URI)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`App is running on the port: http://localhost:${env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to start server: ", error);
  });
