export default function debounce(callback, tempo) {
  let timer = null;

  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), tempo);
  };
}
