import { Input } from '@/components/ui/input';

import Section from '@/app/(tmp)/_components/Section';

const InputSection = () => {
  return (
    <Section title="Input">
      <div className="flex flex-col gap-4">
        <Input />
        <Input disabled />
        <Input type="file" />
        <Input type="password" />
        <Input type="number" />
        <Input type="email" />
        <Input type="url" />
        <Input type="search" />
        <Input type="date" />
      </div>
    </Section>
  );
};

export default InputSection;
