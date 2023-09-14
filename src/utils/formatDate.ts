import momentTz from 'moment-timezone';

const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatDate(date: string | null, notSeconds?: boolean) {
  let newDate: Date;

  if (date) {
    newDate = new Date(date);
  } else {
    newDate = new Date();
  }

  let format;
  if (notSeconds) {
    format = 'MM/DD/YYYY';
  } else {
    format = 'MM/DD/YYYY - hh:mm a';
  }

  const momentDate = momentTz(newDate);
  return momentDate.tz(browserTz).format(format);
}
