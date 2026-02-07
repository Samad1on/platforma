import express from "express";

import { env } from "./src/config/index.js";
import { ConnectDB } from "./src/db/index.js";
import AppRoutes from "./src/index.js";
import { errorHandler } from "./src/apps/middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.use(AppRoutes);
app.use(errorHandler);

async function runServer() {
  try {
    await ConnectDB(env.MY_URL);
    const PORT = Number(env.PORT);
    app.listen(PORT, env.HOST, () => {
      console.log(`server runing on port http://${env.HOST}:${env.PORT}`);
    });
  } catch (error) {
    console.log("run serverda no sozlik ", error);
  }
}

runServer();
