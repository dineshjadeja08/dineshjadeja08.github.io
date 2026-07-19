import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { siteConfig } from '../config/site';

export const PrivacyPolicy = () => {
  return (
    <div className="legal-page px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Dinesh Kumar's freelance web development portfolio and project enquiry form."
        canonicalPath="/privacy-policy"
      />

      <span className="section-kicker">Legal</span>
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: July 19, 2026</p>

      <section>
        <h2>1. Information I Collect</h2>
        <p>
          When you submit a project enquiry, I may collect your name, email address, phone number,
          business name, project type, budget range, timeline and message details. This information
          is provided voluntarily through the contact form or direct communication channels.
        </p>
      </section>

      <section>
        <h2>2. How I Use Your Information</h2>
        <p>
          I use your information to reply to enquiries, understand your project requirements,
          schedule calls, prepare quotes and provide freelance web development services.
          I do not sell your personal information.
        </p>
      </section>

      <section>
        <h2>3. Form Processing</h2>
        <p>
          This website uses Formspree to process contact form submissions. Formspree receives the
          form data you submit so it can deliver the enquiry to me. You can review Formspree's
          privacy practices on their official website.
        </p>
      </section>

      <section>
        <h2>4. Analytics and Links</h2>
        <p>
          Basic interaction events may be tracked to understand how visitors use the site, such as
          clicking project links, booking buttons or WhatsApp links. External links, including
          WhatsApp, booking tools and live project links, are governed by their own privacy policies.
        </p>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>
          I keep enquiry details only as long as needed to respond, discuss the project, provide
          services, maintain business records or comply with reasonable legal obligations.
        </p>
      </section>

      <section>
        <h2>6. Your Choices</h2>
        <p>
          You can request that I update or delete your enquiry information by contacting me at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For privacy questions, contact Dinesh Kumar at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </section>

      <Link to="/" className="legal-back-link">Back to Home</Link>
    </div>
  );
};

export default PrivacyPolicy;
