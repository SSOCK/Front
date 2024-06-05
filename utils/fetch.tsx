export async function tryAuthWithRefreshToken() {
  const respones = await fetch('/api/auth/refresh', {
    method: 'post',
    credentials: 'include',
  });
  const data = await respones.json();
  console.log(data);
}
