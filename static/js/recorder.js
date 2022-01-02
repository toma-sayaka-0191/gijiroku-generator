import Init from "./init.js"
import Encoder from "./encoder.js"

const init= new Init()

export default class {
  
  constructor() {
    this.encoderOptions = {
      bitRate: 128,
      sampleRate: 44100
    }

    this.bufferSize = 4096

    this.wavSamples = []
    this.stream = null
    this.context = null
    this.input = null
    this.processor = null
  }

  async start() {
    this.stream = (await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }))
    console.log(this.wavSamples)
    this.captureStart()
  }

  stop() {
    this.stream.getTracks().forEach((track) => track.stop())
    this.input.disconnect()
    this.processor.disconnect()
    this.context.close()


    const encoder = new Encoder({
      bufferSize: this.bufferSize,
      sampleRate: this.encoderOptions.sampleRate,
      samples: this.wavSamples
    })
    const url = encoder.finish()
    this.wavSamples = []

    return url
  }

  captureStart() {
    this.context = new window.AudioContext()
    this.input = this.context.createMediaStreamSource(this.stream)
    this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1)

    this.processor.onaudioprocess = (ev) => {
      let sample
      do {
        await DoWhileStart
        sample = await ev.inputBuffer.getChannelData(0)
        await this.wavSamples.push(new Float32Array(sample))
        await DoWhileStop
      } while (flg = false);

    }

    this.input.connect(this.processor)
    this.processor.connect(this.context.destination)
  }


  DoWhileStart(){
    cnt+= 1
    init.init.insertAdjacentHTML('beforeend', "<tr><td><audio id='player" + cnt + "' controls src=''></audio></td><td><a id='dl" + cnt + "'>DL</a></td></tr>")
    init.player = document.getElementById('player' + cnt)
    init.dla = document.getElementById('dl' + cnt)
    console.log('DoWhileStart')
  };
  
  DoWhileStop(){
    init.url = recorder.stop()
    init.player.src = url
    init.dla.href = url
    init.dla.download = 'voice_' + cnt + '.wav'
    console.log('DoWhileStop')
    console.log(init.flg)
  };
}
