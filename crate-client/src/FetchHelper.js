import Cookies from 'js-cookie';

export function Fetch(url, method, body = null) {
  const csrf_token = Cookies.get('CSRF-Token');

  return fetch(url, {
    method: method,
    headers: {
      'Content-Type':'application/json',
      ...(csrf_token && {"X-CSRF-Token" : `${csrf_token}`})
    },
    credentials: 'include',
    ...(body && {body: body})
  })
}
