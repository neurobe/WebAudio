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
  },
  stop: function gt_stop() {
    this.source.stop(0);
  },
  changeFrequency: function gt_changeFrequency(val) {
    this.biquadFilter.frequency.value = val;
  },
  changeDetune: function gt_changeDetune(val) {
    this.biquadFilter.detune.value = val;
  },
  changeType: function gt_changeType(val) {
    this.biquadFilter.type = val;
  },
  changeGain: function gt_changeGain(val) {
    this.biquadFilter.gain.value = val;
  },
  setupGraph: function gt_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.biquadFilter = this.context.createBiquadFilter();
    var items = [];
    for (var s in this.biquadFilter) {
      items.push(s);
      console.log(s, ": ", this.biquadFilter[s]);

    }
    items.sort();
    
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.biquadFilter);
    this.biquadFilter.connect(this.context.destination);
  }
};