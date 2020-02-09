const data = (() => {
  const state = {
    likes: {},
    listens: 0,
    listenCache: {},
    onLike: null,
    onListenData: null
  };

  const post = (data, path) => {
    const base = "https://api.pensetoj.martinrue.com";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    return fetch(base + path, options)
      .then(response => response.json())
      .catch(() => null);
  };

  const notifyLikeUpdates = () => {
    Object.keys(state.likes).forEach(id => {
      state.onLike && state.onLike(id, state.likes[id]);
    });
  };

  const notifyListenDataUpdate = () => {
    state.onListenData && state.onListenData(state.listens);
  };

  const fetchData = () => {
    const url = "https://api.pensetoj.martinrue.com/summary";

    return fetch(url)
      .then(response => response.json())
      .catch(err => {
        return {
          listensTotal: 0,
          likes: {}
        };
      });
  };

  const updateData = stats => {
    state.listens = stats.listensTotal;
    state.likes = stats.likes;

    notifyLikeUpdates();
    notifyListenDataUpdate();
  };

  const init = () => {
    fetchData().then(updateData);
  };

  const onLike = fn => {
    state.onLike = fn;
  };

  const onListenData = fn => {
    state.onListenData = fn;
  };

  const addLike = id => {
    post({ type: "like", id: id }, "/actions").then(updateData);
  };

  const addListen = id => {
    if (state.listenCache[id]) {
      return;
    }

    state.listenCache[id] = true;
    post({ type: "listen", id: id }, "/actions").then(updateData);
  };

  return {
    init: init,
    onLike: onLike,
    onListenData: onListenData,
    addLike: addLike,
    addListen: addListen
  };
})();
