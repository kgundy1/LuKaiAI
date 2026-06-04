import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import {
  Problem,
  Principle,
  HowItWorks,
  WhatYouKeep,
  WhoFor,
  Cost,
} from '../components/LandingSections';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

export default function Landing() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>LuKaiAI — Capture, don&apos;t guess</title>
        <meta name="description" content="A free workflow for building real software with Claude — no developers, no agencies, no course fees. You only need your own Claude subscription." />
      </Helmet>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Principle />
        <HowItWorks />
        <WhatYouKeep />
        <WhoFor />
        <Cost />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
