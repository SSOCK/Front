import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Section from '@/app/(tmp)/_components/Section';

const AccordionSection = () => {
  return (
    <Section title="Accordion">
      <Accordion type="single" collapsible>
        {FAQS.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

const FAQS = [
  {
    question: 'What exactly is PlusAlpha?',
    answer:
      'PlusAlpha is a specialized online platform designed to cater to the needs of students studying AP Calculus in the USA. It provides a comprehensive array of math problems, resources, and tools specifically tailored to enhance learning and preparation for the AP Calculus exam.',
  },
  {
    question: 'How can PlusAlpha benefit me as an AP Calculus student?',
    answer:
      'PlusAlpha offers a dynamic learning environment where students can access a wide range of practice problems, quizzes, and instructional materials aligned with the AP Calculus curriculum. By utilizing our platform, students can strengthen their understanding of calculus concepts, improve problem-solving skills, and ultimately boost their performance on the AP exam.',
  },
  {
    question:
      'Is PlusAlpha suitable for all levels of AP Calculus proficiency?',
    answer:
      'Yes, PlusAlpha caters to students at various skill levels, from beginners to advanced learners. Our platform features content ranging from fundamental calculus principles to challenging problem sets, ensuring that students of all abilities can find resources suited to their needs and level of mastery.',
  },
  {
    question: 'How does PlusAlpha differ from other math problem websites?',
    answer:
      'Unlike generic math problem websites, PlusAlpha focuses specifically on the AP Calculus curriculum, providing targeted resources and practice materials that directly align with the content and format of the AP exam. Additionally, PlusAlpha offers features such as progress tracking, personalized recommendations, and interactive tools designed to optimize the learning experience for AP Calculus students.',
  },
  {
    question: 'Is PlusAlpha accessible on different devices and platforms?',
    answer:
      'Yes, PlusAlpha is designed to be accessible across various devices and platforms, including desktop computers, laptops, tablets, and smartphones. Whether you prefer to study at home or on the go, you can access our platform conveniently through any internet-connected device, allowing for flexible and convenient learning opportunities.',
  },
];

export default AccordionSection;
