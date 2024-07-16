import { deleteCookie } from 'cookies-next';

const logout = (href?: string) => {
  sessionStorage.removeItem('access-token');
  const deleteCookieOptions = {
    path: '/api/auth/refresh',
  };
  deleteCookie('refresh-token', deleteCookieOptions);
  if (href) window.location.href = href;
};

export default logout;
