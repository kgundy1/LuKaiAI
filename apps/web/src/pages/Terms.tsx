import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — LuKaiAI</title>
        <meta name="description" content="Terms of service for LuKaiAI." />
      </Helmet>
      <Nav />
      <main id="main" className="min-h-screen bg-void">
        <div className="max-w-[720px] mx-auto pt-32 pb-20 px-6">
          <h1 className="font-serif text-4xl text-lk-text-primary mb-2">Terms of Service</h1>
          <p className="text-sm text-lk-text-dim mb-12">Last updated: May 28, 2026</p>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">About</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is an educational platform that teaches people to build software with Claude. It is operated by Kevin Gundy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Use of the Service</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You may use LuKaiAI for personal educational purposes. You may not resell, redistribute, or scrape the content. You may not use LuKaiAI to harm others or violate any law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Account Responsibility</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You are responsible for keeping your password secret and for everything that happens under your account. Notify contact@lukaiai.com if your account is compromised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Content and Intellectual Property</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              All course content, text, and code on LuKaiAI is owned by Kevin Gundy. You may not reproduce or redistribute it without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">No Warranties</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is provided as-is. There are no guarantees about your outcomes from following the course. Building software takes time and effort and results depend on what you put in.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Limitation of Liability</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is not liable for any damages arising from your use of the service to the maximum extent permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Termination</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I may suspend or terminate accounts that violate these terms or harm the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Changes to These Terms</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I may update these terms over time. Continued use of LuKaiAI means you accept the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Contact</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              Questions: <a href="mailto:contact@lukaiai.com" className="text-lk-cyan hover:text-lk-cyan/80">contact@lukaiai.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
