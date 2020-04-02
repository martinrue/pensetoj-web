const audio = (() => {
  const getFiles = () => {
    return [
      {
        id: "2",
        url: "/audio/2.mp3",
        title: "02: Lingvo",
        desc: "Mi parolas pri la mirindaĵo de lingvo.",
        time: "09:53"
      },
      {
        id: "1",
        url: "/audio/1.mp3",
        title: "01: Saluton",
        desc:
          "En tiu ĉi unua alŝuto mi prezentas la projekton kaj parolas pri kial mi ĝin kreis.",
        time: "01:55"
      }
    ];
  };

  return {
    getFiles: getFiles
  };
})();
