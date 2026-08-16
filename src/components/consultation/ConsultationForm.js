'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, UploadCloud, Lock, CheckCircle2, FileText, Activity, Heart, Carrot, User, Mail, Phone } from 'lucide-react';
import axios from 'axios';

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    heightCm: '',
    heightFt: '',
    heightIn: '',
    heightUnit: 'cm', // 'cm' or 'ft'
    weight: '',
    gender: 'female',
    goal: '',
    diet: '',
    medicalHistory: '',
    file: null,
  });

  // Compute height in cm regardless of input unit
  const getHeightInCm = useCallback(() => {
    if (formData.heightUnit === 'cm') {
      return formData.heightCm;
    }
    const ft = parseFloat(formData.heightFt) || 0;
    const inches = parseFloat(formData.heightIn) || 0;
    const totalInches = (ft * 12) + inches;
    return totalInches > 0 ? Math.round(totalInches * 2.54) : '';
  }, [formData.heightUnit, formData.heightCm, formData.heightFt, formData.heightIn]);

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 6));
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

      const heightInCm = getHeightInCm();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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

            vFormData.append('name', formData.name);
            vFormData.append('email', formData.email);
            vFormData.append('phone', formData.phone);
            vFormData.append('age', formData.age);
            vFormData.append('height', heightInCm);
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

            if (verifyRes.status === 200) {
              alert("Payment verified and request submitted successfully! We will get in touch shortly.");
            }
          } catch (err) {
            console.error(err);
            alert("Payment verification failed or email could not be sent.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
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

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-sm transition";

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-900/5 overflow-hidden min-h-[580px] flex flex-col relative border border-slate-200/80">
      {/* Progress bar */}
      <div className="bg-slate-50 px-8 py-5 border-b border-slate-200/80 flex justify-between items-center z-10">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Step {step} of 6</p>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">
            {step === 1 && "Your Contact Info"}
            {step === 2 && "Basic Stats"}
            {step === 3 && "Your Primary Goal"}
            {step === 4 && "Dietary Preference"}
            {step === 5 && "Medical History"}
            {step === 6 && "Review & Confirm"}
          </h2>
        </div>

        <div className="flex space-x-1.5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className={`h-2 rounded-full transition-all duration-300 ${item === step ? 'w-8 bg-slate-900' :
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

            {/* STEP 1: Contact Info */}
            {step === 1 && (
              <form onSubmit={handleNextSubmit} className="space-y-5 h-full flex flex-col">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />Full Name
                  </label>
                  <input type="text" required
                    className={inputClass}
                    placeholder="e.g. Priya Sharma"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />Email Address
                  </label>
                  <input type="email" required
                    className={inputClass}
                    placeholder="e.g. priya@example.com"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />Phone Number
                  </label>
                  <input type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                  className={inputClass}
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  />
                </div>

                <div className="mt-auto pt-6">
                  <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition flex justify-center items-center space-x-2 text-sm active:scale-[0.99]">
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Basic Stats */}
            {step === 2 && (
              <form onSubmit={handleNextSubmit} className="space-y-5 h-full flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Age</label>
                    <input type="number" required min="1" max="120"
                      className={inputClass}
                      placeholder="e.g. 28"
                      value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Gender</label>
                    <select
                      className={`${inputClass} bg-white`}
                      value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Height with unit toggle */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Height</label>
                    <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, heightUnit: 'cm' })}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${formData.heightUnit === 'cm'
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        cm
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, heightUnit: 'ft' })}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${formData.heightUnit === 'ft'
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        ft / in
                      </button>
                    </div>
                  </div>

                  {formData.heightUnit === 'cm' ? (
                    <input type="number" required min="50" max="300"
                      className={inputClass}
                      placeholder="e.g. 165"
                      value={formData.heightCm} onChange={e => setFormData({ ...formData, heightCm: e.target.value })}
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input type="number" required min="1" max="8"
                          className={inputClass}
                          placeholder="Feet"
                          value={formData.heightFt} onChange={e => setFormData({ ...formData, heightFt: e.target.value })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">ft</span>
                      </div>
                      <div className="relative">
                        <input type="number" required min="0" max="11"
                          className={inputClass}
                          placeholder="Inches"
                          value={formData.heightIn} onChange={e => setFormData({ ...formData, heightIn: e.target.value })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">in</span>
                      </div>
                    </div>
                  )}

                  {/* Live conversion hint */}
                  {formData.heightUnit === 'ft' && (formData.heightFt || formData.heightIn) && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      ≈ {getHeightInCm()} cm
                    </p>
                  )}
                  {formData.heightUnit === 'cm' && formData.heightCm && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      ≈ {Math.floor(formData.heightCm / 2.54 / 12)} ft {Math.round(formData.heightCm / 2.54 % 12)} in
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
                  <input type="number" required min="10" max="400"
                    className={inputClass}
                    placeholder="e.g. 60"
                    value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>

                <div className="mt-auto pt-6 flex space-x-3">
                  <button type="button" onClick={prevStep} className="text-slate-600 border border-slate-200 hover:bg-slate-50 font-medium py-3.5 px-5 rounded-xl transition flex items-center text-sm">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button type="submit" className="flex-1 bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition flex justify-center items-center space-x-2 text-sm active:scale-[0.99]">
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Goal Selection */}
            {step === 3 && (
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
                      onClick={() => { setFormData({ ...formData, goal: goal.id }); nextStep(); }}
                      className={`text-left p-5 rounded-2xl border transition-all group ${formData.goal === goal.id
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

            {/* STEP 4: Current Diet */}
            {step === 4 && (
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
                      onClick={() => { setFormData({ ...formData, diet: diet.id }); nextStep(); }}
                      className={`text-left p-5 rounded-2xl border transition-all group ${formData.diet === diet.id
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

            {/* STEP 5: Medical History & Files */}
            {step === 5 && (
              <form onSubmit={handleNextSubmit} className="space-y-6 h-full flex flex-col">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Any existing medical conditions? (Optional)</label>
                  <textarea rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none resize-none text-sm transition"
                    placeholder="E.g., Thyroid, Blood Pressure..."
                    value={formData.medicalHistory} onChange={e => setFormData({ ...formData, medicalHistory: e.target.value })}
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
                    <input type="file" className="hidden" onChange={e => setFormData({ ...formData, file: e.target.files[0] })} />
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

            {/* STEP 6: Payment Lock Screen */}
            {step === 6 && (
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

      <style dangerouslySetInnerHTML={{
        __html: `
        .hidden-scrollbar::-webkit-scrollbar { display: none; }
        .hidden-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
