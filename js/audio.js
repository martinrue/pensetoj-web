const audio = (() => {
  const getFiles = () => {
    return [
      {
        id: "5",
        url: "/audio/5.mp3",
        title: "05: Persisto",
        desc: "Mi rakontas amuzan rakonton kiu temas pri persisto.",
        time: "14:48"
      },
      {
        id: "4",
        url: "/audio/4.mp3",
        title: "04: Serĉu Inspiron",
        desc: "Mi parolas pri kial mi senĉese serĉas inspiron.",
        time: "06:06"
      },
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
