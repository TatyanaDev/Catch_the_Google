export function formatTime(seconds, useVerboseFormat = false) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (useVerboseFormat) {
    return `${minutes}m ${secs}s`;
  } else {
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = secs.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
