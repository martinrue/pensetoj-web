const items = (() => {
  let lastProgressTick = 0;

  const createItem = item => {
    const $elem = $(".items .item.template").cloneNode(true);

    $elem.dataset.id = item.id;
    $elem.classList.remove("template");

    $elem.querySelector(".buttons .time").innerText = item.time;
    $elem.querySelector(".details .title").innerText = item.title;
    $elem.querySelector(".details .desc").innerText = item.desc;
    $elem.querySelector(".details .progress .bar").style.width = "0px";
    $elem.querySelector(".likes .total").innerText = "0";

    $elem.querySelector(".buttons .btn").addEventListener("click", () => {
      player.playPause(item.id);
    });

    $elem
      .querySelector(".likes .like-button")
      .addEventListener("click", function() {
        if (this.classList.contains("selected")) {
          return;
        }

        this.classList.add("selected");
        data.addLike(item.id);
      });

    $elem
      .querySelector(".details .progress")
      .addEventListener("click", function(event) {
        const percent = parseFloat(
          (event.offsetX / this.clientWidth).toFixed(3)
        );

        player.seek(item.id, percent);
      });

    return $elem;
  };

  const setButtonClass = (element, value) => {
    element.classList.remove("play", "pause", "loading");
    element.classList.add(value);
  };

  const resetButtons = () => {
    const buttons = $$(".items .item:not(.template) .buttons .btn");

    toArray(buttons).forEach(button => {
      setButtonClass(button, "play");
    });
  };

  const resetBars = () => {
    const bars = $$(".items .item:not(.template) .details .progress .bar");

    toArray(bars).forEach(bar => {
      bar.style.width = "0px";
    });
  };

  const setProgress = (id, progress) => {
    if (progress !== null) {
      if (progress === lastProgressTick) {
        return;
      }

      lastProgressTick = progress;
    } else {
      progress = lastProgressTick;
    }

    const container = $('.item[data-id="' + id + '"] .details .progress');
    const bar = $('.item[data-id="' + id + '"] .details .progress .bar');

    bar.style.width =
      parseFloat((container.clientWidth * progress).toFixed(0)) + "px";
  };

  const onPlayerEvent = (event, id, data) => {
    if (event === "progress") {
      setProgress(id, data);
      return;
    }

    resetButtons();

    const button = $('.item[data-id="' + id + '"] .buttons .btn');

    if (event === "loading") {
      setButtonClass(button, "loading");
    }

    if (event === "playing") {
      setButtonClass(button, "pause");
    }

    if (event === "paused") {
      setButtonClass(button, "play");
    }

    if (event === "stopped") {
      setButtonClass(button, "play");
      resetBars();
    }
  };

  const onLikeUpdate = (id, total) => {
    const likesTotal = $('.item[data-id="' + id + '"] .likes .total');
    likesTotal.innerText = total;
  };

  const render = files => {
    files.forEach(file => {
      $(".items").appendChild(createItem(file));
    });

    player.onEvent(onPlayerEvent);
    data.onLike(onLikeUpdate);

    window.addEventListener("resize", () => {
      const id = player.getCurrent();

      if (id) {
        setProgress(id, null);
      }
    });
  };

  return {
    render: render
  };
})();
