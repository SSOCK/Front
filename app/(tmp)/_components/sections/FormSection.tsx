import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import Form from '@/app/(tmp)/_components/Form';
import Section from '@/app/(tmp)/_components/Section';

const FormSection = () => {
  return (
    <>
      <Section title="Form">
        <Form />
      </Section>
    </>
  );
};

export default FormSection;
