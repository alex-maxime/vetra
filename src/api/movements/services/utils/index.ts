// Avoid date with hour, minutes, or seconds set
function normalise(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isAfterDate(date1: Date, date2: Date): boolean {
  return normalise(date1).getTime() > normalise(date2).getTime();
}

export function isBeforeDate(date1: Date, date2: Date): boolean {
  return normalise(date1).getTime() < normalise(date2).getTime();
}

export function isSameOrAfterDate(date1: Date, date2: Date): boolean {
  return isSameDate(date1, date2) || isAfterDate(date1, date2);
}

export function isSameOrBeforeDate(date1: Date, date2: Date): boolean {
  return isSameDate(date1, date2) || isBeforeDate(date1, date2);
}
