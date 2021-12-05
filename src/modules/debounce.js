let timeoutId;

export default function debounce(callback, delay) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    callback();
    timeoutId = undefined;
  }, delay);
}
