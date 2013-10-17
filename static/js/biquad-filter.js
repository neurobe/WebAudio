'use strict';
var biquadFilter = {
  init: function bf_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
    //setting biquad default value
    this.frequency = 500;
    this.type = "allpass";
    this.Q = 1;
    this.gain = 100;
    this.detune = 10;
  },
  run: function bf_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function bf_play() {
    this.setupGraph();
    //reset with last values
    this.biquadFilter.frequency.value = this.frequency;
    this.biquadFilter.type = this.type;
    this.biquadFilter.Q.value = this.Q;
    this.biquadFilter.detune.value = this.detune;
    this.biquadFilter.gain.value = this.gain;
    this.source.start(0);
  },
  stop: function bf_stop() {
    this.source.stop(0);
  },
  changeFrequency: function bf_changeFrequency(val) {
    this.biquadFilter.frequency.value = val;
    this.frequency = val;
    document.getElementById("frequency").nextSibling.innerHTML = val;
  },
  changeDetune: function bf_changeDetune(val) {
    this.biquadFilter.detune.value = val;
    this.detune = val;
    document.getElementById("detune").nextSibling.innerHTML = val + "%";
  },
  changeType: function bf_changeType(val) {
    this.biquadFilter.type = val;
    this.type = val;
  },
  changeGain: function bf_changeGain(val) {
    this.biquadFilter.gain.value = val;
    this.gain = val;
    document.getElementById("gain").nextSibling.innerHTML = val;
  },
  changeQ: function bf_changeQ(val) {
    var input = Math.pow(10, val);
    this.biquadFilter.Q.value = input;
    this.Q = input;
    document.getElementById("Q").nextSibling.innerHTML = input;
  },
  setupGraph: function bf_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.biquadFilter = this.context.createBiquadFilter();
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.biquadFilter);
    this.biquadFilter.connect(this.context.destination);
  }
};