import { Melody } from "../../models/Melody";
import { Settings } from "../../models/Settings";

export default interface MelodyService {
  buildRandomResult(settings: Settings): Melody;
}
