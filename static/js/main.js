import Recorder from "./recorder.js"

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt;
let player;
let dla;

const recorder = new Recorder()

// start button
startButton.addEventListener('click', function () {
    player.src = ""
    recorder.start()

    cnt=cnt+1
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt);
    dla = document.getElementById('dl' + cnt);
});

// stop button
stopButton.addEventListener('click', function () {
    const url = recorder.stop()
    player.src = url
    dla.href = url
    dla.download = 'test.wav';
});