import * as request from "supertest";
import { AppController } from "../../../src/server/controllers";
import MelodyService from "../../../src/server/services/MelodyService";
import AppServer from "../../../src/server/server";
import { Server } from "@overnightjs/core";
import Settings from "../../../src/server/models/Settings";

describe("AppController", () => {
  let controller: AppController;
  let serviceMock: MelodyService;
  let server: Server;

  beforeAll(() => {
    serviceMock = {
      buildRandomResult: (settings: Settings) => {
        patterns: ["A", "F", "G"];
      },
    };
    controller = new AppController(serviceMock);
    server = new AppServer([controller]);
  });

  it("should return index page render", () => {
    request(server.app).get("/").expect(200);
  });
});
