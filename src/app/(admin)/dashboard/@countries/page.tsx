import React from 'react';
import Image from 'next/image';
import img from '/public/images/world.svg';
import clsx from 'clsx';
import DashboardCard from '@/app/components/dashboard-card';
import { getCompanies, getCountries} from '@/lib/api';
import getCountById from '@/lib/utils/getCountById';


export default async function Page() {
    const countries = await getCountries();
    const companies = await getCompanies();
    const counts = getCountById(companies, 'countryId');
  return (
    <DashboardCard label="Countries of companies">
      <div className="flex items-end pb-5 px-5 gap-2">
        <div>
        {countries.map(({ id, title }) => (
            <p
              key={id}
              className={clsx(
                'text-sm text-gray-900 font-medium',
                'before:inline-block before:w-2 before:h-2 before:rounded-full before:align-middle before:mr-2 before:bg-purple-200',
              )}
            >{`${title} - ${counts[id] || 0}`}</p>
          ))}
        </div>
        <Image width={395} height={262} src={img} alt="world" />
      </div>
    </DashboardCard>
  );
}