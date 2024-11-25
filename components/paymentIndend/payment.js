import { StripeProvider, useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const PaymentPage = ({ clientSecret, totalPrice }) => {
    const stripe = useStripe();

    const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
            label: 'Seat Booking',
            amount: totalPrice, // Amount in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        googlePay: true, // Enables Google Pay
    });

    paymentRequest.canMakePayment().then(result => {
        if (result) {
            console.log("Google Pay available");
        } else {
            console.error("Google Pay not available");
        }
    });

    return (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
    );
};
