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
    await refreshAccessToken();

    const payload = getAccessTokenPayload();
    const username = payload.username;

    const respones = await fetch(`/api/member/profile/${username}`, {
      method: 'get',
      headers: { Authorization: getAccessToken() },
    });
    if (!respones.ok) {
      logout();
      throw new Error('profile 정보 불러오기에 실패했습니다.');
    }

    const data: Profile = await respones.json();
    setData(data);
  };

  return setProfile;
}
