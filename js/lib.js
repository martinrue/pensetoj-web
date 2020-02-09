const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const toArray = nodes => Array.prototype.slice.call(nodes);

const lib = (() => {
  const onReady = fn => {
    document.addEventListener("DOMContentLoaded", fn);
  };

  const plural = (n, stem) => {
    return stem + (n !== 1 ? "j" : "");
  };

  return {
    onReady: onReady,
    plural: plural
  };
})();
