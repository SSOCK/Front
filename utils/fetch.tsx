export async function refreshAccessToken() {
  const respones = await fetch('/api/auth/refresh', {
    method: 'post',
    credentials: 'include',
  });
  if (respones.status !== 201) {
    //실패시 처리
    return;
  }
  if (!respones.ok) throw new Error('accessToken 재발급에 실패했습니다.');

  const data: {
    'access-token': string;
  } = await respones.json();

  sessionStorage.setItem('access-token', `Bearer ${data['access-token']}`);
  return;
}

export async function fetchWithRetry(url: string, options: RequestInit) {
  try {
    options.headers = { ...options.headers, Authorization: getAccessToken() };
    const respones = await fetch(url, options);
    if (respones.ok) return await respones.json();

    await refreshAccessToken();
    options.headers = { ...options.headers, Authorization: getAccessToken() };
    const respones2 = await fetch(url, options);
    return await respones2.json();
  } catch (error) {
    console.error('fetch중 에러발생:', error);
  }
}

export function getAccessToken() {
  return sessionStorage.getItem('access-token') ?? 'no-token';
}
