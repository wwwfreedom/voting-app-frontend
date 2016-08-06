export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}

// abbreviate a string the first letter of the first 2 words
export function abbreviate(string) {
  if (!string) return
  let wordCount = string.split(' ').length
  if (wordCount < 2) {
    return string.substr(0, 2).toUpperCase()
  }
  return string.match(/\b\w/g).join('').substr(0, 2).toUpperCase()
}
