import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import { ProfileRecoil } from '@atoms/atoms';
import HeadBar from '@components/headBar';
import HeaderProfile from '@components/headerProfile';

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

const mockFetch = (flag: boolean, data: any) => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: flag,
      json: () => data,
    })
  );
};

const mockedProfile = {
  id: 1,
  username: 'jestTest',
  email: 'jest@test.com',
  name: 'jest',
  profilePicture: 'https://avatars.githubusercontent.com/u/96722691?v=5',
};

describe('HeadBar', () => {
  it('Check RunningMate Text with Login', () => {
    mockUsePathname.mockImplementation(() => '/');
    render(
      <RecoilRoot
        initializeState={(snapshot) =>
          snapshot.set(ProfileRecoil, mockedProfile)
        }
      >
        <HeadBar />
      </RecoilRoot>
    );
    const text = screen.getByText('RunningMate');
    expect(text).toBeInTheDocument();
  });
});

describe('HeaderProfile', () => {
  it('Login Test', async () => {
    window.fetch = mockFetch(false, '');
    render(
      <RecoilRoot>
        <HeaderProfile />
      </RecoilRoot>
    );
    const text = screen.getByText('로그인 하세요');
    expect(text).toBeInTheDocument();
  });

  it('Non Login Test', async () => {
    window.fetch = mockFetch(false, '');
    render(
      <RecoilRoot
        initializeState={(snapshot) =>
          snapshot.set(ProfileRecoil, mockedProfile)
        }
      >
        <HeaderProfile />
      </RecoilRoot>
    );
    const text = screen.queryByText('로그인 하세요');
    expect(text).toBeNull();
  });
});
