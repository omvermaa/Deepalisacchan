import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import PhoneConsultationForm from '@/components/PhoneConsultationForm';

export const metadata = {
  title: 'Contact | Dietician Deepali Sachan',
  description: 'Get in touch with Dietician Deepali Sachan for nutrition inquiries.',
};

export default function Contact() {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      <div className="bg-slate-100/70 py-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We're here to help you start your journey to a healthier lifestyle. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center space-x-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Phone Callback</h4>
              <p className="text-slate-500 text-xs mt-1">₹200 per query session</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center space-x-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Email Us</h4>
              <a href="mailto:deepalisachan32@gmail.com" className="text-slate-500 text-xs mt-1 hover:text-emerald-600 transition">deepalisachan32@gmail.com</a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center space-x-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
              <p className="text-slate-500 text-xs mt-1">Mon-Sat: 10AM - 7PM</p>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/5 border border-slate-200/60 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800 rounded-tr-full opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-4 py-2 rounded-full text-slate-200 text-xs font-semibold w-max mb-8 backdrop-blur-md">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Priority Callback • ₹200</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight leading-tight">
                    Need Quick <span className="text-emerald-400">Expert Advice?</span>
                  </h2>
                  
                  <p className="text-slate-300 text-base mb-10 leading-relaxed max-w-sm">
                    Skip the wait and get your personalized queries resolved directly over a phone call with Dietician Deepali Sachan.
                  </p>
                  
                  <div className="space-y-5">
                    {[
                      "Direct 1-on-1 discussion",
                      "Immediate clarity on minor health doubts",
                      "Guaranteed callback within working hours"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <div className="bg-slate-800 p-1 rounded-full flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-slate-200 font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 lg:p-16 flex items-center justify-center bg-white relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
                
                <div className="w-full max-w-md relative z-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Request Callback</h3>
                    <p className="text-slate-500 text-sm font-medium">Secure your slot in seconds. 100% secure payment.</p>
                  </div>
                  <PhoneConsultationForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
