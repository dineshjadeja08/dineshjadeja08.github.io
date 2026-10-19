import { useContext } from 'react';
import { BookingContext } from '../context/booking';
import type { BookingContextType } from '../context/booking';

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
