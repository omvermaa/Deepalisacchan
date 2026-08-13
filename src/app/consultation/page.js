import Image from 'next/image';
import ConsultationForm from '@/components/consultation/ConsultationForm';
import { ShieldCheck, Clock, Award } from 'lucide-react';

export const metadata = {
  title: 'Book Consultation | Dietician Deepali Sachan',
  description: 'Book your personalized diet consultation today.',
};

export default function ConsultationPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Start Your Transformation</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Tell us about your body, your goals, and your lifestyle. We will craft a diet plan that is exclusively yours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          
          <div className="w-full lg:w-1/3 space-y-8 order-2 lg:order-1 pt-4">
            
            {/* Dietitian Consultation Feature Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg group">
              <div className="aspect-[16/10] relative">
                <Image
                  src="/images/dietitian-consultation.jpg"
                  alt="Dietician Deepali Sachan 1-on-1 Consultation"
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-base">Direct 1-on-1 Guidance</p>
                  <p className="text-xs text-slate-300">With Dietician Deepali Sachan (13+ Yrs Exp)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">What you will receive:</h3>
              <ul className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/60">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-bold text-slate-900">Custom Diet Plan</h4>
                    <p className="mt-1 text-slate-600 text-sm">Tailored specifically to your body and medical condition.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/60">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-bold text-slate-900">Priority Support</h4>
                    <p className="mt-1 text-slate-600 text-sm">Get fast responses from Deepali and her team.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/60">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-bold text-slate-900">Secure Consultation</h4>
                    <p className="mt-1 text-slate-600 text-sm">Your data and medical history is 100% confidential.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-600 text-sm font-medium">Consultation Fee</p>
                <p className="text-2xl font-extrabold text-slate-900">₹1,500</p>
              </div>
              <p className="text-xs text-slate-400">Secure payment powered by Razorpay</p>
            </div>
          </div>

          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <ConsultationForm />
          </div>

        </div>
      </div>
    </div>
  );
}
