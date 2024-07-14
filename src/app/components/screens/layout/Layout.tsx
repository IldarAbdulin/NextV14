import { PropsWithChildren } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <section className="w-[80%] m-auto flex flex-col h-[100%]">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </section>
  );
}
