'use client';

import { Button } from '@/app/ui/components/button';
import { CardHeader, Card } from '@/app/ui/components/card';
import { useFireproof } from 'use-fireproof';

export default function Groupdetails({ groupname }) {
  const { database, useLiveQuery } = useFireproof(groupname);
  const groupdetails = useLiveQuery('date').docs;

  let limit;
  const elements=[];

  if (groupdetails[0]) {
    limit = parseInt(groupdetails[0].limit);
    
    for(let i=0;i<limit;i++)
    {
      elements.push(<Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white"></h3>
          <DotIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
      </Card>)
    }
    console.log('This is the limit', limit);
    console.log('The type of limit is', typeof limit);
  }


  return (
    <div className="flex h-screen overflow-hidden bg-gray-800">
      <div className="flex w-64 flex-col">
        <div className="flex h-0 flex-1 flex-col bg-gray-900">
          <div className="relative z-0 flex flex-1 overflow-y-auto">
            <div className="flex w-full flex-col justify-between py-6">
              <div className="flex-1 space-y-1 px-2">
                <h2 className="text-center text-lg font-semibold text-white">
                  {groupname}
                </h2>
                <div className="mt-6 flex flex-grow flex-col">
                  <input
                    className="rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Name"
                    type="text"
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Address"
                    type="text"
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Wishlist Item 1"
                    type="text"
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Wishlist Item 2"
                    type="text"
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Wishlist Item 3"
                    type="text"
                  />
                  <Button className="mt-4 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <main className="relative z-0 flex-1 overflow-y-auto bg-red-500 focus:outline-none">
          <div className="py-6">
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-center text-3xl font-bold text-white">
                Merry Christmas {groupname}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {elements}
                {/* <Card>
                  <CardHeader className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Dhruv</h3>
                    <DotIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Dhruval
                    </h3>
                    <DotIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Sakshi</h3>
                    <DotIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Muskan</h3>
                    <DotIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                </Card> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
  );
}
