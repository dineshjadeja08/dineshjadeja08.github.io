import { useState } from 'react';
import type { ReactNode } from 'react';
import { BookingContext } from '../../context/booking';

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ isBookingOpen: isOpen, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
