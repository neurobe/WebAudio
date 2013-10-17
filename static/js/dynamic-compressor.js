'use strict';
var dynamicCompressor = {
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
    this.dynamicCompressor.threshold.value = this.threshold;
    this.dynamicCompressor.knee.value = this.knee;
    this.dynamicCompressor.ratio.value = this.ratio;
    this.dynamicCompressor.attack.value = this.attack;
    this.dynamicCompressor.release.value = this.release;
    this.source.start(0);
  },
  stop: function bf_stop() {
    this.source.stop(0);
  },
  changeThreshold: function bf_changeThreshold(val) {
    this.dynamicCompressor.threshold.value = val;
    this.threshold = val;
    document.getElementById("threshold").nextSibling.innerHTML = val + "db";
  },
  changeKnee: function bf_changeKnee(val) {
    this.dynamicCompressor.knee.value = val;
    this.knee = val;
    document.getElementById("knee").nextSibling.innerHTML = val + "db";
  },
  changeRatio: function bf_changeRatio(val) {
    this.dynamicCompressor.ratio = val;
    this.ratio = val;
  },
  changeAttack: function bf_changeAttack(val) {
    this.dynamicCompressor.attack.value = val;
    this.attack = val;
    document.getElementById("attack").nextSibling.innerHTML = val + "db";
  },
  changeRelease: function bf_changeRelease(val) {
    this.dynamicCompressor.release.value = val;
    this.release = val;
    document.getElementById("release").nextSibling.innerHTML = val + "db";
  },
  setupGraph: function bf_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.dynamicCompressor = this.context.createDynamicCompressor();
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.dynamicCompressor);
    this.dynamicCompressor.connect(this.context.destination);
  }
};