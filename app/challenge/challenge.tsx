interface ChallengeProps {
  title: string;
  img: string;
  introduce: string;
  period: string;
  participate: number;
}

export default function Challenge({
  title,
  img,
  introduce,
  period,
  participate,
}: ChallengeProps) {
  return (
    <div className="bg-red-300 flex flex-col p-3 cursor-pointer">
      <div className="overflow-hidden basis-2/3">
        <img className="rounded-md" src={img} alt="challengeImg" />
      </div>
      <div className="pb-5 basis-1/3 pt-2">
        <div className="font-bold text-lg">{title}</div>
        <div>{introduce}</div>
        <div>{period}</div>
        <div>{participate}명 참여중</div>
      </div>
    </div>
  );
}
