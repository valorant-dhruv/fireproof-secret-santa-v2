'use client';
import Link from 'next/link';
import Default from '@/app/ui/Default_Home/index';
import Group from '@/app/ui/Group/index';
import AcmeLogo from '@/app/ui/acme-logo';

export default function Page() {
  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-800">
        <Group />
        <Default />
      </div>
    </div>
  );
}
