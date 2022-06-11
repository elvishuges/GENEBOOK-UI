export const copyObject = (object) => {
  const copy = JSON.parse(JSON.stringify(object));
  return copy;
};
