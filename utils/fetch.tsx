import logout from './logout';

export async function refreshAccessToken() {
  const respones = await fetch('/api/auth/refresh', {
    method: 'post',
    credentials: 'include',
  });

  if (!respones.ok) {
    logout();
    throw new Error('accessToken 재발급에 실패했습니다.');
  }

  const data: {
    'access-token': string;
  } = await respones.json();

  sessionStorage.setItem('access-token', `Bearer ${data['access-token']}`);
  return;
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  href?: string
) {
  try {
    options.headers = { ...options.headers, Authorization: getAccessToken() };
    const response = await fetch(url, options);
    if (response.status !== 401) return response;

    await refreshAccessToken();
    options.headers = { ...options.headers, Authorization: getAccessToken() };
    const response2 = await fetch(url, options);
    return response2;
  } catch (error) {
    logout(href);
  }
}

export function getAccessToken() {
  return sessionStorage.getItem('access-token') ?? 'no-token';
}
