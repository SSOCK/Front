interface ClubProps {
  title: string;
  img: string;
  loc: string;
  participate: number;
}

export default function Club({ title, img, loc, participate }: ClubProps) {
  return (
    <div className="flex flex-col p-3 cursor-pointer h-80">
      <div className="overflow-hidden basis-2/3 rounded-md border-2">
        <img className="" src={img} alt="challengeImg" />
      </div>
      <div className="pb-5 basis-1/3 pt-2">
        <div className="font-bold text-md">{title}</div>
        <div className="flex">
          <div className="text-sm pr-2">📍{loc}</div>
          <div className="text-sm">🧑‍🤝‍🧑{participate}명</div>
        </div>
      </div>
    </div>
  );
}
