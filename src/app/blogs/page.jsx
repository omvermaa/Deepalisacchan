import Link from "next/link";
import dbConnect from "../../lib/mongodb";
import Blog from "../../models/Blog";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Health & Nutrition Blogs | Dietician Deepali Sachan",
  description: "Read the latest tips on personalized diet plans, healthy fatloss, and nutrition from Dietician Deepali.",
};

export default async function BlogsPage() {
  await dbConnect();
  
  // Fetch blogs from DB
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl">
            Latest <span className="text-emerald-600">Articles</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            Insights on nutrition, holistic wellness, and healthy living directly from an expert dietician.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            No blogs published yet. Check back soon!
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blogs/${blog.slug}`} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden relative top-0 hover:-top-1">
                <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                  {blog.images && blog.images.length > 0 ? (
                    <img 
                      src={blog.images[0]} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                      No Image available
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600 mb-2">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <div 
                      className="mt-3 text-base text-slate-500 line-clamp-3 prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." }}
                    />
                  </div>
                  <div className="mt-6 flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                    Read more <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
