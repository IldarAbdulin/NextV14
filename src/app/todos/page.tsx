'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/screens/layout/Layout';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTodos = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=20`
    );
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    setTodos(json);
    setLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);
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
            <p className="text-red-600">Users not found...</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
