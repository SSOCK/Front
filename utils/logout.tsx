import { deleteCookie } from 'cookies-next';

const logout = () => {
  sessionStorage.removeItem('access-token');
  deleteCookie('refresh-token');
  window.location.href = '/signin';
};

export default logout;
