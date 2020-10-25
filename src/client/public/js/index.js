import App from "./app";
import MelodyBar from "./melodyBar";
import { SoundPlayer } from "./soundPlayer";
import TempoControls from "./tempoControls";

/*Setup the App and Components */
const app = new App();

let mainMelody = [];
const noteObjects = document.querySelectorAll(".note-item");
noteObjects.forEach((element) => {
    mainMelody.push({
        note: element.innerHTML + "2",
        duration: "8n",
        noteObject: element,
    });
});
const tempo = window.localStorage.getItem("tempo");
const initialState = {
    tempo: tempo || "240",
    mainMelody,
    currentItem: 0,
}

app.attachComponent(new SoundPlayer(Tone, initialState, app.setState.bind(app)));
app.attachComponent(new MelodyBar(app.setState.bind(app)));
app.attachComponent(new TempoControls(initialState.tempo, app.setState.bind(app)));

/*Start the App*/
app.init(initialState);