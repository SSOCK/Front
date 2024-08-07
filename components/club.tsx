import { useRouter } from 'next/navigation';
import FillPin from '@/public/icons/fillpin.svg';
import People from '@/public/icons/people.svg';

interface ClubProps {
  id: number;
  title: string;
  img: string;
  loc: string;
  participate: number;
}

export default function Club({ id, title, img, loc, participate }: ClubProps) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col p-3 cursor-pointer h-64"
      onClick={() => router.push(`/club/${id}`)}
    >
      <div className="overflow-hidden basis-3/4 rounded-md border-2">
        <img className="" src={img} alt="challengeImg" />
      </div>
      <div className="basis-1/4 pt-2">
        <div className="font-bold text-md">{title}</div>
        <div className="flex">
          <div className="text-sm pr-2">
            <FillPin className="w-4 h-3 inline mr-1" />
            {loc}
          </div>
          <div className="text-sm">
            <People className="w-5 inline mr-2" />
            {participate}명
          </div>
        </div>
      </div>
    </div>
  );
}
