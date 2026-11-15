import "dotenv/config";
import app from "./app.js";
import config from "./config/config.js";
import { connectMongoDB } from "./db/index.js";

connectMongoDB(config.MONGO_URI)
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(
        `App is running on the port: http://localhost:${config.PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error("Failed to start server: ", error);
  });
