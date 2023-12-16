import { FC, useState } from 'react';
import Searchbar from '@/app/ui/Searchbar/index';
import GroupList from '@/app/ui/GroupList/index';
import { Button } from '../button';
import { useLiveQuery, fireproof } from 'use-fireproof';

const Group = () => {
  let [group, setgroup] = useState('');
  let [grouplimit, setgrouplimit] = useState('');

  async function groupcreated() {
    const regex = /^[1-9]\d*$/;
    const regex2 = /^\S*$/;

    if (!regex.test(grouplimit)) {
      alert('Invalid input for group limit');
      return;
    }

    if (!regex2.test(group)) {
      alert('The given group name cannot have whitespaces');
      return;
    }
    let db = fireproof(group);
    console.log('The new database is created', db);
    let result = await db.put({ limit: grouplimit, date: Date.now() });
    console.log('The document has been added');
  }
  return (
    <div className="flex w-64 flex-col">
      <div className="flex h-0 flex-1 flex-col bg-gray-900">
        <div className="relative z-0 flex flex-1 overflow-y-auto">
          <div className="flex w-full flex-col justify-between py-6">
            <div className="flex-1 space-y-1 px-2">
              <h2 className="text-lg font-semibold text-white">
                Create a Group
              </h2>
              <div className="mt-6 flex flex-grow flex-col">
                <input
                  className="rounded-lg bg-gray-700 px-4 py-2 text-white"
                  placeholder="Enter Group Name"
                  type="text"
                  value={group}
                  onChange={(e) => {
                    setgroup(e.target.value);
                  }}
                />
                <br />
                <input
                  className="rounded-lg bg-gray-700 px-4 py-2 text-white"
                  placeholder="Enter member limit"
                  type="text"
                  value={grouplimit}
                  onChange={(e) => {
                    setgrouplimit(e.target.value);
                  }}
                />
                <Button
                  onClick={groupcreated}
                  className="mt-4 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                  Create
                </Button>
              </div>
              <GroupList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
