
import React from 'react';

import CompanyTable from '../../components/company-table';

import getQueryClient from '@/lib/getQueryClient';
import { getCompanies } from '@/lib/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export interface PageProps{

}
export default async function Page({}: PageProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies({ cache: 'no-store' }),
    staleTime: 10 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
   
  return (
    <HydrationBoundary state={dehydratedState}>
    <CompanyTable />
  </HydrationBoundary>
  );
}