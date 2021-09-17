export const getIndexedArray = (length: Number) => {
  if (length) {
    return Array.from(new Array(length)).map((_, i) => i)
  }
  return []
}
