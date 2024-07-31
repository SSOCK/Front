import { useSetRecoilState } from 'recoil';
import { getAccessToken, refreshAccessToken } from '@utils/fetch';
import logout from '@utils/logout';
import { getAccessTokenPayload } from '@utils/token';
import { ProfileRecoil } from '@atoms';

interface Profile {
  id: number;
  username: string;
  email: string;
  name: string;
  profilePicture: string;
}

export default function useSetProfile() {
  const setData = useSetRecoilState(ProfileRecoil);
  const setProfile = async () => {
    try {
      await refreshAccessToken();

      const payload = getAccessTokenPayload();
      const username = payload.username;

      const responses = await fetch(`/api/member/profile/${username}`, {
        method: 'get',
        headers: { Authorization: getAccessToken() },
      });
      if (!responses.ok) {
        logout();
        throw new Error('profile 정보 불러오기에 실패했습니다.');
      }

      const data: Profile = await responses.json();
      setData(data);
    } catch (error) {
      logout();
    }
  };

  return setProfile;
}
