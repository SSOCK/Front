import { useRouter } from 'next/navigation';

interface ChallengeProps {
  id: number;
  title: string;
  img: string;
  introduce: string;
  period: string;
  participate: number;
}

export default function Challenge({
  id,
  title,
  img,
  introduce,
  period,
  participate,
}: ChallengeProps) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col p-3 cursor-pointer h-64"
      onClick={() => router.push(`/challenge/${id}`)}
    >
      <div className="overflow-hidden basis-2/3 rounded-md border-2">
        <img className="" src={img} alt="challengeImg" />
      </div>
      <div className="basis-1/3 pt-2">
        <div className="font-bold text-md">{title}</div>
        <div className="text-sm">{introduce}</div>
        <div className="text-sm">{period}</div>
        <div className="text-sm">{participate}명 참여중</div>
      </div>
    </div>
  );
}
