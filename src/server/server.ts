import * as express from "express";
import * as path from "path";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

class AppServer extends Server {
  constructor(controllers: any[]) {
    super(true);
    this.app.set("views", path.join(__dirname, "../client/views"));
    this.app.set("view engine", "pug");

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, "../client/public")));
    this.setupControllers(controllers);
  }

  private setupControllers(controllers: any[]): void {
    super.addControllers(controllers);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(`Example app listening on port ${port}!`);
    });
  }
}

export default AppServer;
