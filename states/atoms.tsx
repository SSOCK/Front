import { atom } from 'recoil';

interface MapInfo {
  centerLat: number;
  centerLng: number;
}

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

export const MapRecoil = atom<MapInfo>({
  key: 'MapItem',
  default: {
    centerLat: 0,
    centerLng: 0,
  },
});

export const DrawLineRecoil = atom({
  key: 'DrawLine',
  default: {
    drawFlag: false,
    paths: [],
  },
});
