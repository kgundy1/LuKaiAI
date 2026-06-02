import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — LuKaiAI</title>
        <meta name="description" content="How LuKaiAI handles your information." />
      </Helmet>
      <Nav />
      <main id="main" className="min-h-screen bg-void">
        <div className="max-w-[720px] mx-auto pt-32 pb-20 px-6">
          <h1 className="font-serif text-4xl text-lk-text-primary mb-2">Privacy Policy</h1>
          <p className="text-sm text-lk-text-dim mb-12">Last updated: June 1, 2026</p>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">What I Collect</h2>
            <p className="text-lk-text-secondary leading-relaxed mb-3">
              When you create an account, I collect your email address and a password (stored only as a
              hashed value, never in plaintext). I also record your progress through lessons.
            </p>
            <p className="text-lk-text-secondary leading-relaxed mb-3">
              When you subscribe to email updates, I collect your email address and, for spam and abuse
              prevention, the IP address used to submit the form.
            </p>
            <p className="text-lk-text-secondary leading-relaxed">
              If you choose to submit a project, I collect the information you provide — project name,
              link, description, and an optional display name. If you mark a project as public, that
              information (including your display name and link) may be shown publicly on the site. Do
              not include anything you don't want to be public.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Why I Collect It</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              To create and secure your account, send you a welcome email and important service notices,
              save your progress so you can pick up where you left off, prevent spam and abuse, and
              display submitted projects you have chosen to share. I do not use your information for
              advertising.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Legal Bases (EEA/UK)</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              If you are in the EEA or UK, I rely on the following legal bases: performing our agreement
              with you (providing the account and course), my legitimate interests (securing the service
              and preventing abuse), and your consent (email updates and public project submissions),
              which you can withdraw at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Who I Share It With</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I do not sell your personal data or share it for advertising. I use a small number of
              service providers to run LuKaiAI — Render (application and database hosting), Cloudflare
              (website hosting and delivery), and Resend (sending email). They process data only to
              provide these services and are bound by their own privacy terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Where Your Data Is Processed</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI and its providers operate primarily in the United States, so your information may
              be processed and stored in the U.S. If you access the service from outside the U.S., you
              understand your information will be transferred there.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">How Long I Keep It</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I keep account and progress data for as long as your account is active. If you delete your
              account, I remove your personal data within a reasonable period, except where I need to
              keep limited records to comply with the law or prevent abuse. Email-subscription records
              are kept until you unsubscribe or ask me to delete them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Cookies</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI uses one essential cookie called lk_session to keep you logged in. No tracking
              cookies, no analytics cookies, and no advertising cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Your Rights</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You can request a copy of your data, ask me to correct it, delete your account, withdraw
              consent, or object to certain processing by emailing contact@lukaiai.com. I will respond
              within a reasonable time. Depending on where you live, you may have additional rights under
              laws such as the GDPR or CCPA; I honor those rights and will not discriminate against you
              for exercising them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Children</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is not intended for children under 13, and I do not knowingly collect their
              personal information. If you believe a child under 13 has signed up, email
              contact@lukaiai.com and I will delete the account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Changes to This Policy</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I may update this policy over time. The "Last updated" date at the top reflects the latest
              version.
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
