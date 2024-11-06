import "dotenv/config";
import { Client } from "./constructor";

const client = new Client();
client.start();

export default client;