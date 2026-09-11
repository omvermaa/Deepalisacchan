"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PhoneConsultationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    query: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatus(null);

    try {
      // Create Razorpay order for ₹200
      const { data } = await axios.post('/api/razorpay/create-order', {
        amount: 200
      });

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Dietician Deepali Sachan",
        description: "Solving Queries (Phone Consultation)",
        order_id: data.id,
        handler: async function (response) {
          try {
            // Verify and send the email
            const verifyRes = await axios.post('/api/razorpay/verify-phone', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              name: formData.name,
              phone: formData.phone,
              query: formData.query
            });

            if (verifyRes.status === 200) {
              setStatus('success');
              router.push('/payment-success?type=phone');
            }
          } catch (err) {
            console.error(err);
            setStatus('error');
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone
        },
        config: {
          display: {
            blocks: {
              utib: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi",
                    flows: ["collect", "qr"]
                  }
                ]
              }
            },
            sequence: ["block.utib"],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        theme: {
          color: "#0f172a"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
        setStatus('error');
      });

    } catch (error) {
      console.error("Order creation error:", error);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handlePayment}>
      <div className="space-y-2">
        <label htmlFor="phone_name" className="text-sm font-medium text-slate-700">Full Name</label>
        <input
          type="text"
          id="phone_name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition text-sm"
          placeholder="e.g. John Doe"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone_number" className="text-sm font-medium text-slate-700">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength="10"
          required
          value={formData.phone}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            handleChange(e);
          }}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition text-sm"
          placeholder="e.g. 9876543210"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone_query" className="text-sm font-medium text-slate-700">Your Query / Message</label>
        <textarea
          id="phone_query"
          name="query"
          required
          rows={4}
          value={formData.query}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition resize-none text-sm"
          placeholder="What would you like to discuss?"
        ></textarea>
      </div>

      {status === 'success' && (
        <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm border border-green-200 text-center font-medium">
          Payment successful! Your callback request has been received.
        </div>
      )}
      {status === 'error' && (
        <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 text-center font-medium">
          Something went wrong with the payment or submission. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl hover:bg-emerald-700 transition active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <span>{isProcessing ? 'Processing...' : 'Pay ₹200 via Razorpay'}</span>
      </button>
    </form>
  );
}
