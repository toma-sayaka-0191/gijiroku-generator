const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');



let cnt = 0;
let url = '';
let player;
let dla;
let flg;
let chunks;
let stream=[];

const mr = new MediaRecorder(stream, {mimeType: 'audio/webm'})


// start button
startButton.addEventListener('click', function () {
    flg = false
    AddRow()
    start()
});

// stop button
stopButton.addEventListener('click', function () {
    flg = true
});

mr.addEventListener('dataavailable', function(e){
    if (e.data.size > 0) {
        chunks.push(e.data)
    }
});

function AddRow(){
    cnt+= 1
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt)
    dla = document.getElementById('dl' + cnt)
};
  
function start() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(s){
        stream = s
    })
};

function stop() {
    stream.getTracks().forEach((track) => track.stop())
    player.srcObject = stream
};

/* function getFunc(url) {
    fetch(url)
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {

    });
}

function post_func(url) {
    // Postで送るパラメータを作成
    let formData = new FormData();
    formData.append('param', document.getElementById('post_param').value);
    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(function() {
        get_func('/get');
    });
} */


/* function DoWhileStop(){
    stream.getTracks().forEach((track) => track.stop())
    url = recorder.stop()
    player.src = url
    dla.href = url
    dla.download = 'voice_' + cnt + '.wav'
}; */
