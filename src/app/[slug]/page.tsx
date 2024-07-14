'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Layout from '../components/screens/layout/Layout';
import { useEffect, useState } from 'react';

interface IAddress {
  city: string;
  street: string;
  zipcode: string;
}

interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  phone?: string;
  address?: IAddress;
}

export default function UserPage() {
  const params = useParams();
  const { back } = useRouter();
  const [user, setUser] = useState<IUser>({});
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.slug}`
    );
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    setUser(json);
    setLoading(false);
  };
  const goBack = () => back();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </Layout>
  );
}
