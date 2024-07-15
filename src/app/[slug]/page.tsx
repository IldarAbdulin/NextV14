'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Layout from '../components/screens/layout/Layout';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUser } from '@/redux/slices/users-slice/users-slice';

export default function UserPage() {
  const params = useParams();
  const { back } = useRouter();
  const { user, error, loading } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();

  const goBack = () => back();

  useEffect(() => {
    dispatch(getUser(params.slug));
  }, [dispatch]);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : user.id ? (
        <>
          <button
            onClick={goBack}
            className="border border-black p-2 duration-100 hover:border-blue-400"
          >
            Go Back
          </button>
          <h1 className="text-center text-[30px]">{user.name}</h1>
          <nav className="my-5">
            <ul className="list-disc">
              <li>Username: {user.username}</li>
              <li>Phone: {user.phone}</li>
              <li>Website: {user.website}</li>
              <li>Email: {user.email}</li>
              <li>
                Address:{' '}
                <div className="px-5">Street: {user.address?.street}</div>
                <div className="px-5">City: {user.address?.city}</div>
                <div className="px-5">Zipcode: {user.address?.zipcode}</div>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <button
            onClick={goBack}
            className="border border-black p-2 duration-100 hover:border-blue-400"
          >
            Go Back
          </button>
          <p className="text-red-500">{error}</p>
        </>
      )}
    </Layout>
  );
}
