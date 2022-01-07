const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt = 0;
let player;
let dla;
let mr;
let lstream;

// start button
startButton.addEventListener('click', function () {
    AddRow()
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
        lstream=stream
        mr = new MediaRecorder(stream)
        mr.ondataavailable = function(e) {
            player.src = e
            dla.href = e
            dla.download = 'voice_' + cnt + '.wav'
        }
        let context = new AudioContext()
        let input = context.createMediaStreamSource(stream)
        let processor = context.createScriptProcessor(1024, 1, 1)

        input.connect(processor)
        processor.connect(context.destination)

        processor.onaudioprocess = function(e) {
            console.log(e.inputBuffer.getChannelData(0))
        }
    })
});

// stop button
stopButton.addEventListener('click', function () {
    lstream.getTracks().forEach(track => track.stop())
});

function AddRow(){
    cnt+= 1
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt)
    dla = document.getElementById('dl' + cnt)
}