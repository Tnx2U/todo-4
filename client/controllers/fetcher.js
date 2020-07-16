function post(path, body) {
  const uri = getBasicUri(path, params);
  return fetch(uri, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
    },
  });
}

function get(path, params) {
  const uri = buildGetUri(path, params);
  console.log(uri);
  return fetch(uri, {
    method: "get",
    headers: {
      Accept: "application/json",
    },
  });
}

function getBasicUri(path) {
  return `http://localhost:3000${path}`;
}

function buildGetUri(path, params) {
  const url = getBasicUri(path);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  return url;
}

export { post, get };
