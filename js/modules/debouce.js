export default function debounce(callback, tempo){
  let timer = null;

  return function(...args) {

    if(timer !== null){
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), tempo);
  }
}