import { IbanElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements, StripeIbanElement } from "@stripe/stripe-js";
import { useState } from "react";
import "./IbanFormStyles.css";

const IBAN_STYLE = {
  base: {
    color: "#32325d",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
    ":-webkit-autofill": {
      color: "#32325d",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
    ":-webkit-autofill": {
      color: "#fa755a",
    },
  },
};

const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ["SEPA"],
  placeholderCountry: "AR",
  style: IBAN_STYLE,
};
interface IbanFormProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  disabled: boolean;
}
export default function IbanForm({
  stripe,
  elements,
  disabled,
}: IbanFormProps) {
  const [paymentStatus, setPaymentStatus] = useState<string>("PENDING");

  const processPaymentIntent = (
    accountholderName: string,
    email: string,
    iban: StripeIbanElement
  ) =>
    fetch("https://api.stripe.com/v1/payment_intents", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y`,
      },
      mode: "cors",
      cache: "default",
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        const { status } = responseJSON.data[0];
        setPaymentStatus(status);
      });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const iban = elements.getElement(IbanElement);
    if (!iban) {
      return;
    }
    const accountholderName = event.target["accountholder-name"];
    const email = event.target.email;

    processPaymentIntent(accountholderName, email, iban);
  };
  return (
    <div className="sr-root">
      {paymentStatus !== "PENDING" ? (
        <div className="sr-main">
          <label>PAYMENT {paymentStatus}</label>
        </div>
      ) : (
        <div className="sr-main">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-row inline">
              <div className="row">
                <label>Name</label>
                <input
                  name="accountholder-name"
                  placeholder="Jenny Rosen"
                  required
                  className="StripeElement"
                />
              </div>

              <div className="row">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="jenny.rosen@example.com"
                  required
                  className="StripeElement"
                />
              </div>
            </div>

            <div className="form-row">
              <label>IBAN</label>
              <IbanElement
                options={IBAN_ELEMENT_OPTIONS}
                className="StripeElement"
              />
            </div>

            <button type="submit" disabled={disabled} className="sr-button">
              Set up SEPA Direct Debit
            </button>
            {/* Display mandate acceptance text. */}
            <div className="mandate-acceptance">
              By providing your payment information and confirming this payment,
              you authorise (A) Rocket Rides and Stripe, our payment service
              provider, to send instructions to your bank to debit your account
              and (B) your bank to debit your account in accordance with those
              instructions. As part of your rights, you are entitled to a refund
              from your bank under the terms and conditions of your agreement
              with your bank. A refund must be claimed within 8 weeks starting
              from the date on which your account was debited. Your rights are
              explained in a statement that you can obtain from your bank. You
              agree to receive notifications for future debits up to 2 days
              before they occur.
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
