import * as request from "supertest";
import { AppController } from "../../../src/server/controllers";
import MelodyService from "../../../src/server/services/melody/MelodyService";
import AppServer from "../../../src/server/server";
import { Server } from "@overnightjs/core";
import { Settings } from "../../../src/server/models/Settings";

describe("AppController", () => {
  let controller: AppController;
  let serviceMock: MelodyService;
  let server: Server;

  beforeAll(() => {
    serviceMock = {
      buildRandomResult: (settings: Settings) => {
        return {
          pattern: ["B", "D", "B", "C", "G", "F#", "C", "G"],
          allNotes: ["C", "D", "E", "F#", "G", "A", "B"],
          allScales: [
            "ionian",
            "dorian",
            "phrygian",
            "lydian",
            "mixolydian",
            "aeolian",
            "locrian",
          ],
          allEmptyModes: ["None", "Low", "High"],
        };
      },
    };
    controller = new AppController(serviceMock);
    server = new AppServer([controller]);
  });

  it("should return index page render", async () => {
    const response = await request(server.app).get("/");

    expect(response.status).toBe(200);
  });
});
