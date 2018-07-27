export function setData(key, data, expiry) {
  sessionStorage.setItem(
    key,
    `${expiry || Date.now() + (1000 * 60 * 20)}|${data}`,
  );
}

export function getData(key) {
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
