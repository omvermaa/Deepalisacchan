import Image from 'next/image';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

export const metadata = {
  title: 'About | Dietician Deepali Sachan',
  description: 'Learn about Dietician Deepali Sachan (M.Sc Food Nutrition & Dietetics), her philosophy, and her 12+ years of experience transforming lives through customized nutrition.',
};

export default function About() {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Header */}
      <div className="bg-slate-100/70 py-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">About Dietician Deepali Sachan</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            M.Sc Food Nutrition & Dietetics • Clinical Nutrition & Dietetics Expert
          </p>
          <p className="text-base text-slate-500 max-w-2xl mx-auto mt-2">
            Empowering individuals to achieve sustainable health goals for over 12+ years.
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
                <p className="text-xs text-slate-300">M.Sc Food Nutrition & Dietetics</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80">
              <p className="text-4xl font-black text-slate-900 mb-1">12+</p>
              <p className="font-semibold text-slate-600 text-sm">Years of Experience</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>M.Sc Food Nutrition & Dietetics • 12+ Yrs Experience</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Qualifications & Clinical Philosophy
                </h2>
              </div>

              {/* Philosophy Quote Callout */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-lg border border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <p className="text-slate-200 text-base md:text-lg italic font-medium leading-relaxed">
                  "Real nutrition is not about starvation or unsustainable fad diets—it is about establishing long-term, science-backed habits tailored to your unique medical background and daily routine."
                </p>
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mt-4">
                  — Dietician Deepali Sachan
                </p>
              </div>

              {/* Specialties Grid / Pills */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 text-slate-500">
                  Therapeutic & Clinical Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Weight Loss & Gain",
                    "Diabetes Care",
                    "Chronic Kidney Disease",
                    "Chronic Liver Disease",
                    "Cardiac Health",
                    "PCOS / PCOD",
                    "Thyroid Management",
                    "Pregnancy Nutrition",
                    "Lactating Mother Care",
                    "Tube Feeding & ICU Nutrition"
                  ].map((specialty, i) => (
                    <span 
                      key={i} 
                      className="bg-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
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
