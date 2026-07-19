import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { siteConfig } from '../config/site';

export const TermsConditions = () => {
  return (
    <div className="legal-page px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto">
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for using Dinesh Kumar's freelance web development portfolio website."
        canonicalPath="/terms-and-conditions"
      />

      <span className="section-kicker">Legal</span>
      <h1>Terms &amp; Conditions</h1>
      <p className="legal-updated">Last updated: July 19, 2026</p>

      <section>
        <h2>1. Website Use</h2>
        <p>
          This website is provided to showcase my freelance web development services, portfolio
          projects and contact options. By using this website, you agree to use it lawfully and
          respectfully.
        </p>
      </section>

      <section>
        <h2>2. Project Enquiries</h2>
        <p>
          Submitting an enquiry does not create a client relationship or guarantee project
          acceptance. A project begins only after scope, timeline, pricing, payment terms and
          deliverables are agreed in writing.
        </p>
      </section>

      <section>
        <h2>3. Pricing and Availability</h2>
        <p>
          Pricing shown on the website is an indicative starting point. Final quotes depend on
          project scope, features, content, integrations, timelines and support requirements.
          Availability may change based on current workload.
        </p>
      </section>

      <section>
        <h2>4. Portfolio Content</h2>
        <p>
          Project descriptions, screenshots and previews are provided for portfolio purposes.
          All third-party names, brands and project references remain the property of their
          respective owners.
        </p>
      </section>

      <section>
        <h2>5. External Links</h2>
        <p>
          This website may link to external websites, live projects, WhatsApp, booking pages or
          other tools. I am not responsible for the content, security or policies of external
          websites.
        </p>
      </section>

      <section>
        <h2>6. No Warranty</h2>
        <p>
          I aim to keep this website accurate and available, but I do not guarantee that it will
          always be error-free, uninterrupted or fully up to date.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For questions about these terms, contact Dinesh Kumar at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </section>

      <Link to="/" className="legal-back-link">Back to Home</Link>
    </div>
  );
};

export default TermsConditions;
