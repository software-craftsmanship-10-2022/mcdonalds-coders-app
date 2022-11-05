import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import IbanForm from "./IbanForm";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_Dt4ZBItXSZT1EzmOd8yCxonL");
export const PaymentsWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <IbanForm disabled={false} stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    </Elements>
  );
};
