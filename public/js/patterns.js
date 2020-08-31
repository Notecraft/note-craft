let currentItem = 0;
const noteObjects = document.querySelectorAll(".note-item");
const setTempo = document.querySelectorAll(".tempo") || 120;

const synth = new Tone.Synth({
  oscillator: {
    count: 2,
    type: "fatsawtooth",
  },
}).toDestination();

if (Tone.Transport.state !== "started") {
  Tone.Transport.start();
}

const mainMelody = [];

noteObjects.forEach((element, index) => {
  mainMelody.push({
    time: `0:${index}`,
    note: element.outerText + "2",
    duration: "8n",
    noteObject: element,
  });
});

console.log(mainMelody);

const applyToAllNotes = () => {
  if (currentItem === mainMelody.length) {
    console.log("currentItem === mainMelody.length! Relooping now");
    // clearInterval();
    // return;\
    currentItem = 0;
  }

  //Clear out the last item
  mainMelody[mainMelody.length - 1].noteObject.style.background = "";

  //Which item are we dealing with?
  const currentNote = mainMelody[currentItem];
  currentNote.noteObject.style.background = "blue";

  //play the sound for this item
  synth.triggerAttackRelease(
    currentNote.note,
    currentNote.duration,
    currentNote.time
  );

  //Reset the note prior
  if (currentItem > 0) {
    mainMelody[currentItem - 1].noteObject.style.background = "";
  }

  //Next item
  currentItem++;
};

// ------------------------

Tone.Transport.bpm.value = 120;

const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
  if (Tone.Transport.state !== "started") {
    // Tone.Transport.start();
    playButton.innerHTML = "Stop";
    applyToAllNotes();
    setInterval(applyToAllNotes, 500);
  } else {
    Tone.Transport.stop();
    playButton.innerHTML = "Play";
  }
});

document.documentElement.addEventListener("mousedown", () => {
  if (Tone.context.state !== "running") {
    Tone.context.resume();
  }
});
