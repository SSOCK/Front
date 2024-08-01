import mockRouter from 'next-router-mock';
import { RecoilRoot } from 'recoil';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import HeadBar from '@components/headBar';
import HeaderProfile from '@components/headerProfile';
import { ProfileRecoil } from '@atoms/atoms';

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
  it('RunningMate Text with Login', () => {
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

  it('Click Test for Club', () => {
    mockUsePathname.mockImplementation(() => '/');
    render(
      <RecoilRoot
        initializeState={(snapshot) =>
          snapshot.set(ProfileRecoil, mockedProfile)
        }
      >
        <HeadBar />
      </RecoilRoot>,
      { wrapper: MemoryRouterProvider }
    );
    const clubBtn = screen.getByRole('button', { name: '클럽' });
    fireEvent.click(clubBtn);
    expect(mockRouter.pathname).toEqual('/club');
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
