import { AppController } from "./controllers";
import AppServer from "./server";
import ToneMelodyService from "./services/melody/ToneMelodyService";

const port: number = Number(process.env.PORT);

const appController = new AppController(new ToneMelodyService());
const server = new AppServer([appController]);
server.start(port);
