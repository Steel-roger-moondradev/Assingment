import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import { importdata } from "./script/data.js";
import dataRoutes from "./routes/dataroutes.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/data", dataRoutes);

const startserver = async () => {
  try {
    await connectdb();
    await importdata();
    app.listen(process.env.PORT, () => {
      console.log("Server is started");
    });
  } catch (error) {
    console.log("Error in connecting the server");
  }
};
startserver();
