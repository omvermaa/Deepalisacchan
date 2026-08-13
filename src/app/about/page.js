import Image from 'next/image';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

export const metadata = {
  title: 'About | Dietician Deepali Sachan',
  description: 'Learn about Dietician Deepali Sachan, her philosophy, and her 13+ years of experience transforming lives through customized nutrition.',
};

export default function About() {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Header */}
      <div className="bg-slate-100/70 py-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">About Dietician Deepali</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Empowering individuals to achieve their health goals through sustainable, science-based nutrition for over a decade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200/80 shadow-xl group">
              <Image 
                src="/images/dietitian-consultation.jpg"
                alt="Dietician Deepali Sachan in consultation"
                fill
                priority
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-slate-900/75 backdrop-blur-md border border-white/10">
                <p className="font-bold text-base">Dietician Deepali Sachan</p>
                <p className="text-xs text-slate-300">Senior Clinical Dietitian</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80">
              <p className="text-4xl font-black text-slate-900 mb-1">13+</p>
              <p className="font-semibold text-slate-600 text-sm">Years of Experience</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">My Journey & Philosophy</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                With over 13 years of clinical experience, I've had the privilege of working with thousands of individuals with unique health challenges. I believe that nutrition is not about starvation or extreme diets; it's about finding long-term, sustainable ways to nourish your body.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you're struggling with weight loss, PCOS, diabetes, or digestive issues, my approach focuses on integrating healthy eating into your lifestyle seamlessly—without giving up the foods you love.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200/80">
              <div className="flex space-x-4">
                <div className="p-3 bg-slate-100 text-slate-800 rounded-xl h-fit border border-slate-200/60">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Certified Expert</h4>
                  <p className="text-xs text-slate-500 mt-1">Recognized dietary guidelines</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="p-3 bg-slate-100 text-slate-800 rounded-xl h-fit border border-slate-200/60">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Customized Plans</h4>
                  <p className="text-xs text-slate-500 mt-1">Built specifically for you</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="p-3 bg-slate-100 text-slate-800 rounded-xl h-fit border border-slate-200/60">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Continuous Support</h4>
                  <p className="text-xs text-slate-500 mt-1">Guidance at every step</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="p-3 bg-slate-100 text-slate-800 rounded-xl h-fit border border-slate-200/60">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Holistic Healing</h4>
                  <p className="text-xs text-slate-500 mt-1">Root cause resolution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
