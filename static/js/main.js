const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt = 0;
let player;
let dla;
let blobs;
let processor;
let lstream;

// start button
startButton.addEventListener('click', function () {
    AddRow()
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
        lstream=stream

        let context = new AudioContext()
        let input = context.createMediaStreamSource(stream)
        processor = context.createScriptProcessor(1024, 1, 1)

        input.connect(processor)
        processor.connect(context.destination)
        processor.onaudioprocess = function(e) {
            if (e.data && e.data.size > 0) {
                blobs.push(e.data);
              }
            console.log(e.inputBuffer.getChannelData(0))
        }
    })
});

// stop button
stopButton.addEventListener('click', function () {
    let url
    lstream.getTracks().forEach(track => track.stop())
    url = window.URL.createObjectURL(new Blob(blobs),{type:"audio/webm"});
    player.src = url    
    processor.disconnect()
    processor.onaudioprocess = null
//    dla.href = url
//    dla.download = 'voice_' + cnt + '.wav'
});

function AddRow(){
    cnt+= 1
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt)
    dla = document.getElementById('dl' + cnt)
}