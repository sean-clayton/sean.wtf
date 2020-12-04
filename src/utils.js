export function isExternal(url) {
  return /^(https?|mailto):\/\//.test(url);
}
