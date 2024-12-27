import React from 'react';

const ManageUsers = () => {
  const users = [
    { id: 1, email: 'jon.snow@got.com', username: 'jonsnow' },
    { id: 2, email: 'cersei.lannister@got.com', username: 'cerseilannister' },
    { id: 3, email: 'jaime.lannister@got.com', username: 'jaimelannister' },
    { id: 4, email: 'arya.stark@got.com', username: 'aryastark' },
    { id: 5, email: 'daenerys.targaryen@got.com', username: 'daenerystargaryen' },
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="overflow-x-auto">
        <h1 className='text-center text-emerald-500 font-bold text-2xl mb-6'>
          Registered Users
        </h1>
        <table className="min-w-full text-left text-sm font-medium">
          <thead className="border-b font-medium text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-6">ID</th>
              <th scope="col" className="px-6 py-6">Email</th>
              <th scope="col" className="px-6 py-6">Username</th>
              <th scope="col" className="px-6 py-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-500 font-normal">
                <td className="whitespace-nowrap px-6 py-4">{user.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button className="text-blue-500 hover:text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ManageUsers };
