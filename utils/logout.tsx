import { deleteCookie } from 'cookies-next';

const logout = (href?: string) => {
  sessionStorage.removeItem('access-token');
  deleteCookie('refresh-token');
  if (href) window.location.href = href;
};

export default logout;
