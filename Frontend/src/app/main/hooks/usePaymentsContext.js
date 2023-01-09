import { PaymentContext } from "../context/PaymentContext";
import { useContext } from "react";

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error(`usePaymentContext Error Occurred`);
  }

  return context;
};
