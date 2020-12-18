export function getDataFromSeconds(seconds) {
  let days = Math.floor(seconds / 86400);
  let hours = Math.floor((seconds % 86400) / 3600);
  let minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  let tot_seconds = Math.floor(((seconds % 86400) % 3600) % 60);
  return days + " days " + hours + " hours " + minutes + " minutes " + tot_seconds + " seconds";
}
