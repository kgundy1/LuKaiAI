import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import {
  WhatThisIs,
  Principle,
  HowItWorks,
  Cost,
  WhoFor,
} from '../components/LandingSections';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

export default function Landing() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>LuKaiAI — Understand AI and build real things with it</title>
        <meta name="description" content="Learn to use AI to build real, working software — even with zero tech background. No course fees; you just need your own Claude subscription." />
      </Helmet>
      <Nav />
      <main id="main">
        <Hero />
        <WhatThisIs />
        <Principle />
        <HowItWorks />
        <Cost />
        <WhoFor />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
