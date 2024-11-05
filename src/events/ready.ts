import { Event } from "@constructor";

export default new Event("ready", (client) => {
    console.log(`${client.user?.tag || "Bot"} is online.`);
});