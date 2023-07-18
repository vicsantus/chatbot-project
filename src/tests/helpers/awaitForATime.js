export default function awaitForATime(action, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      action();
      resolve();
    }, time);
  });
}