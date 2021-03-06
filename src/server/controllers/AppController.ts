import { Request, Response } from "express";
import { Controller, Get, ClassErrorMiddleware } from "@overnightjs/core";
import errorHandler from "../middlewares/ErrorHandler";
import MelodyService from "../services/melody/MelodyService";
import { Settings, EmptyMode } from "../models/Settings";
import defaultSettings, { keys } from "../defaultValues";
import { Melody } from "../models/Melody";

@Controller("/")
@ClassErrorMiddleware(errorHandler)
export class AppController {
  service: MelodyService;

  constructor(service: MelodyService) {
    this.service = service;
  }

  @Get("/")
  private getMelodyAppPage(req: Request, res: Response) {
    const selectedKey =
      (req.query.key as string) ?? defaultSettings.selectedKey;
    const selectedScale =
      (req.query.scale as string) ?? defaultSettings.selectedScale;
    const selectedNumberOfNotes = (req.query.notes as string)
      ? Number(req.query.notes)
      : defaultSettings.selectedNumberOfNotes;
    const selectedEmptyMode = req.query.empty
      ? EmptyMode[req.query.empty as keyof typeof EmptyMode]
      : defaultSettings.selectedEmptyMode;
    const pattern = (req.query.pattern as string)
      ? (req.query.pattern as string).split(",")
      : null;

    const settings: Settings = {
      selectedKey,
      selectedScale,
      selectedNumberOfNotes,
      selectedTempo: defaultSettings.selectedTempo,
      selectedEmptyMode,
      pattern,
    };

    const melody: Melody = this.service.buildRandomResult(settings);

    const appDetails = {
      keys,
      ...settings,
      ...melody,
      selectedEmptyMode: EmptyMode[settings.selectedEmptyMode],
    };
    res.render("index", appDetails);
  }
}
