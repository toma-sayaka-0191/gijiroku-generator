import Recorder from "./recorder.js"

const player = document.getElementById('player');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const dla = document.getElementById('dl');

const recorder = new Recorder()

// start button
startButton.addEventListener('click', function () {
    player.src = ""
    recorder.start()
});

// stop button
stopButton.addEventListener('click', function () {
    const url = recorder.stop()
    console.log(url)
    player.src = url
    dla.href = url
    dla.download = 'test.wav';
});