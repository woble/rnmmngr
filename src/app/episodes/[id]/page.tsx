'use client';

import { useParams } from 'next/navigation';

import { PageSection } from '@/components';

export default function EpisodePage(): JSX.Element {
  const { id } = useParams();
  return <PageSection title="Episode">{id}</PageSection>;
}
