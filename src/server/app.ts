import AppServer from "./server";
const port: number = Number(process.env.PORT);

const server = new AppServer();
server.start(port);
