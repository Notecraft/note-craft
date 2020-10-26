import * as express from "express";
import * as path from "path";
import { AppController } from "./controllers";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

class AppServer extends Server {
  constructor() {
    super(true);
    this.app.set("views", path.join(__dirname, "../client/views"));
    this.app.set("view engine", "pug");

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, "../client/public")));
    this.setupControllers();
  }

  private setupControllers(): void {
    super.addControllers(new AppController());
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(`Example app listening on port ${port}!`);
    });
  }
}

export default AppServer;
