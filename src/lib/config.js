const config = {
  default: {},
};

export function getConfig(name = 'default') {
  return config[name];
}

export function setConfig(key = 'default', newConfig) {
  if (!newConfig) return;
  if (!config[key]) config[key] = {};

  config[key].baseURL = newConfig.baseURL || '/';
  config[key].method = newConfig.method || 'GET';
  config[key].headers = Object.assign(
    { 'X-Requested-With': 'XMLHttpRequest' },
    newConfig.headers,
  );
}
