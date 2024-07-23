import { atom } from 'recoil';

export const ProfileRecoil = atom({
  key: 'Profile',
  default: {
    id: -1,
    username: '',
    email: '',
    name: '',
    profilePicture: '',
  },
});
