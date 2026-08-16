require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  images: [String],
  seoTitle: String,
  seoDescription: String,
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.log('No MONGODB_URI found. Skipping seeding.');
    return;
  }
  
  await mongoose.connect(process.env.MONGODB_URI);

  const sampleBlogs = [
    {
      title: 'Top 5 Foods for Thyroid Health',
      slug: 'top-5-foods-for-thyroid-health',
      content: `<h2>Understanding Your Thyroid & Nutrition</h2><p>Your thyroid is a vital butterfly-shaped gland that controls metabolism, energy, and hormonal balance. Proper nutrition plays a <u>crucial role</u> in maintaining thyroid wellness.</p><h3>Top 5 Recommended Superfoods:</h3><ol><li><strong>Seaweed & Kelp:</strong> Naturally rich in <em>Iodine</em>, which is essential for thyroid hormone production.</li><li><strong>Brazil Nuts:</strong> High in <u>Selenium</u>, a powerful antioxidant that protects thyroid tissue.</li><li><strong>Eggs:</strong> Contain a healthy combination of both <em>iodine</em> and <em>selenium</em>.</li><li><strong>Berries (Blueberries & Strawberries):</strong> Packed with antioxidants to combat inflammation.</li><li><strong>Spinach & Dark Leafy Greens:</strong> Loaded with magnesium for optimal gland function.</li></ol>blockquote><em>"Nutrition isn't about restriction; it's about giving your body the specific fuel it needs to heal."</em></blockquote><p><strong>Note:</strong> Always consult with your clinical dietitian before making drastic dietary changes.</p>`,
      images: ['https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'],
      seoTitle: 'Top 5 Foods for Thyroid Health | Dietician Deepali',
      seoDescription: 'Discover the top 5 foods that support a healthy thyroid, packed with iodine, selenium, and essential nutrients.',
    },
    {
      title: 'Diet for Healthy Fat Loss',
      slug: 'diet-for-healthy-fat-loss',
      content: `<h2>The Secret to Sustainable Fat Loss</h2><p>Fad diets and extreme fasting often lead to muscle loss and metabolic slowdown. True fat loss relies on a <u>balanced, high-protein diet</u> paired with a sustainable caloric deficit.</p><h3>Core Principles for Success:</h3><ul><li><strong>High Protein Intake:</strong> Preserves lean muscle mass and keeps you satisfied longer.</li><li><strong>Fiber-Dense Vegetables:</strong> Allows volume eating without excessive calories.</li><li><strong>Optimal Hydration:</strong> Aim for at least <em>3 liters of water daily</em> for digestive efficiency.</li><li><strong>Mindful Eating:</strong> Avoid distractions while enjoying your meals.</li></ul><p><s>Crash diets</s> and <s>magic detox teas</s> will never replace consistency and proper nutrient balance.</p>`,
      images: ['https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'],
      seoTitle: 'Sustainable Diet for Healthy Fat Loss | Clinical Nutrition',
      seoDescription: 'Learn how to lose fat sustainably without crash diets or starving yourself.',
    },
    {
      title: 'Managing PCOS through Nutrition',
      slug: 'managing-pcos-through-nutrition',
      content: `<h2>PCOS and Diet: Restoring Balance Naturally</h2><p>Polycystic Ovary Syndrome (PCOS) is closely linked to <u>insulin resistance</u> and hormonal imbalance. Managing blood sugar spikes is key to reducing symptoms.</p><h3>Key Dietary Adjustments:</h3><ul><li><strong>Low Glycemic Index (GI) Foods:</strong> Switch to whole grains, oats, and legumes.</li><li><strong>Healthy Omega-3 Fats:</strong> Incorporate walnuts, flaxseeds, and extra virgin olive oil.</li><li><strong>Anti-Inflammatory Herbs:</strong> Turmeric, ginger, and cinnamon help regulate insulin response.</li></ul><p><em>Every body responds differently—personalized dietary planning yields the best long-term results.</em></p>`,
      images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'],
      seoTitle: 'Managing PCOS through Nutrition & Diet | Dietician Deepali',
      seoDescription: 'Expert tips on managing PCOS symptoms through insulin-friendly nutrition and diet.',
    }
  ];

  for (const b of sampleBlogs) {
    await Blog.findOneAndUpdate({ slug: b.slug }, b, { upsert: true, new: true });
    console.log('Updated/Created blog:', b.title);
  }

  console.log('Seeding complete.');
  process.exit();
}

seed();
