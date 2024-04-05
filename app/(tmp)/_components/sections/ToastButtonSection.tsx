'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import Section from '@/app/(tmp)/_components/Section';

const ToastButtonSection = () => {
  const onClickDefault = () => {
    toast('토스트 !');
  };

  const onClickSuccess = () => {
    toast.success('토스트 성공 !');
  };

  const onClickError = () => {
    toast.error('토스트 에러 !');
  };

  return (
    <Section title="Button">
      <div className="flex justify-center items-center gap-4">
        <Button onClick={onClickDefault}>Button</Button>
        <Button onClick={onClickSuccess}>Toast Success</Button>
        <Button onClick={onClickError}>Toast Error</Button>
      </div>
    </Section>
  );
};

export default ToastButtonSection;
