const audio = (() => {
  const getFiles = () => {
    return [
      {
        id: "3",
        url: "/audio/3.mp3",
        title: "03: Adaptado",
        desc:
          "Mi parolas pri adaptado kaj kial oni devus pensi pri ĝi por daŭre pliboniĝi.",
        time: "10:53"
      },
      {
        id: "2",
        url: "/audio/2.mp3",
        title: "02: Lingvo",
        desc: "Mi parolas pri la mirindeco de lingvo.",
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
