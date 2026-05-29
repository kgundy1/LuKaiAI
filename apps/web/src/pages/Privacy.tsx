import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Nav />
      <main id="main" className="min-h-screen bg-void">
        <div className="max-w-[720px] mx-auto pt-32 pb-20 px-6">
          <h1 className="font-serif text-4xl text-lk-text-primary mb-2">Privacy Policy</h1>
          <p className="text-sm text-lk-text-dim mb-12">Last updated: May 28, 2026</p>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">What I Collect</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              When you sign up, I collect your email address and a password (stored as a hashed value, never in plaintext). I also record your progress through lessons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Why I Collect It</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              To create your account, send you a welcome email and any important service notices, and save your progress so you can pick up where you left off.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Who I Share It With</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I do not sell or share your personal data with third parties. I use Resend to send emails and Render to host the database. These providers are bound by their own privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Cookies</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI uses one essential cookie called lk_session to keep you logged in. No tracking cookies, no analytics cookies, no advertising cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Your Rights</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You can request a copy of your data or delete your account by emailing contact@lukaiai.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Children</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is not intended for users under 13. If you believe a child has signed up, email contact@lukaiai.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">Changes to This Policy</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I may update this policy over time. The Last Updated date at the top reflects the latest version.
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
