import { Button } from '@/components/ui/button';

import Section from '@/app/(tmp)/_components/Section';

const ButtonSection = () => {
  return (
    <Section title="Button">
      <div className="flex flex-wrap gap-2">
        <div className="bg-black">
          <Button variant="link" className="text-white">
            About us
          </Button>
          <Button variant="link" className="text-white">
            Contact
          </Button>
        </div>
        <Button>Sign In</Button>
        <div className="bg-black">
          <Button variant="link" className="text-white text-xs">
            Terms of Service
          </Button>
          <Button variant="link" className="text-white text-xs">
            Privacy Policy
          </Button>
        </div>
        <Button>Send a Message</Button>
        <Button>Take a Practice Test</Button>
        <Button variant="secondary">Save without Practice Test</Button>
        <Button variant="destructive">Skip the Practice Test</Button>
        <Button>Cancel</Button>
        <Button>Go to main page</Button>
        <Button>Save</Button>
        <Button variant="destructive">Close Account</Button>
        <div className="w-80">
          <Button className="w-full">Submit an Inquiry</Button>
        </div>
        <div className="w-80">
          <Button className="w-full">See a Detail</Button>
        </div>
        <div className="bg-green-300">
          <Button variant="link">See the explanation →</Button>
        </div>
        <div className="bg-red-300">
          <Button variant="link">See the explanation →</Button>
        </div>
        <Button variant="link">Back to overall result →</Button>
        <Button>Take a Practice Test</Button>
        <div className="w-80">
          <Button className="w-full">Take a Test</Button>
        </div>
        <Button>Create a Test</Button>
        <Button>Start a Test</Button>
        <Button variant="secondary">Back to previous question</Button>
        <Button variant="secondary">Go to next question</Button>
        <Button variant="secondary">Submit and finish test</Button>
        <Button>Submit and finish test</Button>
        <Button variant="destructive">Submit and finish test</Button>
        <Button>Cancel</Button>
        <Button variant="ghost">Cancel</Button>
        <Button>Submit and finish test</Button>
        <Button>Continue to solve the problem</Button>
        <Button>Submit the answer sheet below</Button>
      </div>
    </Section>
  );
};

export default ButtonSection;
