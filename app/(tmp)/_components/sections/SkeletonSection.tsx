import { Skeleton } from '@/components/ui/skeleton';

import Section from '@/app/(tmp)/_components/Section';

const SkeletonSection = () => {
  return (
    <Section title="Skeletons">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Section>
  );
};

export default SkeletonSection;
