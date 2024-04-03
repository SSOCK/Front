import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import Section from '@/app/(tmp)/_components/Section';

const LabelSection = () => {
  return (
    <Section title="Label">
      <Label htmlFor="uiLabel">Label</Label>
      <Input id="uiLabel" />
    </Section>
  );
};

export default LabelSection;
