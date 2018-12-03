/*!
 *  Howler.js OpenGameArt.org Audio Player
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
// Setup our new audio player class and pass it the playlist.

// Cache references to DOM elements.
var elms = ["duration", "playBtn", "pauseBtn", "progress", "loading", "list"];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;
};
Player.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === "number" ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file + ".webm", data.file + ".mp3"],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
          // Start upating the progress of the track.
          requestAnimationFrame(self.step.bind(self));

          document.getElementById("pauseBtn" + data.id).style.display = "block";
        },
        onload: function() {
          document.getElementById("loading" + data.id).style.display = "none";
        },

        onseek: function() {
          // Start upating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Show the pause button.
    if (sound.state() === "loaded") {
      document.getElementById("playBtn" + data.id).style.display = "none";
      document.getElementById("pauseBtn" + data.id).style.display = "block";
    } else {
      document.getElementById("loading" + data.id).style.display = "block";
      document.getElementById("playBtn" + data.id).style.display = "none";
      document.getElementById("pauseBtn" + data.id).style.display = "none";
    }

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Puase the sound.
    sound.pause();

    // Show the play button.
    document.getElementById(
      "playBtn" + self.playlist[self.index].id
    ).style.display =
      "block";
    document.getElementById(
      "pauseBtn" + self.playlist[self.index].id
    ).style.display =
      "none";
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    document.getElementById(
      "progress" + self.playlist[self.index].id
    ).style.width =
      (seek / sound.duration() * 100 || 0) + "%";

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  }
};
var index;
var player = [];
for (index = 0; index < test.length; ++index) {
  // Bind our player controls
  player[test[index].id] = new Player([test[index]]);
  addevents(test[index].id, player);
}

function addevents(idv, player) {
  $("#playBtn" + idv).bind("click", { id: idv }, function(event) {
    player[idv].play();
  });
  $("#pauseBtn" + idv).bind("click", { id: idv }, function(event) {
    player[idv].pause();
  });
}
