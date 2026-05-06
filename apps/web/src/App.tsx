import { useReveal } from './hooks/useReveal';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Story from './components/Story';
import Frustration from './components/Frustration';
import BigReceipt from './components/BigReceipt';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Frustration />
        <BigReceipt />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
