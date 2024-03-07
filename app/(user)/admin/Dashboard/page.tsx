'use client'
import React from 'react';
import { getAuthDetails } from '@/app/middelware/AuthDetails';
import Snippet from './pages/snippet';
import Qoutes from './pages/qoutes';
import Resume from './pages/resume';

interface User {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const page: React.FC = async () => {
  const userDataString = JSON.parse(getAuthDetails());
  // const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URI + `/api/get-users`)
  // const users: User[] = await res.json();
  // const userKeys = Object.keys(users[0]);
  // const columns = userKeys.map((key) => ({
  //   uid: key,
  //   name: key.charAt(0).toUpperCase() + key.slice(1),
  //   sortable: true,
  // }));
  // columns.push({
  //   uid: "actions",
  //   name: "Actions",
  //   sortable: false,
  // });
  // const INITIAL_VISIBLE_COLUMNS = ["_id","first_name", "last_name", "email", "actions"];
  return (
    <main>
      <div className='relative h-screen mb-32'>
        <div className='flex text-gray-700 justify-between px-5 mt-5 shadow-4xl border-b border-gray-300'>
          <span className='text-2xl font-semibold'>Hello, Welcome {userDataString.first_name} {userDataString.last_name}</span>
        </div>
        <div className='p-5 flex flex-col overflow-auto border-2'>
          <span className='relative text-gray-700 font-semibold'>SOURCE CODE</span>
            <Snippet/>
          <span className='relative text-gray-700 font-semibold mt-4'>QOUTES AND WORDINGS</span>
            <Qoutes/>
          <span className='relative text-gray-700 font-semibold mt-4'>RESUME and Application</span>
            <Resume/>
        </div>
        <div className='p-5 space-y-4'>
          <div className=" text-black">
            {/* <Table 
              columns={columns} 
              users={users as any} 
              initialVisibleColumns={INITIAL_VISIBLE_COLUMNS} 
              statusOptions={[]}  //Add your own options
              renderCell={renderCell}
              reload={[] as any} //put your function here for auto display
            /> */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default page;
