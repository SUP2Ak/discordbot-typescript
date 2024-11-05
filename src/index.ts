import "dotenv/config";
import { Client } from "./constructor.js";

const client = new Client();
client.start();

export default client;