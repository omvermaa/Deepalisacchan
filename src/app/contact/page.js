import { MapPin, Phone, Mail, Clock } from 'lucide-react';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-slate-700 border border-slate-200/60 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Clinic Location</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      123 Nutrition Lane, Health Avenue<br />
                      New Delhi, India 110001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-slate-700 border border-slate-200/60 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600 text-sm">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-slate-700 border border-slate-200/60 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600 text-sm">contact@deepalisachan.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-slate-700 border border-slate-200/60 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Working Hours</h4>
                    <p className="text-slate-600 text-sm">Mon - Sat: 10:00 AM - 7:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-3xl w-full h-[300px] md:h-full relative overflow-hidden border border-slate-200/80">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-sm">
                Google Maps Embed
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Send a Message</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition resize-none text-sm"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition active:scale-[0.99]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
