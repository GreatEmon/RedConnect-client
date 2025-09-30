import React, { use, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../context/AuthProvider";


const CheckoutForm = ({ amount, user, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const {user:user2} = use(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;


        setProcessing(true);
        onSuccess()
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${window.location.origin}/funding` },
        });


        if (result.error) {
            setError(result.error.message);
            setProcessing(false);
        } else {
            try {
                // Save fund info to backend
                await axios.post("https://red-connect-backend.vercel.app/api/fundings", {
                    userName: user.displayName,
                    userEmail: user.email,
                    amount: paymentAmount, // your amount
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${user2.accessToken}`
                    }
                });
                Swal.fire("Success", "Funding added successfully", "success"); // Notify parent component

            } catch (err) {
                console.error(err);
                setError("Failed to save funding info");
            }

            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                disabled={!stripe || processing}
                className="btn btn-primary w-full"
            >
                {processing ? "Processing..." : `Pay $${amount}`}
            </button>
            {error && <div className="text-red-600">{error}</div>}
        </form>
    );
};

export default CheckoutForm;
