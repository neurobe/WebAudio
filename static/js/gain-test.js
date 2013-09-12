'use strict';

var gainTest = {
  init: function gt_init() {
    if (this.context) return;
    var AudioContext = window.AudioContext || window.webkit-AudioContext;
    this.context = new AudioContext();
    this.playing = false;
  },
  load: function gt_load(url) {
    this.init();
    var request = new XMLHttpRequest(),
      self = this;
      //url = "sound/sample.ogg";
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function(el) {
      self.context.decodeAudioData(
        request.response,
        function (output) {
          if (!output) {
            console.log("decode url fail, buffer is empty");
            return;
          }
          self.buffer = output;
        },
        function (error) {
          if (error) {
            console.log("decode error: ", error);
          } else {
            console.log("decode error: unknown error");
          }
        }
      );
    };
    request.onerror = function(msg,url,l) {
      var errMsg = "There was an error on this page.\n\n";
      errMsg += "Error: " + msg + "\n";
      errMsg += "URL: " + url + "\n";
      errMsg += "Line: " + l + "\n\n";
      console.log(errMsg);
      return true;
    };
    request.send();
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
  control: function gt_control(val) {
    this.gainNode.gain.value = val/100;
  },
  setupGraph: function gt_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.gainNode = this.context.createGain();
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }
};