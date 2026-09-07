import fs from "fs";
import path from "path";
import Data from "../models/data.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function importdata() {
  try {
    const filepath = path.join(__dirname, "../../data/jsondata.json");
    const rawdata = fs.readFileSync(filepath, "utf-8");
    const Jsondata = JSON.parse(rawdata);
    await Data.deleteMany({});
    await Data.insertMany(Jsondata);
    console.log("data inserted successfully");
  } catch (error) {
    console.log("error in inserting data", error.message);
  }
}
