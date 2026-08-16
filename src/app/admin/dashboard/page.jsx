"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, PlusCircle, FileText, Edit, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
  ssr: false,
});

export default function AdminDashboard() {
  const router = useRouter();
  const [view, setView] = useState("list"); // compose | list
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    if (view === "list") {
      fetchBlogs();
    }
  }, [view]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setView("compose");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Dashboard Topbar */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-800 truncate">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setView("compose");
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  view === "compose" && !editingBlog
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <PlusCircle className="h-5 w-5" />
                <span>Write Blog</span>
              </button>
              <button
                onClick={() => setView("list")}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  view === "list"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Manage Blogs</span>
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {view === "compose" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                  {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <RichTextEditor 
                  initialData={editingBlog} 
                  onSuccess={() => {
                    setEditingBlog(null);
                    setView("list");
                  }} 
                />
              </div>
            )}

            {view === "list" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Your Blogs</h2>
                
                {loading ? (
                  <p className="text-slate-500">Loading blogs...</p>
                ) : blogs.length === 0 ? (
                  <p className="text-slate-500">No blogs found. Start writing!</p>
                ) : (
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <div key={blog._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                          <h3 className="font-semibold text-slate-800">{blog.title}</h3>
                          <p className="text-sm text-slate-500">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleEdit(blog)}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
