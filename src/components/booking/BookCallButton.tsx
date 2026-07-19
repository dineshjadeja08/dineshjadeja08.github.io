import { bookingLinks } from '../../config/booking';
import { useBooking } from '../../hooks/useBooking';
import { trackEvent } from '../../lib/analytics';

type BookCallButtonProps = {
  type?: "discovery" | "consultation" | "selector";
  label?: string;
  className?: string;
};

export const BookCallButton = ({
  type = "selector",
  label,
  className = ""
}: BookCallButtonProps) => {
  const { openBooking } = useBooking();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (type === "discovery") {
      trackEvent("booking_30min_clicked", { source: "button" });
    } else if (type === "consultation") {
      trackEvent("booking_15min_clicked", { source: "button" });
    } else if (type === "selector") {
      e.preventDefault();
      trackEvent("booking_modal_opened", { source: "button" });
      openBooking();
    }
  };

  const baseStyles = "inline-flex items-center justify-center font-heading font-semibold transition-all duration-200 active:scale-95";

  if (type === "selector") {
    return (
      <button
        onClick={handleClick}
        className={`${baseStyles} ${className}`}
        type="button"
      >
        {label || "Book a Call"}
      </button>
    );
  }

  const url = type === "discovery" ? bookingLinks.discovery.url : bookingLinks.consultation.url;
  const defaultLabel = type === "discovery" ? "Book a Free Discovery Call" : "Take a Quick 15-Minute Call";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseStyles} ${className}`}
    >
      {label || defaultLabel}
    </a>
  );
};

export default BookCallButton;
