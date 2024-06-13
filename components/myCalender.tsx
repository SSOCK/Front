import { Calendar } from '@/components/ui/calendar';

export default function MyCalender() {
  const date = new Date();

  return (
    <div className="shadow">
      <Calendar mode="single" selected={date} />
    </div>
  );
}
