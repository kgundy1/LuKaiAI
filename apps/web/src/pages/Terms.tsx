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
          <p className="text-sm text-lk-text-dim mb-12">Last updated: June 1, 2026</p>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">1. About</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is an educational platform that teaches people a workflow for building software
              with AI tools. It is operated by Kevin Gundy ("LuKaiAI," "I," "me," or "we"). By creating
              an account or using the site, you agree to these Terms of Service. If you do not agree,
              do not use LuKaiAI.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">2. Eligibility</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You must be at least 13 years old to use LuKaiAI. If you are under the age of majority
              where you live, you may only use the service with the involvement of a parent or guardian.
              By using LuKaiAI you represent that you meet these requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">3. Use of the Service</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You may use LuKaiAI for your own personal, educational purposes. You may not resell,
              redistribute, scrape, or republish the content; use the service to break any law or to
              harm, harass, or infringe the rights of others; attempt to gain unauthorized access to
              the service or its systems; or interfere with its normal operation. I may limit, suspend,
              or remove access for conduct that violates these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">4. Account Responsibility</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You are responsible for keeping your password secret and for everything that happens
              under your account. Notify contact@lukaiai.com promptly if you believe your account has
              been compromised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">5. Content You Submit</h2>
            <p className="text-lk-text-secondary leading-relaxed mb-3">
              LuKaiAI lets you submit information about projects you build, including a project name,
              link, description, and a display name (collectively, "Submissions"). You keep ownership
              of your Submissions. By submitting them, you grant LuKaiAI a non-exclusive, worldwide,
              royalty-free license to host, display, and share them in connection with operating and
              promoting the service. You can ask to have a Submission removed at any time by emailing
              contact@lukaiai.com.
            </p>
            <p className="text-lk-text-secondary leading-relaxed mb-3">
              You are solely responsible for your Submissions and you represent that you have the right
              to submit them and that they do not infringe anyone's rights or violate any law. You may
              not submit content or links that are unlawful, infringing, defamatory, deceptive,
              malicious, or harmful, or that contain malware or lead to such material.
            </p>
            <p className="text-lk-text-secondary leading-relaxed">
              I have no obligation to monitor Submissions but may review, edit, or remove any
              Submission, or any link, at my discretion and without notice. Projects and links shown on
              LuKaiAI are submitted by users; they are not vetted, verified, or endorsed by LuKaiAI, and
              I am not responsible for third-party sites. If you believe content on LuKaiAI infringes
              your copyright, email contact@lukaiai.com with details and I will respond to valid notices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">6. Intellectual Property</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              Except for your Submissions, all course content, text, code, and design on LuKaiAI is
              owned by Kevin Gundy and protected by intellectual property laws. You may not reproduce,
              distribute, or create derivative works from it without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">7. Third-Party Services and Trademarks</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI teaches you to use third-party tools and services (such as Claude by Anthropic,
              GitHub, and various hosting providers). LuKaiAI is independent and is not affiliated with,
              endorsed by, or sponsored by Anthropic or any other company referenced in the course. All
              product names, logos, and trademarks belong to their respective owners and are used only
              to identify those products. Those tools are governed by their own terms and pricing, which
              are set by the providers and may change at any time. You are responsible for your own
              accounts, subscriptions, and compliance with those providers' terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">8. Educational Purpose — No Professional Advice</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is for general educational purposes only. It is not legal, financial, business,
              security, or other professional advice, and it is not a substitute for advice from a
              qualified professional. Any AI-generated output, suggestions, or critiques provided
              through the service may be inaccurate or incomplete and should be independently verified
              before you rely on them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">9. What You Build Is Your Responsibility</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              Anything you create by following LuKaiAI is yours, and you are solely responsible for it.
              That includes its security, reliability, data handling and privacy, licensing, and legal
              compliance, and any costs you incur with third-party tools. Completing the course does not
              guarantee a working, secure, lawful, or commercially successful result.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">10. No Earnings or Savings Guarantee</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              Any examples, cost comparisons, timelines, or results described on LuKaiAI are
              illustrative, reflect one person's experience, and are not promises or guarantees. Your
              results will depend on your effort, skill, and circumstances, and may differ. Cost figures
              are estimates for context only and are not quotes, appraisals, or guarantees of savings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">11. No Warranties</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              LuKaiAI is provided "as is" and "as available," without warranties of any kind, whether
              express or implied, including any implied warranties of merchantability, fitness for a
              particular purpose, and non-infringement. I do not warrant that the service will be
              uninterrupted, error-free, or secure, or that any content is accurate or current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">12. Limitation of Liability</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              To the maximum extent permitted by law, LuKaiAI and Kevin Gundy will not be liable for any
              indirect, incidental, special, consequential, exemplary, or punitive damages, or for any
              loss of profits, revenue, data, or goodwill, arising out of or related to your use of (or
              inability to use) the service, even if advised of the possibility of such damages. To the
              maximum extent permitted by law, total liability for all claims relating to the service
              will not exceed one hundred U.S. dollars ($100). Some jurisdictions do not allow certain
              limitations, so some of these may not apply to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">13. Indemnification</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              You agree to indemnify and hold harmless LuKaiAI and Kevin Gundy from any claims,
              liabilities, damages, losses, and expenses (including reasonable legal fees) arising out
              of your use of the service, your Submissions, anything you build, or your violation of
              these terms or of any law or third-party right.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">14. Termination</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I may suspend or terminate accounts that violate these terms or harm the service. You may
              stop using LuKaiAI and request deletion of your account at any time by emailing
              contact@lukaiai.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">15. Governing Law and Disputes</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              These terms are governed by the laws of the State of Missouri, without regard to its
              conflict-of-laws rules. You agree that the state and federal courts located in Missouri
              have exclusive jurisdiction over any dispute that is not otherwise resolved. Before filing
              anything, you agree to first contact me at contact@lukaiai.com and try in good faith to
              resolve the dispute informally.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">16. Severability and Entire Agreement</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              If any provision of these terms is found unenforceable, the rest remain in effect. These
              terms, together with the Privacy Policy, are the entire agreement between you and LuKaiAI
              regarding the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">17. Changes to These Terms</h2>
            <p className="text-lk-text-secondary leading-relaxed">
              I may update these terms over time. The "Last updated" date above reflects the latest
              version. Continued use of LuKaiAI after changes means you accept the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-xl text-lk-text-primary mb-3">18. Contact</h2>
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
