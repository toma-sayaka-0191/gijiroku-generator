import Recorder from "./recorder.js"

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt = 0;
let player;
let dla;
let flg = false;

const recorder = new Recorder()

// start button
startButton.addEventListener('click', async function () {

    let url = ""

    recorder.start()

    do {
        await setTimeout(DoWhileRecord, 5000);

        url = recorder.stop()
        player.src = url
        dla.href = url
        dla.download = 'voice_' + cnt + '.wav';

    } while (flg = false);
});

// stop button
stopButton.addEventListener('click', function () {
    flg = true
});

function DoWhileRecord(){
    cnt+= 1;
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt);
    dla = document.getElementById('dl' + cnt);
};