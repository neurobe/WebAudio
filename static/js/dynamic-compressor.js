'use strict';
var dynamicsCompressor = {
  init: function bf_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
    //setting biquad default value
    this.threshold = -24;
    this.knee = 30;
    this.ratio = 12;
    this.attack = 0.003;
    this.release = 0.250;
  },
  run: function bf_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function bf_play() {
    this.setupGraph();
    //reset with last values
    this.dynamicsCompressor.threshold.value = this.threshold;
    this.dynamicsCompressor.knee.value = this.knee;
    this.dynamicsCompressor.ratio.value = this.ratio;
    this.dynamicsCompressor.attack.value = this.attack;
    this.dynamicsCompressor.release.value = this.release;
    this.source.start(0);
  },
  stop: function bf_stop() {
    this.source.stop(0);
  },
  changeThreshold: function bf_changeThreshold(input) {
    var val = input / 10;
    this.dynamicsCompressor.threshold.value = val;
    this.threshold = val;
    document.getElementById("threshold").nextSibling.innerHTML = val + "db";
  },
  changeKnee: function bf_changeKnee(input) {
    var val = input;
    this.dynamicsCompressor.knee.value = val;
    this.knee = val;
    document.getElementById("knee").nextSibling.innerHTML = val + "db";
  },
  changeRatio: function bf_changeRatio(val) {
    this.dynamicsCompressor.ratio.value = val;
    this.ratio = val;
  },
  changeAttack: function bf_changeAttack(input) {
    var val = input / 1000;
    this.dynamicsCompressor.attack.value = val;
    this.attack = val;
    document.getElementById("attack").nextSibling.innerHTML = val + "db";
  },
  changeRelease: function bf_changeRelease(input) {
    var val = input / 1000;
    this.dynamicsCompressor.release.value = val;
    this.release = val;
    document.getElementById("release").nextSibling.innerHTML = val + "db";
  },
  setupGraph: function bf_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.dynamicsCompressor = this.context.createDynamicsCompressor();
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.dynamicsCompressor);
    this.dynamicsCompressor.connect(this.context.destination);
  }
};