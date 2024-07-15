'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/screens/layout/Layout';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getTodos } from '@/redux/slices/todos-slice/todos-slice';

export default function Todos() {
  const { todos, error, loading } = useAppSelector(({ todos }) => todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <Layout>
      <section>
        <h1 className="text-center text-[30px] mb-[-5px] mt-2">Todos:</h1>
        <div className="mt-10">
          {loading ? (
            <p>Loading...</p>
          ) : todos.length ? (
            todos.map(({ id, title, completed }) => (
              <div key={id} className="my-1 flex justify-between">
                <div className="flex">
                  <p>{id}.</p>
                  <p>Title: {title}</p>
                </div>
                <div>Completed: {completed ? 'true' : 'false'}</div>
              </div>
            ))
          ) : (
            <p className="text-red-600">{error}</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
