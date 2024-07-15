'use client';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getUsers } from '@/redux/slices/users-slice/users-slice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersMain() {
  const { users, error, loading } = useAppSelector(({ users }) => users);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(getUsers(value));
  }, [dispatch, value]);

  return (
    <section>
      <h1 className="text-center text-[30px] font-bold">Users</h1>

      <input
        type="text"
        name="name"
        placeholder="Search by username"
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
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </section>
  );
}
