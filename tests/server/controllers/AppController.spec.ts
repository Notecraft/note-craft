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
      buildRandomResult: (settings: Settings) => ({
        pattern: ["A", "F", "G"],
        selectedScale: "lydian",
        selectedKey: "C",
        selectedNumberOfNotes: 8,
        keys: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
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
        selectedEmptyMode: "None",
      }),
    };
    controller = new AppController(serviceMock);
    server = new AppServer([controller]);
  });

  it("should return index page render", async () => {
    const response = await request(server.app).get("/");

    expect(response.status).toBe(200);
  });
});
