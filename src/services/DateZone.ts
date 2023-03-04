import { Locale } from './Locale';

export const DateZone = (dateTime: Date) => {
  const date = new Date(dateTime.toString());
  return new Intl.DateTimeFormat(Locale[0].languageTag, {
    timeZone: 'UTC',
  }).format(date);
};
