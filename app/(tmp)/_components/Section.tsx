interface SectionProps extends React.PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Section;
