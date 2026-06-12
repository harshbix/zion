'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Edit3, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';
import { reviews } from '@/lib/reviews';
import AdminModal from '@/components/admin/AdminModal';
import ConflictBanner from '@/components/admin/ConflictBanner';

interface ReviewFormState {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  tags: string[];
  verified: boolean;
}

export default function ReviewsCMSPage() {
  const [reviewsList, setReviewsList] = useState<ReviewFormState[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewFormState | null>(null);
  
  // Form values
  const [formValues, setFormValues] = useState<ReviewFormState>({
    id: '',
    author: '',
    rating: 5,
    date: '',
    text: '',
    tags: [],
    verified: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = localStorage.getItem('zion_reviews');
    if (stored) {
      try {
        setReviewsList(JSON.parse(stored));
      } catch (e) {
        setReviewsList(reviews as any);
      }
    } else {
      setReviewsList(reviews as any);
    }
  }, []);

  const openEditModal = (review: ReviewFormState) => {
    setEditingReview(review);
    setFormValues({ ...review });
    setTagInput(review.tags?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const toggleVerifyStatus = (id: string) => {
    const nextList = reviewsList.map(r => {
      if (r.id === id) {
        return { ...r, verified: !r.verified };
      }
      return r;
    });
    setReviewsList(nextList);
    localStorage.setItem('zion_reviews', JSON.stringify(nextList));
  };

  const saveReview = (e: React.FormEvent) => {
    e.preventDefault();

    // Map input tags back to string array
    const parsedTags = tagInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);

    const updatedReview: ReviewFormState = {
      id: formValues.id,
      author: formValues.author,
      rating: formValues.rating,
      date: formValues.date,
      text: formValues.text,
      tags: parsedTags,
      verified: formValues.verified,
    };

    // Optimistic UI updates
    const nextList = reviewsList.map(r => r.id === formValues.id ? updatedReview : r);
    setReviewsList(nextList);
    setIsModalOpen(false);

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 800));

      localStorage.setItem('zion_reviews', JSON.stringify(nextList));

      // Log action
      const log = {
        id: String(Date.now()),
        action: 'Moderated Review',
        target: `From ${updatedReview.author}`,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    });
  };

  const deleteReview = (id: string, author: string) => {
    if (confirm(`Are you sure you want to delete review from "${author}"?`)) {
      const nextList = reviewsList.filter(r => r.id !== id);
      setReviewsList(nextList);

      localStorage.setItem('zion_reviews', JSON.stringify(nextList));

      // Add log
      const log = {
        id: String(Date.now()),
        action: 'Deleted Review',
        target: `From ${author}`,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    }
  };

  const filteredReviews = reviewsList.filter(review => {
    return review.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
           review.text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Search and filter action bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filters */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-600 rounded-none"
          />
        </div>
      </div>

      {/* Reviews table */}
      <div className="bg-white border border-stone-200/50 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 text-stone-400 font-bold uppercase tracking-wider text-[9px] bg-stone-50">
              <th className="p-4 w-40">Author</th>
              <th className="p-4 w-24">Rating</th>
              <th className="p-4 w-28">Date</th>
              <th className="p-4">Review Message</th>
              <th className="p-4 w-28">Verified</th>
              <th className="p-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            {filteredReviews.length > 0 ? (
              filteredReviews.map(review => (
                <tr key={review.id} className="hover:bg-stone-50/40 transition-colors">
                  <td className="p-4 font-semibold text-stone-900">{review.author}</td>
                  <td className="p-4 text-amber-500 font-bold">{'★'.repeat(review.rating)}</td>
                  <td className="p-4 text-stone-500">{review.date}</td>
                  <td className="p-4 max-w-sm truncate text-stone-650">{review.text}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleVerifyStatus(review.id)}
                      className={`inline-flex items-center gap-1.5 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border ${
                        review.verified 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-250' 
                          : 'bg-stone-50 text-stone-400 border-stone-200'
                      }`}
                      title="Toggle verification badge"
                    >
                      {review.verified ? 'Verified' : 'Unverified'}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-1 shrink-0">
                    <button
                      onClick={() => openEditModal(review)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-amber-600 hover:text-amber-700 text-stone-500 bg-white transition-colors"
                      title="Edit Review Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteReview(review.id, review.author)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-red-600 hover:text-red-700 text-stone-500 bg-white transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-400">
                  No reviews matched your search.
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
        title="Moderate Guest Review"
      >
        {isModalOpen && (
          <form onSubmit={saveReview} className="space-y-5">
            {editingReview && <ConflictBanner resourceName="guest review" />}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Author
                </label>
                <input 
                  type="text" 
                  name="author"
                  required
                  value={formValues.author}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Rating Stars
                </label>
                <select 
                  name="rating"
                  required
                  value={formValues.rating}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none cursor-pointer"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Published Date
              </label>
              <input 
                type="date" 
                name="date"
                required
                value={formValues.date}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Tags (Comma Separated)
              </label>
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                placeholder="cakes, quality, customer service"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox" 
                id="verified"
                name="verified"
                checked={formValues.verified}
                onChange={(e) => setFormValues(prev => ({ ...prev, verified: e.target.checked }))}
                className="w-4 h-4 text-amber-600 border-stone-250 focus:ring-amber-500 rounded-none cursor-pointer"
              />
              <label htmlFor="verified" className="text-xs font-bold uppercase tracking-wider text-stone-700 cursor-pointer select-none">
                Verify review session (Verified Guest badge)
              </label>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Review Text
              </label>
              <textarea 
                name="text"
                required
                rows={4}
                value={formValues.text}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none resize-none"
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
