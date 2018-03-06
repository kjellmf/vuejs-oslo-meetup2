import formatcoords from 'formatcoords';

export function formatDateString(value) {
  const d = new Date(value);
  return d.toDateString();
}

export function formatPosition(value) {
  if (value) {
    return formatcoords(value, true).format({decimalPlaces:2});
  }
}
