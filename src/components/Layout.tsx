import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children, current }: { children: ReactNode; current?: string }) {
  return (
    <>
      <Header current={current} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
