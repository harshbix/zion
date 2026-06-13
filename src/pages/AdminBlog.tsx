import React, { useState, useEffect, useTransition } from 'react';
import { Plus, Edit3, Trash2, Search, Calendar, Clock } from 'lucide-react';
import { blogPosts, BlogPost } from '@/services/blog';
import AdminModal from '@/components/admin/AdminModal';
import ConflictBanner from '@/components/admin/ConflictBanner';
import ImageUploader from '@/components/admin/ImageUploader';

interface BlogFormState {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

export default function AdminBlogPage() {
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogFormState | null>(null);
  
  // Form values
  const [formValues, setFormValues] = useState<BlogFormState>({
    slug: '',
    title: '',
    excerpt: '',
    image: '',
    category: 'Sourcing',
    readTime: '5 min read',
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Load from localStorage or fallback
    const stored = localStorage.getItem('zion_blog_posts');
    if (stored) {
      try {
        setPostsList(JSON.parse(stored));
      } catch (e) {
        setPostsList(blogPosts);
      }
    } else {
      setPostsList(blogPosts);
    }
  }, []);

  const openAddModal = () => {
    setEditingPost(null);
    setFormValues({
      slug: '',
      title: '',
      excerpt: '',
      image: '',
      category: 'Sourcing',
      readTime: '5 min read',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormValues({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      readTime: post.readTime,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug from title if it's a new post
    const finalSlug = formValues.slug || formValues.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const updatedPost: BlogPost = {
      slug: finalSlug,
      title: formValues.title,
      excerpt: formValues.excerpt,
      image: formValues.image || 'https://images.unsplash.com/photo-1546173152-fd1adac65050?w=600&h=400&fit=crop',
      category: formValues.category,
      readTime: formValues.readTime,
      date: editingPost ? (editingPost as any).date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    const currentList = [...postsList];
    let nextList = [];
    
    if (editingPost) {
      nextList = currentList.map(p => p.slug === formValues.slug ? updatedPost : p);
    } else {
      nextList = [updatedPost, ...currentList];
    }
    
    setPostsList(nextList);
    setIsModalOpen(false);

    startTransition(async () => {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem('zion_blog_posts', JSON.stringify(nextList));

      // Append log entry
      const log = {
        id: String(Date.now()),
        action: editingPost ? 'Updated Blog Post' : 'Created Blog Post',
        target: updatedPost.title,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    });
  };

  const deletePost = (slug: string, title: string) => {
    if (confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      const nextList = postsList.filter(p => p.slug !== slug);
      setPostsList(nextList);
      localStorage.setItem('zion_blog_posts', JSON.stringify(nextList));

      // Add log
      const log = {
        id: String(Date.now()),
        action: 'Deleted Blog Post',
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

  const filteredPosts = postsList.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-600 rounded-none"
            />
          </div>

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-stone-200 text-xs py-2 px-3 bg-white focus:outline-none focus:border-amber-600 rounded-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Sourcing">Sourcing</option>
            <option value="Technique">Technique</option>
            <option value="Recipes">Recipes</option>
          </select>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-950 text-white font-bold uppercase tracking-wider text-[10px] px-5 py-3 hover:bg-amber-600 transition-colors rounded-none"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </button>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white border border-stone-200/50 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 text-stone-400 font-bold uppercase tracking-wider text-[9px] bg-stone-50">
              <th className="p-4">Cover</th>
              <th className="p-4">Title</th>
              <th className="p-4 w-28">Category</th>
              <th className="p-4 w-32">Published</th>
              <th className="p-4 w-28">Read Time</th>
              <th className="p-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <tr key={post.slug} className="hover:bg-stone-50/40 transition-colors">
                  <td className="p-4 w-20">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-12 h-8 object-cover border border-stone-200" 
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-stone-900">{post.title}</div>
                    <div className="text-stone-400 text-[10px] mt-0.5 max-w-sm truncate">{post.excerpt}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2 py-0.5 border border-amber-100">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4 text-stone-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {post.date}
                    </div>
                  </td>
                  <td className="p-4 text-stone-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {post.readTime}
                    </div>
                  </td>
                  <td className="p-4 text-right space-x-1 shrink-0">
                    <button
                      onClick={() => openEditModal(post)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-amber-600 hover:text-amber-700 text-stone-500 bg-white transition-colors"
                      title="Edit Post"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePost(post.slug, post.title)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-red-600 hover:text-red-700 text-stone-500 bg-white transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-400">
                  No articles found.
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
        title={editingPost ? 'Edit Blog Article' : 'New Blog Article'}
      >
        {isModalOpen && (
          <form onSubmit={savePost} className="space-y-5">
            {editingPost && <ConflictBanner resourceName="blog post" />}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Article Title
              </label>
              <input 
                type="text" 
                name="title"
                required
                value={formValues.title}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                placeholder="The Magic of Vanilla Sourcing"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Read Time
                </label>
                <input 
                  type="text" 
                  name="readTime"
                  required
                  value={formValues.readTime}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                  placeholder="5 min read"
                />
              </div>
            </div>

            <div>
              <ImageUploader 
                value={formValues.image}
                onChange={(url) => setFormValues(prev => ({ ...prev, image: url }))}
                label="Article Cover Image"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Short Excerpt / Description
              </label>
              <textarea 
                name="excerpt"
                required
                rows={4}
                value={formValues.excerpt}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none resize-none"
                placeholder="Brief summary introducing the article to display on the feeds..."
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
                    Saving Article...
                  </>
                ) : (
                  'Save Post'
                )}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
