import { Toaster } from '@/components/ui/sonner'; // temporary import 나중에 Root 에 옮겨야함

import AccordionSection from '@/app/(tmp)/_components/sections/AccordionSection';
import ButtonSection from '@/app/(tmp)/_components/sections/ButtonSection';
import CardSection from '@/app/(tmp)/_components/sections/CardSection';
import InputSection from '@/app/(tmp)/_components/sections/InputSection';
import LabelSection from '@/app/(tmp)/_components/sections/LabelSection';
import RadioGroupSection from '@/app/(tmp)/_components/sections/RadioGroupSection';
import DialogSection from '@/app/(tmp)/_components/sections/DialogSection';
import FormSection from '@/app/(tmp)/_components/sections/FormSection';
import ToastButtonSection from '@/app/(tmp)/_components/sections/ToastButtonSection';

const UIPage = () => {
  return (
    <main>
      <AccordionSection />
      <ButtonSection />
      <CardSection />
      <InputSection />
      <LabelSection />
      <RadioGroupSection />
      <DialogSection />
      <FormSection />
      <ToastButtonSection />
      <Toaster />
    </main>
  );
};

export default UIPage;
