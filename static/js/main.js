import init from "./init.js"
import Recorder from "./recorder.js"


const init = new init()
const recorder = new Recorder()

// start button
startButton.addEventListener('click', async function () {
    await recorder.start()
});

// stop button
stopButton.addEventListener('click', function () {
    init.flg = true
});
