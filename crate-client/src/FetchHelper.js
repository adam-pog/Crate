export function Fetch(url, method, body = null) {
  const token = window.sessionStorage.getItem("token");

  return fetch(url, {
    method: method,
    headers: {
      'Content-Type':'application/json',
      ...(token && {"Authorization" : `Bearer ${token}`})
    },
    ...(body && {body: body})
  })
}
