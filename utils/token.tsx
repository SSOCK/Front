export function getAccessTokenPayload() {
  const token = window.sessionStorage
    .getItem('access-token')
    ?.split(' ')
    .pop() as string;
  if (!token) throw new Error('access-token이 존재하지 않습니다');
  const base64Payload = token.split('.')[1]; // jwt = header.payload.signature형식
  const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  ) as { sub: 'string'; username: string; exp: number };

  return decodedJWT;
}
