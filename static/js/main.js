const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt = 0;
let url = '';
let player;
let dla;
let stream;
let flg = false;

// start button
startButton.addEventListener('click', async function () {
    await AddRow();
    do {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        setTimeout(function(){}, 10000);
        player.srcObject = stream;
        console.log(stream)
        stream.getTracks().forEach((track) => track.stop())
    } while (flg = false);
    

});

// stop button
stopButton.addEventListener('click', function () {
    flg = true;
});

function AddRow(){
    cnt+= 1
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt)
    dla = document.getElementById('dl' + cnt)
};
  

/* async function start() {
    stream = (await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }))
    console.log(this.wavSamples)
    this.captureStart()
};
 */

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
