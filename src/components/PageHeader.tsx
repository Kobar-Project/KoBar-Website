import type { ReactNode } from 'react';
import { Container, Eyebrow } from './ui';

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="glow border-b border-line">
      <Container className="pt-16 pb-14 sm:pt-20 lg:pt-24 lg:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[2.5rem] sm:text-[3.25rem]">{title}</h1>
        {children && <div className="mt-6 max-w-2xl space-y-4 text-lg text-fg">{children}</div>}
      </Container>
    </div>
  );
}
