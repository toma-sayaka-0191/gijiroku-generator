const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt = 0;
let url = '';
let player;
let dla;
let mic, recorder, soundFile;


// start button
startButton.addEventListener('click', function () {
    mic = new p5.AudioIn()
    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();

    mic.start()
    recorder.setInput(mic);
    recorder.record(soundFile);
});

// stop button
stopButton.addEventListener('click', function () {
    let url
    recorder.stop();
    mic.stop()
    url = saveSound(soundFile, 'voice_' + cnt + '.wav')
    player.src = url
    dla.href = url
    dla.download = 'voice_' + cnt + '.wav'
});

function AddRow(){
    cnt+= 1
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt)
    dla = document.getElementById('dl' + cnt)
}