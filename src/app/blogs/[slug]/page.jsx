import dbConnect from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import { notFound } from "next/navigation";
import ImageCarousel from "../../../components/blogs/ImageCarousel";
import Link from "next/link";

export const revalidate = 60; // Revalidate dynamic page every 60s

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: blog.seoTitle || `${blog.title} | Dietician Deepali Sachan`,
    description: blog.seoDescription || blog.content.replace(/<[^>]+>/g, '').substring(0, 160),
    openGraph: {
      images: blog.images && blog.images.length > 0 ? [blog.images[0]] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    notFound();
  }

  // Fetch recent blogs for sidebar excluding current one
  const recentBlogs = await Blog.find({ _id: { $ne: blog._id } })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
            <header className="mb-10 text-center">
              <p className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                {blog.title}
              </h1>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mt-6"></div>
            </header>

            {blog.images && blog.images.length > 0 && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/5">
                <ImageCarousel images={blog.images} />
              </div>
            )}

            <div 
              className="prose prose-lg prose-slate mx-auto text-slate-700 max-w-none 
              prose-headings:text-slate-900 prose-headings:font-bold 
              prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md pt-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                More Articles to Read
              </h3>
              
              {recentBlogs.length > 0 ? (
                <div className="space-y-6">
                  {recentBlogs.map((b) => (
                    <Link key={b._id} href={`/blogs/${b.slug}`} className="group flex space-x-4 items-center">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                        {b.images && b.images.length > 0 ? (
                          <img 
                            src={b.images[0]} 
                            alt={b.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium bg-slate-200">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {b.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No other articles available.</p>
              )}
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
