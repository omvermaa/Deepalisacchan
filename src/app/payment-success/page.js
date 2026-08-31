'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl shadow-slate-900/5 p-8 md:p-12 max-w-xl w-full text-center border border-slate-200/80"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 hidden-safari-fix">
          Payment Successful!
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed md:text-lg">
          Thank you for choosing Dietician Deepali Sachan. Your consultation request has been securely submitted and your slot is booked. We will review your dossier and get in touch with you shortly.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center mb-10 max-w-xs mx-auto">
          <p className="text-sm text-slate-500 mb-1 font-medium">Redirecting to home in</p>
          <div className="text-5xl font-extrabold text-slate-900 tracking-tighter">
            {countdown}
          </div>
          <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-semibold">seconds</p>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex justify-center items-center group active:scale-[0.98]"
        >
          <span>Return to Home Now</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
