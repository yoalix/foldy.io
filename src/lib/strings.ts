export const generateKeywords = (name: string) => {
  const arrName: string[] = [];
  let curName = "";
  name.split("").forEach((letter) => {
    curName += letter;
    arrName.push(curName);
    arrName.push(curName.toLowerCase());
    arrName.push(curName.toUpperCase());
  });
  return arrName;
};

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
    const week = Math.floor(secondsPast / 604800);
    return `${week} week${week > 1 ? "s" : ""}}`;
  }
  if (secondsPast <= 29030400) {
    const month = Math.floor(secondsPast / 2592000);
    return `${month}} month${month > 1 ? "s" : ""}}}`;
  }
  const year = Math.floor(secondsPast / 31536000);
  return `${year} year${year > 1 ? "s" : ""}}}`;
}
