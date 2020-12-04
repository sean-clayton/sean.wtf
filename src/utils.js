export function isExternal(url) {
  return /^(https?|mailto):\/\//.test(url);
}

export function formatDate(date) {
  return date.toLocaleDateString(
    undefined,
    { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  );
}
