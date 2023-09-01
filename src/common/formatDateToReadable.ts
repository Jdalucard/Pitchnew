import momentTz from 'moment-timezone';

const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatDateToReadable(date: Date, notSeconds: boolean) {
  const newDate = new Date(date);
  let format;
  if (notSeconds) {
    format = 'MM/DD/YYYY';
  } else {
    format = 'MM/DD/YYYY - hh:mm a';
  }

  const momentDate = momentTz(newDate);
  return momentDate.tz(browserTz).format(format);
}
