const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const tbody = document.getElementById('tbody');

let cnt = 0;
let player;
let downloadLink;

// for audio
let audio_sample_rate = null;
let scriptProcessor = null;
let audioContext = null;

// audio data
let audioData = [];
let bufferSize = 1024;

let stopFlg;
let maxBufFlg;
let elapsedTime, startTime, nowTime;
let muonFlg;

let lstream;

// start button
startButton.addEventListener('click', function () {
    stopFlg=false
    AddRow()
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);
    maxBufFlg=false
});

// stop button
stopButton.addEventListener('click', function () {
    stopFlg=true
});

function AddRow(){
    cnt+= 1
    audioData = [];
    tbody.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='downloadLink" + cnt + "'>DL</a></td></tr>")
    player = document.getElementById('player' + cnt)
    downloadLink = document.getElementById('downloadLink' + cnt)
}

// getusermedia
let handleSuccess = function (stream) {
    lstream=stream;
    audioContext = new AudioContext();
    audio_sample_rate = audioContext.sampleRate;
    scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
    var mediastreamsource = audioContext.createMediaStreamSource(stream);
    mediastreamsource.connect(scriptProcessor);
    scriptProcessor.onaudioprocess = onAudioProcess;
    scriptProcessor.connect(audioContext.destination);
};

// save audio data
var onAudioProcess = function (e) {
    var input = e.inputBuffer.getChannelData(0);
    var bufferData = new Float32Array(bufferSize);
    for (var i = 0; i < bufferSize; i++) {
        bufferData[i] = input[i];
    }

    console.log(Math.abs(bufferData[0]));

    if (maxBufFlg==false && Math.abs(bufferData[0])>0.01){
        maxBufFlg=true
    }

    if (Math.abs(bufferData[0])>0.01){
        muonFlg=false
    }

    if (maxBufFlg==true){
        audioData.push(bufferData);
    }

    if (maxBufFlg==true && muonFlg==false && Math.abs(bufferData[0])<0.01){
        muonFlg=true
        startTime = new Date();
    }

    if (maxBufFlg==true && muonFlg==true && Math.abs(bufferData[0])<0.01){
        nowTime = new Date();
        elapsedTime = Math.floor((nowTime - startTime) / 1000);
    }

    if (stopFlg == true || (maxBufFlg==true && elapsedTime > 1 && Math.abs(bufferData[0])<0.01)){
        let url = exportWAV(audioData)
        downloadLink.href = url
        player.src = url
        downloadLink.download = 'test.wav'
        audioContext.close()
        lstream.getTracks().forEach(track => track.stop())
        if (stopFlg == false){
            AddRow()
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess)
            maxBufFlg=false
        }
    }
    if (stopFlg == true){
        scriptProcessor.disconnect()
        scriptProcessor.onaudioprocess = null
    }
};

// export WAV from audio float data
let exportWAV = function (audioData) {

    let encodeWAV = function (samples, sampleRate) {
    let buffer = new ArrayBuffer(44 + samples.length * 2);
    let view = new DataView(buffer);

    let writeString = function (view, offset, string) {
        for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    let floatTo16BitPCM = function (output, offset, input) {
        for (let i = 0; i < input.length; i++ , offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    };

    writeString(view, 0, 'RIFF');  // RIFF?????????
    view.setUint32(4, 32 + samples.length * 2, true); // ????????????????????????????????????
    writeString(view, 8, 'WAVE'); // WAVE?????????
    writeString(view, 12, 'fmt '); // fmt????????????
    view.setUint32(16, 16, true); // fmt???????????????????????????
    view.setUint16(20, 1, true); // ??????????????????ID
    view.setUint16(22, 1, true); // ??????????????????
    view.setUint32(24, sampleRate, true); // ???????????????????????????
    view.setUint32(28, sampleRate * 2, true); // ???????????????
    view.setUint16(32, 2, true); // ?????????????????????
    view.setUint16(34, 16, true); // ????????????????????????????????????
    writeString(view, 36, 'data'); // data????????????
    view.setUint32(40, samples.length * 2, true); // ??????????????????????????????
    floatTo16BitPCM(view, 44, samples); // ???????????????

    return view;
    };

    let mergeBuffers = function (audioData) {
    let sampleLength = 0;
    for (let i = 0; i < audioData.length; i++) {
        sampleLength += audioData[i].length;
    }
    let samples = new Float32Array(sampleLength);
    let sampleIdx = 0;
    for (let i = 0; i < audioData.length; i++) {
        for (let j = 0; j < audioData[i].length; j++) {
        samples[sampleIdx] = audioData[i][j];
        sampleIdx++;
        }
    }
    return samples;
    };

    let dataview = encodeWAV(mergeBuffers(audioData), audio_sample_rate);
    let audioBlob = new Blob([dataview], { type: 'audio/wav' });

    let myURL = window.URL || window.webkitURL;
    let url = myURL.createObjectURL(audioBlob);
    return url;
};
