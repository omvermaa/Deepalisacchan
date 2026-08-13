'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BmiCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'female',
    height: '',
    weight: '',
  });
  
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const h = parseFloat(formData.height) / 100;
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
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Gender</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition text-sm bg-white"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
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
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
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
