import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    className: '',
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'radio',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    asChild: {
      table: { disable: true },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    label: 'Button',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    label: 'Button',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    label: 'Button',
    variant: 'link',
  },
};
