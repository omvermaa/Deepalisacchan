'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, UploadCloud, Lock, CheckCircle2, FileText, Activity, Heart, Carrot } from 'lucide-react';
import axios from 'axios';

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'female',
    goal: '',
    diet: '',
    medicalHistory: '',
    file: null,
  });

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 5));
  };
  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const initPayment = async () => {
    setIsProcessing(true);
    
    try {
      const { data } = await axios.post('/api/razorpay/create-order', {
        amount: 1500
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_id',
        amount: data.amount,
        currency: data.currency,
        name: "Dietician Deepali Sachan",
        description: "Priority Diet Consultation",
        order_id: data.id,
        handler: async function (response) {
          try {
            const vFormData = new FormData();
            vFormData.append('razorpay_payment_id', response.razorpay_payment_id);
            vFormData.append('razorpay_order_id', response.razorpay_order_id);
            vFormData.append('razorpay_signature', response.razorpay_signature);
            
            vFormData.append('age', formData.age);
            vFormData.append('height', formData.height);
            vFormData.append('weight', formData.weight);
            vFormData.append('gender', formData.gender);
            vFormData.append('goal', formData.goal);
            vFormData.append('diet', formData.diet);
            vFormData.append('medicalHistory', formData.medicalHistory);
            
            if (formData.file) {
              vFormData.append('file', formData.file);
            }

            const verifyRes = await axios.post('/api/razorpay/verify', vFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if(verifyRes.status === 200) {
               alert("Payment verified and request submitted successfully! We will get in touch shortly.");
            }
          } catch(err) {
            console.error(err);
            alert("Payment verification failed or email could not be sent.");
          }
        },
        prefill: {
          name: "Client",
          email: "",
          contact: ""
        },
        theme: {
          color: "#0f172a"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
      });

    } catch (err) {
       console.error("Order creation error:", err);
       alert('Something went wrong creating the priority slot order. Check console.');
    } finally {
       setIsProcessing(false);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-900/5 overflow-hidden min-h-[580px] flex flex-col relative border border-slate-200/80">
      {/* Progress bar */}
      <div className="bg-slate-50 px-8 py-5 border-b border-slate-200/80 flex justify-between items-center z-10">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Step {step} of 5</p>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">
            {step === 1 && "Basic Stats"}
            {step === 2 && "Your Primary Goal"}
            {step === 3 && "Dietary Preference"}
            {step === 4 && "Medical History"}
            {step === 5 && "Review & Confirm"}
          </h2>
        </div>
        
        <div className="flex space-x-1.5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div 
              key={item} 
              className={`h-2 rounded-full transition-all duration-300 ${
                item === step ? 'w-8 bg-slate-900' : 
                item < step ? 'w-4 bg-slate-400' : 'w-4 bg-slate-200'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Content wrapper */}
      <div className="flex-1 relative overflow-hidden p-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 p-8 pt-4 h-full overflow-y-auto hidden-scrollbar"
          >
            
            {/* STEP 1: Basic Stats */}
            {step === 1 && (
              <form onSubmit={handleNextSubmit} className="space-y-6 h-full flex flex-col">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Age</label>
                  <input type="number" required min="1" max="120"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-sm transition"
                    value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Gender</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-sm bg-white transition"
                    value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Height (cm)</label>
                    <input type="number" required min="50" max="300"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-sm transition"
                      value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
                    <input type="number" required min="10" max="400"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-sm transition"
                      value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition flex justify-center items-center space-x-2 text-sm active:scale-[0.99]">
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Goal Selection */}
            {step === 2 && (
              <div className="h-full flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'weight_loss', label: 'Weight Loss', icon: Activity },
                    { id: 'weight_gain', label: 'Weight Gain', icon: Activity },
                    { id: 'pcos', label: 'PCOS Management', icon: Heart },
                    { id: 'diabetes', label: 'Diabetes Control', icon: Activity },
                    { id: 'general', label: 'General Health', icon: Heart },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => { setFormData({...formData, goal: goal.id}); nextStep(); }}
                      className={`text-left p-5 rounded-2xl border transition-all group ${
                        formData.goal === goal.id 
                          ? 'border-slate-900 bg-slate-100/80 shadow-xs' 
                          : 'border-slate-200/80 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <goal.icon className={`w-6 h-6 mb-3 ${formData.goal === goal.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`} />
                      <h4 className={`font-bold text-base ${formData.goal === goal.id ? 'text-slate-900' : 'text-slate-800'}`}>{goal.label}</h4>
                    </button>
                  ))}
                </div>
                
                <div className="mt-auto pt-8">
                  <button onClick={prevStep} className="text-slate-600 hover:text-slate-900 font-medium py-3.5 px-6 rounded-xl transition flex items-center space-x-2 text-sm">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Current Diet */}
            {step === 3 && (
              <div className="h-full flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'veg', label: 'Vegetarian', icon: Carrot },
                    { id: 'nonveg', label: 'Non-Vegetarian', icon: FileText },
                    { id: 'vegan', label: 'Vegan', icon: Carrot },
                    { id: 'keto', label: 'Keto / Low Carb', icon: Heart },
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      onClick={() => { setFormData({...formData, diet: diet.id}); nextStep(); }}
                      className={`text-left p-5 rounded-2xl border transition-all group ${
                        formData.diet === diet.id 
                          ? 'border-slate-900 bg-slate-100/80 shadow-xs' 
                          : 'border-slate-200/80 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <diet.icon className={`w-6 h-6 mb-3 ${formData.diet === diet.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`} />
                      <h4 className={`font-bold text-base ${formData.diet === diet.id ? 'text-slate-900' : 'text-slate-800'}`}>{diet.label}</h4>
                    </button>
                  ))}
                </div>
                
                <div className="mt-auto pt-8">
                  <button onClick={prevStep} className="text-slate-600 hover:text-slate-900 font-medium py-3.5 px-6 rounded-xl transition flex items-center space-x-2 text-sm">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Medical History & Files */}
            {step === 4 && (
              <form onSubmit={handleNextSubmit} className="space-y-6 h-full flex flex-col">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Any existing medical conditions? (Optional)</label>
                  <textarea rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none resize-none text-sm transition"
                    placeholder="E.g., Thyroid, Blood Pressure..."
                    value={formData.medicalHistory} onChange={e => setFormData({...formData, medicalHistory: e.target.value})}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Upload recent medical reports (Optional)</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                      <UploadCloud className="w-7 h-7 mb-2 text-slate-400" />
                      <p className="text-xs"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-[11px] text-slate-400 mt-1">PDF, JPG or PNG (MAX 5MB)</p>
                    </div>
                    <input type="file" className="hidden" onChange={e => setFormData({...formData, file: e.target.files[0]})} />
                  </label>
                  {formData.file && (
                    <p className="text-xs text-slate-900 font-medium mt-2 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1 text-slate-800" /> {formData.file.name}
                    </p>
                  )}
                </div>

                <div className="mt-auto pt-8 flex space-x-4">
                  <button type="button" onClick={prevStep} className="text-slate-600 border border-slate-200 hover:bg-slate-50 font-medium py-3.5 px-6 rounded-xl transition flex items-center space-x-2 text-sm">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button type="submit" className="flex-1 bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition flex justify-center items-center space-x-2 text-sm active:scale-[0.99]">
                    <span>Lock Your Profile</span>
                    <Lock className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: Payment Lock Screen */}
            {step === 5 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-6">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                  <Lock className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Your Profile is Ready</h3>
                  <p className="text-slate-600 max-w-sm mx-auto text-sm leading-relaxed">
                    Your details have been saved. Proceed to pay the consultation fee of <span className="font-bold text-slate-900">₹1,500</span> to send your dossier directly to Dietician Deepali Sachan.
                  </p>
                </div>

                <div className="w-full max-w-sm pt-4">
                  <button 
                    onClick={initPayment} 
                    disabled={isProcessing}
                    className="w-full bg-slate-900 text-white font-bold text-base py-4 rounded-xl hover:bg-slate-800 transition shadow-lg flex justify-center items-center disabled:opacity-70 active:scale-[0.99]"
                  >
                    {isProcessing ? 'Processing...' : 'Pay ₹1,500 via Razorpay'}
                  </button>
                  <button onClick={prevStep} className="text-slate-500 hover:text-slate-900 text-xs font-medium mt-4 transition">
                    Go back and edit details
                  </button>
                </div>
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hidden-scrollbar::-webkit-scrollbar { display: none; }
        .hidden-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
