import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Story from '../components/Story';
import Frustration from '../components/Frustration';
import BigReceipt from '../components/BigReceipt';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

export default function Landing() {
  useReveal();
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Story />
        <Frustration />
        <BigReceipt />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
