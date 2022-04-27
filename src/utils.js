export function isExternal(url) {
  return /^(https?|mailto):\/\//.test(url);
}

/**
 * formatDate
 * @param {Date} date
 */
export function formatDate(date) {
  return date.toISOString().split("T")[0];
}
