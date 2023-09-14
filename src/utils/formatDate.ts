import momentTz from 'moment-timezone';

const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatDate(date: string | Date | null, widthSeconds?: boolean) {
  let newDate: Date;

  if (date) {
    newDate = new Date(date);
  } else {
    newDate = new Date();
  }

  let format;
  if (widthSeconds) {
    format = 'MM/DD/YYYY - hh:mm a';
  } else {
    format = 'MM/DD/YYYY';
  }

  const momentDate = momentTz(newDate);
  return momentDate.tz(browserTz).format(format);
}
