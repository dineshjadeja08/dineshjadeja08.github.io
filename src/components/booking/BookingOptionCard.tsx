import { Clock, ArrowUpRight, Calendar } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

type BookingOptionCardProps = {
  type: "discovery" | "consultation";
  title: string;
  duration: string;
  description: string;
  url: string;
};

export const BookingOptionCard = ({
  type,
  title,
  duration,
  description,
  url
}: BookingOptionCardProps) => {
  const handleClick = () => {
    trackEvent(
      type === "discovery" ? "booking_30min_clicked" : "booking_15min_clicked",
      { source: "option_card" }
    );
  };

  return (
    <div className="bg-brand-card border border-brand-border hover:border-brand-peach hover:shadow-md rounded-brand-md p-6 flex flex-col h-full justify-between transition-all duration-300 group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-brand-soft-peach rounded-brand-sm text-brand-peach">
            {type === "discovery" ? (
              <Calendar className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Clock className="w-6 h-6" aria-hidden="true" />
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach bg-brand-soft-peach/40 px-2.5 py-1 rounded-brand-pill">
            {duration}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl text-brand-text mb-2 group-hover:text-brand-peach transition-colors duration-200">
          {title}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center justify-center w-full py-3 px-4 bg-brand-text hover:bg-brand-peach text-white font-heading font-semibold rounded-brand-sm transition-all duration-200 group-hover:translate-y-[-2px] active:translate-y-0"
      >
        <span>Schedule on Cal.com</span>
        <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </a>
    </div>
  );
};

export default BookingOptionCard;
