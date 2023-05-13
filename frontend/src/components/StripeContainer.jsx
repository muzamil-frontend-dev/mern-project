import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(
  "pk_test_51MpXqSEkCYnmWLlnGxAQYKWV2IfCDX0Z8Ze3RkVuHrfQgXuzfCj2ETBQsxLNvZSBxK1yWJcTB67dPvlS1SBCrEUl003JQftu6I"
);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default StripeContainer;
