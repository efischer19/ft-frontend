export function setCachedData(key, data, expiry) {
  const TWO_HOURS = 1000 * 60 * 20;
  sessionStorage.setItem(
    key,
    `${expiry || Date.now() + TWO_HOURS}|${data}`,
  );
}

export function getCachedData(key) {
  let ret = sessionStorage.getItem(key);
  if (!ret) { return undefined; }
  ret = ret.split('|', 2);
  const expiry = ret[0];
  const data = ret[1];
  if (Date.now() < expiry) {
    return data;
  }
  return undefined;
}
