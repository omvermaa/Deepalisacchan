import Link from 'next/link';
import Image from 'next/image';
import BmiCalculator from '@/components/calculator/BmiCalculator';
import { Star, ArrowRight, ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import ConsultationPopup from '@/components/ConsultationPopup';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();
  const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(3).lean();

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {/* Hero Section with Tinted Background Image */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center justify-center">
        {/* Background Image with Reduced Tint Overlay & Increased Image Clarity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/dietitian-hero-bg.jpg"
            alt="Dietician Deepali Sachan"
            fill
            priority
            className="object-cover object-center opacity-45 filter contrast-[1.05]"
          />
          {/* Lighter, subtle tinted gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-900/35 to-slate-950/55" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-4 py-2 rounded-full text-slate-200 font-medium text-xs md:text-sm backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>M.Sc Food Nutrition & Dietetics • 13+ Years Clinical Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Transform Your Health with <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent underline decoration-slate-600 underline-offset-8">Personalized Nutrition</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Achieve your unique health goals through sustainable, science-backed diet plans crafted specifically for your body and lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                href="/consultation"
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-base hover:bg-slate-100 transition shadow-lg hover:shadow-2xl w-full sm:w-auto flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#calculator"
                className="bg-slate-900/60 backdrop-blur-md text-slate-200 border border-slate-700/80 px-8 py-4 rounded-full font-medium text-base hover:bg-slate-800/80 transition w-full sm:w-auto flex items-center justify-center"
              >
                Free BMI Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dietitian Showcase Section */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Image Column */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] group">
                <Image
                  src="/images/dietitian-consultation.jpg"
                  alt="Dietician Deepali consulting a client"
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10">
                  <p className="font-bold text-base">Dietician Deepali Sachan</p>
                  <p className="text-xs text-slate-300">M.Sc Food Nutrition & Dietetics • Clinical Nutritionist</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-200/80">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                  13+
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Years Exp.</p>
                  <p className="text-xs text-slate-500">M.Sc Certified Expert</p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-slate-800 text-xs font-semibold">
                <Award className="w-4 h-4 text-slate-700" />
                <span>M.Sc Food Nutrition & Dietetics • 13+ Years Experience</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering your journey to lifelong health & wellness
              </h2>

              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                Nutrition is not about strict restrictions or temporary fad diets—it is about discovering a balanced, nourishing lifestyle that fits seamlessly into your routine.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Personalized diet plans for Weight Loss & Weight Gain",
                  "Therapeutic nutrition for Diabetes, PCOS & Thyroid Management",
                  "Specialized care for Chronic Kidney Disease, Chronic Liver Disease & Cardiac Health",
                  "Nutrition plans for Pregnancy, Lactating Mothers & Tube Feeding care",
                  "Sustainable lifestyle modifications without extreme deprivation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="bg-slate-900 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-800 transition shadow-md flex items-center space-x-2"
                >
                  <span>Learn More About Deepali</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/consultation"
                  className="bg-slate-100 text-slate-900 border border-slate-200 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-200 transition"
                >
                  Book 1-on-1 Session
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof / Google Reviews Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Trusted by Client Success Stories</h2>
            <p className="text-slate-600">See what clients share about their sustainable transformation journey.</p>
          </div>

          <div className="relative flex overflow-hidden group py-4">
            {/* The absolute overlay gradients for smooth side fading */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] space-x-6 sm:space-x-8 px-3 sm:px-4 min-w-max">
              {[
                {
                  name: "Shweta Awasthi",
                  text: "So supportive and provided a positive outlook, made healthy eating easy and delicious. Thankyou so much.... Highly recommended 😇",
                  image: "/images/reviews/shweta_a.jpg"
                },
                {
                  name: "Ranjana Tripathi",
                  text: "Thank you for helping me understand how to eat for my body and for giving me a new perspective on health. I feel more in control of my diet and so much better because of you",
                  image: "/images/reviews/ranjana.jpg"
                },
                {
                  name: "Shweta Vishwakarma",
                  text: "One of the best dietician in kanpur The dietician provided a well-structured and personalized diet plan that matched my lifestyle and preferences. Their guidance was clear, supportive, and scientifically accurate. I truly appreciate the consistent follow-up and the positive changes I noticed in my health.Thanku so much Dt. Deepali mam ❤️🫶💯",
                  image: "/images/reviews/shweta_v.jpg"
                },
                {
                  name: "Anshuman Tiwari",
                  text: "Flexible diet plan easy to follow , it helped me lose 17 kg in 3 month. 😊",
                  image: "/images/reviews/anshuman.jpg"
                },
                {
                  name: "Anurag Savita",
                  text: "Maidam bahut achhi hai bahut pyar se bat karti hai",
                  image: null
                },
                {
                  name: "Arham mirza",
                  text: "loose body weight 100 to 90 in 2 months \n nice effective body diet chart",
                  image: "/images/reviews/arham.jpg"
                },
                {
                  name: "Aman Verma",
                  text: "The Diet provided has helped me lose 10 kg weight in 4 months time and I love the new me, it was all possible because of Deepali ma'am, She adjusts your diet according to your needs and demands and not at all those fansy diets you see on Instagram. Her diet is easy to follow and gives results . I am so glad to see the new slim me , Thankyou Again",
                  image: null
                }
              ].map((item, idx) => (
                <div key={`marquee-1-${idx}`} className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/60 relative flex flex-col justify-between w-[320px] sm:w-[380px] shrink-0 whitespace-normal transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Google</span>
                    </div>
                    <p className="text-slate-700 mb-6 text-[15px] leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 border-t border-slate-100 pt-5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 shadow-sm flex-shrink-0 bg-emerald-50">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-800 font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-tight">{item.name}</p>
                      <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">Verified Review</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Seamless duplicate for continuous looping */}
            <div className="flex animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] space-x-6 sm:space-x-8 px-3 sm:px-4 min-w-max" aria-hidden="true">
              {[
                {
                  name: "Shweta Awasthi",
                  text: "So supportive and provided a positive outlook, made healthy eating easy and delicious. Thankyou so much.... Highly recommended 😇",
                  image: "/images/reviews/shweta_a.jpg"
                },
                {
                  name: "Ranjana Tripathi",
                  text: "Thank you for helping me understand how to eat for my body and for giving me a new perspective on health. I feel more in control of my diet and so much better because of you",
                  image: "/images/reviews/ranjana.jpg"
                },
                {
                  name: "Shweta Vishwakarma",
                  text: "One of the best dietician in kanpur The dietician provided a well-structured and personalized diet plan that matched my lifestyle and preferences. Their guidance was clear, supportive, and scientifically accurate. I truly appreciate the consistent follow-up and the positive changes I noticed in my health.Thanku so much Dt. Deepali mam ❤️🫶💯",
                  image: "/images/reviews/shweta_v.jpg"
                },
                {
                  name: "Anshuman Tiwari",
                  text: "Flexible diet plan easy to follow , it helped me lose 17 kg in 3 month. 😊",
                  image: "/images/reviews/anshuman.jpg"
                },
                {
                  name: "Anurag Savita",
                  text: "Maidam bahut achhi hai bahut pyar se bat karti hai",
                  image: null
                },
                {
                  name: "Arham mirza",
                  text: "loose body weight 100 to 90 in 2 months \n nice effective body diet chart",
                  image: "/images/reviews/arham.jpg"
                },
                {
                  name: "Aman Verma",
                  text: "The Diet provided has helped me lose 10 kg weight in 4 months time and I love the new me, it was all possible because of Deepali ma'am, She adjusts your diet according to your needs and demands and not at all those fansy diets you see on Instagram. Her diet is easy to follow and gives results . I am so glad to see the new slim me , Thankyou Again",
                  image: null
                }
              ].map((item, idx) => (
                <div key={`marquee-2-${idx}`} className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/60 relative flex flex-col justify-between w-[320px] sm:w-[380px] shrink-0 whitespace-normal transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Google</span>
                    </div>
                    <p className="text-slate-700 mb-6 text-[15px] leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 border-t border-slate-100 pt-5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 shadow-sm flex-shrink-0 bg-emerald-50">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-800 font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-tight">{item.name}</p>
                      <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">Verified Review</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Latest Nutrition Insights</h2>
              <p className="text-slate-600">Expert advice and actionable tips from Dietician Deepali.</p>
            </div>
            <Link
              href="/blogs"
              className="mt-4 sm:mt-0 flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentBlogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              {recentBlogs.map((blog) => (
                <Link key={blog._id} href={`/blogs/${blog.slug}`} className="group flex flex-col bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative top-0 hover:-top-1 transition-all duration-300">
                  <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                    {blog.images && blog.images.length > 0 ? (
                      <img
                        src={blog.images[0]}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400 font-medium">No Image</div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs font-medium text-emerald-600 mb-2">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-3">
                      {blog.title}
                    </h3>
                    <div
                      className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1"
                      dangerouslySetInnerHTML={{ __html: blog.content.replace(/<[^>]+>/g, '').substring(0, 120) + "..." }}
                    />
                    <div className="flex items-center text-emerald-600 font-medium text-sm group-hover:text-emerald-700">
                      Read more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-8 bg-slate-50 rounded-2xl border border-slate-100">
              New insights coming soon. Stay tuned!
            </div>
          )}
        </div>
      </section>

      {/* Free Tool / BMI Calculator Section */}
      <section id="calculator" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Know Your Health Baseline</h2>
            <p className="text-slate-600">Use our free BMI calculator to get instant insights into your physical stats and next steps.</p>
          </div>

          <BmiCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to take control of your health?</h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Skip generic advice. Get a customized, science-based diet plan tailored to your exact physical requirements and lifestyle.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-base hover:bg-slate-100 transition shadow-xl active:scale-[0.98]"
          >
            <span>Start Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <ConsultationPopup />
    </div>
  );
}

