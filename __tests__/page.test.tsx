import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import { ProfileRecoil } from '@atoms/atoms';
import HeadBar from '@components/headBar';

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

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
