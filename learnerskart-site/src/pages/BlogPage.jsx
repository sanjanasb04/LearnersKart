import { getBlogCoverImage } from '../utils/blogImages';
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Tag, ChevronLeft, ChevronRight, Eye, ThumbsUp } from 'lucide-react';
import api from '../utils/api';
import { initialBlogs } from '../data/blogs';

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All');

  const BLOGS_PER_PAGE = 10;
  const categories = ['All', 'Project Management', 'Agile & Scrum', 'Quality Management', 'Business Analysis', 'Cloud Computing', 'IT Service Management', 'General'];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('page', currentPage);
        params.append('limit', BLOGS_PER_PAGE);
        
        if (activeCategory !== 'All') {
          params.append('category', activeCategory);
        }
        
        let loadedBlogs = [];
        let totalCount = 0;

        try {
          const res = await api.get(`/blogs?${params.toString()}`);
          if (res.data.success && res.data.blogs && res.data.blogs.length > 0) {
            loadedBlogs = res.data.blogs;
            totalCount = res.data.total || loadedBlogs.length;
          }
        } catch (apiErr) {
          console.log('API fetch note, using local dataset fallback:', apiErr.message);
        }

        // If backend API returns fewer blogs than initial set, merge local dataset
        if (loadedBlogs.length < BLOGS_PER_PAGE) {
          let filtered = [...initialBlogs];
          if (activeCategory !== 'All') {
            filtered = filtered.filter(b => b.category.toLowerCase().includes(activeCategory.toLowerCase()));
          }
          
          // Merge avoiding duplicate IDs
          const existingIds = new Set(loadedBlogs.map(b => b._id || b.id));
          for (const localBlog of filtered) {
            if (!existingIds.has(localBlog._id || localBlog.id)) {
              loadedBlogs.push(localBlog);
            }
          }
          totalCount = loadedBlogs.length;
        }

        // Apply client-side search filtering if query exists
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          loadedBlogs = loadedBlogs.filter(
            (b) =>
              b.title.toLowerCase().includes(q) ||
              b.excerpt.toLowerCase().includes(q) ||
              (b.category && b.category.toLowerCase().includes(q))
          );
          totalCount = loadedBlogs.length;
        }

        // Paginate locally to ensure EXACTLY 10 per page
        const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
        const paginatedBlogs = loadedBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
        const computedPages = Math.ceil(totalCount / BLOGS_PER_PAGE) || 1;

        setBlogs(paginatedBlogs);
        setTotalBlogs(totalCount);
        setTotalPages(computedPages);
      } catch (error) {
        console.error('Error in blog processing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, activeCategory, searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, activeCategory, searchQuery]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;
    return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50 select-none text-left">
      
      {/* Page Hero Header */}
      <div className="bg-white border-b border-slate-100 py-10 text-center select-none">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Blog & Knowledge Center</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-semibold max-w-xl mx-auto">
            Practical insights, certification exam roadmaps, and industry best practices from certified experts.
          </p>
          <div className="flex justify-center items-center gap-1.5 text-xs text-slate-400 font-semibold mt-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-500">Blog</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Blogs List (8 cols) */}
          <main className="lg:col-span-8 space-y-8 text-left">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse h-52"></div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl py-20 px-6 text-center shadow-sm">
                <BookOpen className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <h3 className="font-extrabold text-xl text-textdark">No Articles Found</h3>
                <p className="text-sm text-textmuted mt-2 max-w-sm mx-auto">
                  We couldn't find any articles matching your filters. Try resetting your search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setCurrentPage(1);
                  }}
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-lg mt-5 shadow transition-all"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {blogs.map((blog) => (
                    <div 
                      key={blog._id || blog.id} 
                      className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start"
                    >
                      {/* Left: Image */}
                      <Link 
                        to={`/blog/${blog.slug}`} 
                        className="w-full md:w-[320px] aspect-[16/10] md:aspect-auto md:h-[220px] rounded-xl overflow-hidden flex-shrink-0 bg-slate-100/70 flex items-center justify-center relative group border border-slate-200/60 p-1"
                      >
                        <img 
                          src={getBlogCoverImage(blog)} 
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'; }} 
                          alt={blog.title} 
                          className="w-full h-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </Link>

                      {/* Right: Info */}
                      <div className="flex-1 flex flex-col justify-between h-full py-0.5 text-left">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-50 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                              {blog.category}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[11px] text-slate-400 font-semibold">{blog.readTime || '5 min read'}</span>
                          </div>

                          <Link 
                            to={`/blog/${blog.slug}`}
                            className="text-base sm:text-lg font-extrabold text-slate-800 hover:text-primary transition-colors leading-snug line-clamp-2"
                          >
                            {blog.title}
                          </Link>
                          
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3 text-xs">
                          <span className="text-slate-400 font-semibold">By <strong className="text-slate-700 font-bold">{blog.author || 'LearnersKart Expert'}</strong></span>
                          <Link 
                            to={`/blog/${blog.slug}`}
                            className="text-primary hover:text-primary-dark font-extrabold inline-flex items-center gap-1 hover:underline"
                          >
                            Read Article &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mt-8">
                    <p className="text-xs text-slate-500 font-semibold">
                      Showing Page <span className="font-extrabold text-slate-800">{currentPage}</span> of <span className="font-extrabold text-slate-800">{totalPages}</span> ({totalBlogs} Articles Total)
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                            currentPage === i + 1
                              ? 'bg-primary text-white shadow-sm'
                              : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>

          {/* RIGHT COLUMN: Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 text-left">
            
            {/* Search Box */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-800 mb-4">Search Articles</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by keyword..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary px-4 py-3 pl-10 rounded-xl outline-none text-xs font-semibold transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      activeCategory === cat
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {cat === 'All' ? initialBlogs.length : initialBlogs.filter(b => b.category.toLowerCase().includes(cat.toLowerCase())).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-[#0a3d91] to-[#1e58c1] rounded-2xl p-6 text-white shadow-md text-center space-y-4">
              <BookOpen className="w-10 h-10 text-white/80 mx-auto" />
              <h4 className="font-extrabold text-lg leading-tight">Ready for Certification?</h4>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                Enroll in our live instructor-led bootcamps with 100% exam pass guarantee support.
              </p>
              <Link
                to="/courses"
                className="inline-block w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 rounded-xl text-xs shadow transition-all"
              >
                Explore All Courses
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
