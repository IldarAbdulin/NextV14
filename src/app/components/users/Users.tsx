'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersMain() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users${
        value !== '' ? `?username=${value}` : ''
      }`
    );
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    setUsers(json);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [value]);

  return (
    <section>
      <h1 className="text-center text-[30px] font-bold">Users</h1>

      <input
        type="text"
        name="name"
        placeholder="Search by name"
        className="mt-5 w-[100%] outline-none border border-purple-500 p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : users.length ? (
          users.map(({ id, username }) => (
            <div key={id} className="my-1 flex justify-between">
              <div className="flex">
                <p>{id}.</p>
                <p>Username: {username}</p>
              </div>
              <div>
                <Link href={`/${id}`} className="underline">
                  More about user
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-600">Users not found...</p>
        )}
      </div>
    </section>
  );
}
