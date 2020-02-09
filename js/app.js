const app = (() => {
  const setDimensions = () => {
    const $logo = $(".logo");
    const $card = $(".user-card");
    const height = $logo.clientHeight + $card.clientHeight / 2 - 10;

    $("header").style.height = Math.round(height) + "px";
    $("header").style.marginBottom = $card.clientHeight / 2 + 20 + "px";

    $(".content").style.visibility = "visible";
  };

  const renderUserCard = files => {
    userCard.render({
      name: "Martin",
      bio: "Bonvenon al mia hazardpensetejo.",
      files: files.length
    });
  };

  const renderItems = files => {
    items.render(files);
  };

  const init = () => {
    const files = audio.getFiles();

    lib.onReady(() => {
      player.init(files);

      renderUserCard(files);
      renderItems(files);
      setDimensions();

      data.init();
    });
  };

  return {
    init: init
  };
})();
