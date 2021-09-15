export const sleep = (sec = 1): Promise<void> => new Promise((res) => {
  setTimeout(res, sec * 1000);
});
