export const getIndexedArray = (length: Number) => {
  return Array.from(new Array(length)).map((_, i) => i)
}
