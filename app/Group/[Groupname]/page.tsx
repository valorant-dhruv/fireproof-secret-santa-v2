'use-client';

import Groupdetails from '@/app/ui/Groupdetails';

export default function Page({ params }: { params: { Groupname: string } }) {
  console.log('This is the parameter received', params);
  return (
    <div>
      <Groupdetails groupname={params.Groupname} />
    </div>
  );
}
