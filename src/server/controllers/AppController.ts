import { Request, Response } from "express";
import { Controller, Get, ClassErrorMiddleware } from "@overnightjs/core";
import errorHandler from "../middlewares/ErrorHandler";
import MelodyService from "../services/MelodyService";
import Settings from "../models/Settings";
import defaultSettings from "../defaultValues";

@Controller("/")
@ClassErrorMiddleware(errorHandler)
export class AppController {
  service: MelodyService;

  constructor(service: MelodyService) {
    this.service = service;
  }

  @Get("/")
  private getMelodyAppPage(req: Request, res: Response) {
    const settings: Settings = {
      key: (req.query.key as string) ?? defaultSettings.key,
      scale: (req.query.scale as string) ?? defaultSettings.scale,
      tempo: (req.query.tempo as string) ?? defaultSettings.tempo,
      notes: (req.query.notes as string)
        ? Number(req.query.notes)
        : defaultSettings.notes,
      empty: (req.query.empty as string) ?? defaultSettings.empty,
      keys: (req.query.empty as string[]) ?? defaultSettings.keys,
      pattern: "",
    };
    const result = this.service.buildRandomResult(settings);
    res.render("index", result);
  }
}
