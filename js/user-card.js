const userCard = (() => {
  const render = user => {
    data.onListenData(listens => {
      const label = lib.plural(listens, "Aŭskulto");
      $(".user-card .stats .stat:last-child .label").innerText = label;
      $(".user-card .stats .stat:last-child .value").innerText = listens + "";
    });

    requestAnimationFrame(() => {
      $(".user-card .name").innerText = user.name;
      $(".user-card .bio").innerText = user.bio;

      const files = lib.plural(user.files, "Penseto");
      $(".user-card .stats .stat:first-child .value").innerText = user.files;
      $(".user-card .stats .stat:first-child .label").innerText = files;
    });
  };

  return {
    render: render
  };
})();
