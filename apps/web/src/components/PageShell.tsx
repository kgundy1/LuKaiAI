import { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import BrandTexture from './BrandTexture';

interface PageShellProps {
  children: ReactNode;
  brandTexture?: boolean;
  mainClassName?: string;
}

export default function PageShell({
  children,
  brandTexture = false,
  mainClassName = 'pt-24 px-6 pb-20',
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-void flex flex-col relative overflow-hidden">
      <Nav />
      {brandTexture && <BrandTexture />}
      <main id="main" className={`flex-1 relative z-[2] ${mainClassName}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
