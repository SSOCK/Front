'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';

const CourseFormSchema = z.object({
  title: z.string().min(2).max(20),
  difficulty: z.number().min(0).max(2),
});

const example = {
  course: [
    {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      latitude: 37.775,
      longitude: -122.4184,
    },
  ],
  distance: 12.34, //MAX 300
  title: 'Morning Run',
  difficulty: 1, //0: Easy, 1: Medium, 2: Hard
};

export default function AddCourse() {
  const form = useForm<z.infer<typeof CourseFormSchema>>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: '',
      difficulty: 0,
    },
  });
  return <div></div>;
}
