import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    sessionStorage.removeItem('access-token');
    deleteCookie('refresh-token');
    router.push('/signIn');
  };
  return logout;
};

export default useLogout;
