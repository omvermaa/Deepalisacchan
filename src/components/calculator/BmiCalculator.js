'use client';
import { useCallback } from 'react';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BmiCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'female',
    // height: '',
    heightCm: '',
    heightFt: '',
    heightIn: '',
    heightUnit: 'cm', // 'cm' or 'ft'
    weight: '',
  });


  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none text-sm transition";

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

  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const h = parseFloat(formData.heightCm) / 100;
    const w = parseFloat(formData.weight);
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = '';
      let positives = [];
      let improvements = [];

      if (bmi < 18.5) {
        category = 'Underweight';
        positives = ['Fast metabolism baseline'];
        improvements = ['Muscle gain needed', 'Nutrient absorption optimization'];
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal';
        positives = ['Optimal weight range', 'Lower health risk profile'];
        improvements = ['Maintain body composition', 'Incorporate strength training'];
      } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
        positives = ['Good starting point for body recomp'];
        improvements = ['Cardiovascular focus', 'Portion structure adjustment'];
      } else {
        category = 'Obese';
        positives = ['Significant transformation potential'];
        improvements = ['Metabolic risk management', 'Professional dietary guidance recommended'];
      }

      setResult({
        bmi: bmi.toFixed(1),
        category,
        positives,
        improvements
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 overflow-hidden relative">
      <div className="p-8 md:p-12">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-slate-100 text-slate-800 rounded-2xl border border-slate-200/60">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Free BMI Calculator</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={calculateBMI} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Age</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm"
                  placeholder="e.g. 28"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Gender</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm bg-white"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Height (cm)</label>
              <input
                type="number"
                required
                min="50"
                max="300"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm"
                placeholder="e.g. 165"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
              />
            </div> */}

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
              <input
                type="number"
                required
                min="10"
                max="400"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm"
                placeholder="e.g. 60"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-slate-800 transition-all flex justify-center items-center space-x-2 active:scale-[0.98] text-sm"
            >
              <span>Calculate BMI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Results Area */}
          <div className="h-full">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200"
                >
                  <Activity className="w-10 h-10 text-slate-400 mb-3" />
                  <p className="text-slate-500 text-sm">Enter your details to calculate your health baseline.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="h-full flex flex-col space-y-5"
                >
                  <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Your BMI Score</p>
                      <h3 className="text-4xl font-extrabold text-white">{result.bmi}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Category</p>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                        {result.category}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <h4 className="flex items-center text-slate-900 font-bold mb-3 space-x-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-slate-700" />
                      <span>Potential Positives</span>
                    </h4>
                    <ul className="space-y-2">
                      {result.positives.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mt-1 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <h4 className="flex items-center text-slate-900 font-bold mb-3 space-x-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-slate-700" />
                      <span>Areas to Work On</span>
                    </h4>
                    <ul className="space-y-2">
                      {result.improvements.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
