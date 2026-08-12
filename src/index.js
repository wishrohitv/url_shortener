import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log("App is running on the port: http://localhost:8000");
    });
  })
  .catch((error) => {
    console.log("Failed to start server: ", error);
  });
