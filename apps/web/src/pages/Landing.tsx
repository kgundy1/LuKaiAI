import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>LuKaiAI — From idea to working software</title>
        <meta name="description" content="A free workflow for building software with Claude. Bring your idea to life — no developers, no agencies, one subscription." />
      </Helmet>
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
