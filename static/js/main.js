import Recorder from "./recorder.js"

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');
const player = document.getElementById('player');
const dla = document.getElementById('dl');

const recorder = new Recorder()

// start button
startButton.addEventListener('click', function () {
    player.src = ""
    recorder.start()
    tbody.appendChild("<tr><td><audio id='player' controls src=''></audio></td><td><a id='dl'>DL</a></td></tr>")
});

// stop button
stopButton.addEventListener('click', function () {
    const url = recorder.stop()
    player.src = url
    dla.href = url
    dla.download = 'test.wav';
});