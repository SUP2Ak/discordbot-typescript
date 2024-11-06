import { Event } from "../constructor";;

export default new Event("ready", () => {
    console.log("Bot is online and ready!");
});