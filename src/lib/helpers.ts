export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
export function getCurrentTimeInChicago(): Date {
  const now = new Date();

  const offsetChicago = -6; 
  now.setHours(now.getUTCHours() + offsetChicago);

  return now;
}

export function formatTimeForChicago(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "CST",
  };

  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  formattedTime += " CST";

  return formattedTime;
}
``;
