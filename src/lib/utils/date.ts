export function timeSince(timestamp: number) {
  const now = new Date();
  const date = new Date(timestamp);
  const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

  // if (secondsPast < 60) {
  //   return `${secondsPast} sec`;
  // }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} min`;
  }
  if (secondsPast <= 82800) {
    return `${Math.floor(secondsPast / 3600)} hr`;
  }
  if (secondsPast <= 518400) {
    const day = Math.floor(secondsPast / 86400);
    return `${day} day${day > 1 ? "s" : ""}`;
  }
  if (secondsPast <= 18144000) {
    const week = Math.ceil(secondsPast / 604800);
    return `${week} week${week > 1 ? "s" : ""}`;
  }
  if (secondsPast <= 29030400) {
    const month = Math.ceil(secondsPast / 2592000);
    return `${month}} month${month > 1 ? "s" : ""}`;
  }
  const year = Math.ceil(secondsPast / 31536000);
  return `${year} year${year > 1 ? "s" : ""}`;
}

export const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds

export const hasPassed = (timestamp: string | number, ms: number) => {
  const now = new Date();
  const date = new Date(timestamp);
  const msPassed = now.getTime() - date.getTime();
  return msPassed > ms;
};
