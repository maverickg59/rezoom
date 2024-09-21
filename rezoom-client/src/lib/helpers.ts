export const generateUniqueKey = (key: number) => {
  const random = Math.random();
  if (random === key) {
    generateUniqueKey(key);
  }
  return random;
};
