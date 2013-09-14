'use strict';
var biquadFilter = {
  init: function bf_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
  },
  run: function gt_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function gt_play() {
    this.setupGraph();
    this.source.start(0);
    //set all values as default
    this.changeFrequency(this.biquadFilter.frequency.defaultValue);
    this.changeDetune(this.biquadFilter.detune.defaultValue);
    this.changeGain(this.biquadFilter.gain.defaultValue);
    this.changeQ(0);
  },
  stop: function gt_stop() {
    this.source.stop(0);
  },
  changeFrequency: function gt_changeFrequency(val) {
    this.biquadFilter.frequency.value = val;
    document.getElementById("frequency").nextSibling.innerHTML = val;
  },
  changeDetune: function gt_changeDetune(val) {
    this.biquadFilter.detune.value = val;
    document.getElementById("detune").nextSibling.innerHTML = val + "%";
  },
  changeType: function gt_changeType(val) {
    this.biquadFilter.type = val;
  },
  changeGain: function gt_changeGain(val) {
    this.biquadFilter.gain.value = val;
    document.getElementById("gain").nextSibling.innerHTML = val;
  },
  changeQ: function gt_changeQ(val) {
    var input = Math.pow(10, val);
    this.biquadFilter.Q.value = input;
    document.getElementById("Q").nextSibling.innerHTML = input;
  },
  setupGraph: function gt_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.biquadFilter = this.context.createBiquadFilter();
    for(var i in this.biquadFilter.frequency) {
      console.log(i, ": ", this.biquadFilter.frequency[i]);
    }
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.biquadFilter);
    this.biquadFilter.connect(this.context.destination);
  }
};