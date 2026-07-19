import { useEffect, useState } from 'react';
import { useForm as useFormspree, ValidationError } from '@formspree/react';
import { AlertTriangle, Calendar, CheckCircle, Phone, Send } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import { getWhatsAppLink } from '../../lib/whatsapp';
import { useBooking } from '../../hooks/useBooking';

const formId = 'xlgqbbab';

export const ContactForm = () => {
  const [state, handleSubmit] = useFormspree(formId);
  const [formStarted, setFormStarted] = useState(false);
  const { openBooking } = useBooking();
  const whatsappUrl = getWhatsAppLink('Hi Dinesh, I submitted a project enquiry on your website and would like to chat.');

  useEffect(() => {
    if (state.succeeded) {
      trackEvent('contact_form_submitted', { provider: 'formspree' });
    }
  }, [state.succeeded]);

  const handleFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('contact_form_started', { provider: 'formspree' });
    }
  };

  if (state.succeeded) {
    return (
      <div className="bg-brand-card border border-brand-border rounded-brand-lg p-8 text-center max-w-xl mx-auto shadow-sm">
        <div className="inline-flex items-center justify-center p-4 bg-[#237A50]/15 text-brand-success rounded-brand-pill mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h3 className="font-heading font-extrabold text-2xl text-brand-text mb-3">
          Project Enquiry Sent
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-8">
          Thanks for sharing your project details. I’ll review your message and reply with the clearest next step.
          For a faster start, you can also book a call or message me on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              trackEvent('booking_modal_opened', { source: 'form_success' });
              openBooking();
            }}
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-text hover:bg-brand-peach text-white font-heading font-semibold rounded-brand-sm transition-all duration-200"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Book a Strategy Call</span>
          </button>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_clicked', { source: 'form_success' })}
              className="inline-flex items-center justify-center px-6 py-3 border border-brand-border hover:border-brand-peach bg-brand-bg hover:bg-brand-secondary text-brand-text font-heading font-semibold rounded-brand-sm transition-all duration-200"
            >
              <Phone className="w-4 h-4 mr-2 text-brand-success" />
              <span>Chat on WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-card border border-brand-border rounded-brand-lg p-6 md:p-8 space-y-6 shadow-xs contact-form-polished"
    >
      <input type="hidden" name="_subject" value="New project enquiry from portfolio" />

      {state.errors && (
        <ValidationError
          errors={state.errors}
          className="hidden"
        />
      )}

      {state.errors && Object.keys(state.errors).length > 0 && (
        <div className="flex items-start bg-brand-error/10 border border-brand-error/20 p-4 rounded-brand-sm text-brand-error">
          <AlertTriangle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold">Submission failed.</span> Please check the highlighted fields or try again in a moment.
          </div>
        </div>
      )}

      <div className="contact-form-intro">
        <span>Project Enquiry</span>
        <h3>Tell me what should happen after someone visits your website.</h3>
        <p>
          The more context you share, the easier it is to suggest the right pages, flow and budget range.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Your Name <span className="text-brand-error">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            name="name"
            required
            minLength={2}
            onFocus={handleFocus}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
            placeholder="Dinesh Kumar"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
        </div>

        <div>
          <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Email Address <span className="text-brand-error">*</span>
          </label>
          <input
            id="form-email"
            type="email"
            name="email"
            required
            onFocus={handleFocus}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
            placeholder="you@example.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Phone / WhatsApp <span className="text-brand-muted text-[10px] font-normal">(Optional)</span>
          </label>
          <input
            id="form-phone"
            type="tel"
            name="phone"
            onFocus={handleFocus}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
            placeholder="+91 98765 43210"
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
        </div>

        <div>
          <label htmlFor="form-business" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Business / Brand <span className="text-brand-muted text-[10px] font-normal">(Optional)</span>
          </label>
          <input
            id="form-business"
            type="text"
            name="business"
            onFocus={handleFocus}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
            placeholder="Your business name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="form-projectType" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Project Type <span className="text-brand-error">*</span>
          </label>
          <select
            id="form-projectType"
            name="projectType"
            required
            onFocus={handleFocus}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>Select a type...</option>
            <option value="Business website">Business website</option>
            <option value="Landing page">Landing page</option>
            <option value="E-commerce website">E-commerce website</option>
            <option value="Web application">Web application</option>
            <option value="Admin dashboard">Admin dashboard</option>
            <option value="Website redesign">Website redesign</option>
            <option value="Backend API">Backend API</option>
            <option value="Other">Other</option>
          </select>
          <ValidationError prefix="Project Type" field="projectType" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
        </div>

        <div>
          <label htmlFor="form-budget" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Estimated Budget <span className="text-brand-error">*</span>
          </label>
          <select
            id="form-budget"
            name="budget"
            required
            onFocus={handleFocus}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>Select budget range...</option>
            <option value="Below ₹10,000">Below ₹10,000</option>
            <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
            <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
            <option value="₹50,000+">₹50,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
          <ValidationError prefix="Budget" field="budget" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
        </div>
      </div>

      <div>
        <label htmlFor="form-timeline" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
          Preferred Timeline <span className="text-brand-muted text-[10px] font-normal">(Optional)</span>
        </label>
        <select
          id="form-timeline"
          name="timeline"
          onFocus={handleFocus}
          className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
          defaultValue=""
        >
          <option value="">Select a timeline...</option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="Within one month">Within one month</option>
          <option value="Within two to three months">Within two to three months</option>
          <option value="Flexible">Flexible</option>
          <option value="Just exploring">Just exploring</option>
        </select>
      </div>

      <div>
        <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
          Project Details <span className="text-brand-error">*</span>
        </label>
        <textarea
          id="form-message"
          name="message"
          required
          minLength={20}
          onFocus={handleFocus}
          rows={5}
          className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-brand-sm text-sm transition-all duration-200 focus:border-brand-peach focus:bg-white focus:outline-none"
          placeholder="Tell me about your business, what visitors should do, and what is not working with your current website."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
      </div>

      <div className="flex items-start">
        <input
          id="form-consent"
          type="checkbox"
          name="consent"
          required
          value="I agree to be contacted about this project enquiry."
          onFocus={handleFocus}
          className="h-4 w-4 mt-0.5 rounded-xs border-brand-border text-brand-peach focus:ring-brand-peach"
        />
        <div className="ml-3 text-sm">
          <label htmlFor="form-consent" className="font-medium text-brand-text">
            I agree to be contacted about this project enquiry. <span className="text-brand-error">*</span>
          </label>
          <ValidationError prefix="Consent" field="consent" errors={state.errors} className="text-brand-error text-xs mt-1 font-medium" />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={state.submitting}
          className="inline-flex items-center justify-center w-full py-3.5 px-6 border border-transparent text-sm font-semibold rounded-brand-sm text-white bg-brand-text hover:bg-brand-peach focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-peach disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
        >
          {state.submitting ? (
            <span>Sending Enquiry...</span>
          ) : (
            <>
              <span>Send Project Enquiry</span>
              <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
