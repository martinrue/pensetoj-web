const audio = (() => {
  const getFiles = () => {
    return [
      {
        id: "1",
        url: "/audio/1.mp3",
        title: "01: Saluton",
        desc:
          "En tiu ĉi unua alŝuto mi prezentas la projekton kaj parolas pri kial mi ĝin kreis.",
        time: "01:42"
      }
    ];
  };

  return {
    getFiles: getFiles
  };
})();
