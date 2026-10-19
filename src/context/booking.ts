import { createContext } from 'react';

export interface BookingContextType {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

export const BookingContext = createContext<BookingContextType | undefined>(undefined);
