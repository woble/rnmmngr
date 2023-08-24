'use client';

import { useParams } from 'next/navigation';

import { PageSection } from '@/components';

export default function LocationPage(): JSX.Element {
  const { id } = useParams();
  return <PageSection title="Location">{id}</PageSection>;
}
