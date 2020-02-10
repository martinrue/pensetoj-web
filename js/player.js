const player = (() => {
  let state = {
    files: [],
    howl: null,
    current: null,
    duration: 0,
    onEvent: null,
    busy: false,
    animationFrameHandle: null
  };

  const init = data => {
    state.files = data;
  };

  const onEvent = fn => {
    state.onEvent = fn;
  };

  const emit = (event, id, data) => {
    if (state.onEvent) {
      state.onEvent(event, id, data);
    }
  };

  const findFile = id => {
    for (let i = 0; i < state.files.length; i++) {
      if (state.files[i].id === id) {
        return state.files[i];
      }
    }

    return null;
  };

  const notifyProgress = () => {
    if (state.howl && state.howl.playing()) {
      let time = Number(state.howl.seek());

      if (isNaN(time)) {
        time = state.howl._sounds[0]._seek;
      }

      const progress = time / state.duration;
      emit("progress", state.current, parseFloat(progress.toFixed(3)));

      state.animationFrameHandle = requestAnimationFrame(notifyProgress);
    }
  };

  const cleanUp = () => {
    state.howl.unload();

    emit("stopped", state.current);

    state.current = null;
    state.duration = 0;
    state.howl = null;
    state.busy = false;
  };

  const playPause = (id, cb) => {
    if (state.busy) {
      return;
    }

    const file = findFile(id);

    if (!file) {
      console.error("player: could not find file: " + id);
      return;
    }

    state.busy = true;

    if (!state.howl) {
      state.current = file.id;

      emit("loading", file.id);

      setTimeout(() => {
        state.howl = new Howl({
          src: [file.url],
          html5: true
        });

        state.howl.once("load", () => {
          state.busy = false;
          state.duration = state.howl.duration();
          state.howl.play();

          data.addListen(state.current);
        });

        state.howl.on("play", () => {
          state.busy = false;
          notifyProgress();
          emit("playing", id);
        });

        state.howl.on("seek", () => {
          state.busy = false;
          notifyProgress();
        });

        state.howl.on("pause", () => {
          state.busy = false;
          emit("paused", id);
        });

        state.howl.on("end", () => {
          state.busy = false;
          emit("progress", id, 1);

          setTimeout(() => {
            cleanUp();
          }, 500);
        });
      }, 500);

      return;
    }

    if (id !== state.current) {
      cleanUp();
      return playPause(id);
    }

    if (state.howl.playing()) {
      state.howl.pause();
    } else {
      state.howl.play();
      setTimeout(cb || (() => {}), 250);
    }
  };

  const seek = (id, percent) => {
    if (!state.howl || state.current !== id) {
      return;
    }

    if (!state.howl.playing()) {
      return playPause(id, () => seek(id, percent));
    }

    cancelAnimationFrame(state.animationFrameHandle);
    state.howl.seek(state.duration * percent);
  };

  const getCurrent = () => {
    return state.current;
  };

  return {
    init: init,
    onEvent: onEvent,
    playPause: playPause,
    seek: seek,
    getCurrent: getCurrent
  };
})();
