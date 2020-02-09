const audio = (() => {
  const getFiles = () => {
    return [
      {
        id: "2",
        url: "/audio/2.mp3",
        title: "02: La Dua",
        desc: "Kaj tiu ĉi, nesurprize, estas la dua ekzempla sondosiero",
        time: "01:00"
      },
      {
        id: "1",
        url: "/audio/1.mp3",
        title: "01: La Unua",
        desc: "Tiu ĉi nur estas la unua ekzempla sondosiero",
        time: "00:06"
      }
    ];
  };

  return {
    getFiles: getFiles
  };
})();
