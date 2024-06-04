export const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
    arr.slice(index * size, index * size + size)
  );
};
