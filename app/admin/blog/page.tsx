'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import AdminModal from '@/components/admin/AdminModal';
import ConflictBanner from '@/components/admin/ConflictBanner';

interface BlogFormState {
  slug: string;
  title: string;
  excerpt: string; // CMS "content" field
  date: string;
  image: string;
  readTime: string;
  category: string;
}

export default function BlogCMSPage() {
  const [blogsList, setBlogsList] = useState<BlogFormState[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogFormState | null>(null);
  
  // Form values
  const [formValues, setFormValues] = useState<BlogFormState>({
    slug: '',
    title: '',
    excerpt: '',
    date: '',
    image: '',
    readTime: '5 min read',
    category: 'Technique',
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = localStorage.getItem('zion_blog_posts');
    if (stored) {
      try {
        setBlogsList(JSON.parse(stored));
      } catch (e) {
        setBlogsList(blogPosts);
      }
    } else {
      setBlogsList(blogPosts);
    }
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    setFormValues({
      slug: '',
      title: '',
      excerpt: '',
      date: formattedDate,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
      readTime: '5 min read',
      category: 'Technique',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogFormState) => {
    setEditingBlog(blog);
    setFormValues({ ...blog });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => {
      const nextState = { ...prev, [name]: value };
      
      // Auto-generate slug from title if we are creating a new post and editing title
      if (name === 'title' && !editingBlog) {
        nextState.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // remove special chars
          .replace(/\s+/g, '-') // spaces to dashes
          .replace(/-+/g, '-'); // trim consecutive dashes
      }
      return nextState;
    });
  };

  const saveBlog = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate dynamic read time based on word count
    const words = formValues.excerpt.split(/\s+/).length;
    const computedReadTime = Math.max(1, Math.ceil(words / 150)) + ' min read';

    const updatedBlog: BlogFormState = {
      slug: formValues.slug,
      title: formValues.title,
      excerpt: formValues.excerpt,
      date: formValues.date,
      image: formValues.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
      readTime: editingBlog ? formValues.readTime : computedReadTime,
      category: formValues.category,
    };

    // Optimistic UI updates
    const currentList = [...blogsList];
    let nextList = [];
    if (editingBlog) {
      nextList = currentList.map(b => b.slug === editingBlog.slug ? updatedBlog : b);
    } else {
      nextList = [updatedBlog, ...currentList];
    }
    
    setBlogsList(nextList);
    setIsModalOpen(false);

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 800));

      localStorage.setItem('zion_blog_posts', JSON.stringify(nextList));

      // Log action
      const log = {
        id: String(Date.now()),
        action: editingBlog ? 'Updated Article' : 'Published Article',
        target: updatedBlog.title,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    });
  };

  const deleteBlog = (slug: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const nextList = blogsList.filter(b => b.slug !== slug);
      setBlogsList(nextList);

      localStorage.setItem('zion_blog_posts', JSON.stringify(nextList));

      // Add log
      const log = {
        id: String(Date.now()),
        action: 'Deleted Article',
        target: title,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    }
  };

  const filteredBlogs = blogsList.filter(blog => {
    return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Search and action bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filters */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-600 rounded-none"
          />
        </div>

        {/* Add trigger */}
        <button
          onClick={openAddModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-950 text-white font-bold uppercase tracking-wider text-[10px] px-5 py-3 hover:bg-amber-600 transition-colors rounded-none"
        >
          <Plus className="w-4 h-4" /> Create Post
        </button>
      </div>

      {/* Blogs table */}
      <div className="bg-white border border-stone-200/50 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 text-stone-400 font-bold uppercase tracking-wider text-[9px] bg-stone-50">
              <th className="p-4">Title</th>
              <th className="p-4 w-48">URL Slug</th>
              <th className="p-4 w-28">Date</th>
              <th className="p-4 w-24">Read Time</th>
              <th className="p-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map(blog => (
                <tr key={blog.slug} className="hover:bg-stone-50/40 transition-colors">
                  <td className="p-4 font-semibold text-stone-900">{blog.title}</td>
                  <td className="p-4 font-mono text-stone-500">{blog.slug}</td>
                  <td className="p-4 text-stone-600">{blog.date}</td>
                  <td className="p-4 text-stone-500">{blog.readTime}</td>
                  <td className="p-4 text-right space-x-1 shrink-0">
                    <button
                      onClick={() => openEditModal(blog)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-amber-600 hover:text-amber-700 text-stone-500 bg-white transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.slug, blog.title)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-red-600 hover:text-red-700 text-stone-500 bg-white transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-stone-400">
                  No articles matched your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? 'Edit Blog Article' : 'New Blog Article'}
      >
        {isModalOpen && (
          <form onSubmit={saveBlog} className="space-y-5">
            {editingBlog && <ConflictBanner resourceName="blog article" />}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Title
              </label>
              <input 
                type="text" 
                name="title"
                required
                value={formValues.title}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                placeholder="The Science of Sourdough..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                URL Slug
              </label>
              <input 
                type="text" 
                name="slug"
                required
                value={formValues.slug}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none font-mono"
                placeholder="science-of-sourdough"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Published Date
                </label>
                <input 
                  type="text" 
                  name="date"
                  required
                  value={formValues.date}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                  placeholder="June 01, 2026"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Category
                </label>
                <select 
                  name="category"
                  required
                  value={formValues.category}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none cursor-pointer"
                >
                  <option value="Sourcing">Sourcing</option>
                  <option value="Technique">Technique</option>
                  <option value="Recipes">Recipes</option>
                  <option value="News">News</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Cover Image URL
              </label>
              <input 
                type="url" 
                name="image"
                required
                value={formValues.image}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Content (Excerpt)
              </label>
              <textarea 
                name="excerpt"
                required
                rows={5}
                value={formValues.excerpt}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none resize-none"
                placeholder="Type the main summary of the post here..."
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-stone-200 hover:border-stone-900 font-bold uppercase tracking-wider text-[9px] transition-colors rounded-none bg-white text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-stone-950 hover:bg-amber-600 font-bold uppercase tracking-wider text-[9px] text-white transition-colors rounded-none disabled:opacity-60 flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <span className="w-3 h-3 border border-white border-t-transparent animate-spin inline-block" />
                    Commiting Overwrite...
                  </>
                ) : (
                  'Commit Overwrite'
                )}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
