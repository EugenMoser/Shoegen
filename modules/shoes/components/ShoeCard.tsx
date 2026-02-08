import Link from 'next/link';
import { JSX } from 'react/jsx-dev-runtime';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Shoe } from '../types';

export function ShoeCard({ shoe }: { shoe: Shoe }): JSX.Element {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{shoe.name}</CardTitle>
        <CardDescription>{shoe.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <Link href={`/dashboard/shoe/${shoe.id}`}>Anzeigen</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
