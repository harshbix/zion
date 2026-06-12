'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { menuItems, categories } from '@/lib/menu';
import AdminModal from '@/components/admin/AdminModal';
import ConflictBanner from '@/components/admin/ConflictBanner';
import { formatCurrency } from '@/lib/utils';

interface ProductFormState {
  id: string;
  name: string;
  price: number;
  category: 'cakes' | 'juices' | 'meals' | 'snacks';
  description: string;
  image: string;
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cakes' | 'juices' | 'meals' | 'snacks'>('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormState | null>(null);
  
  // Form values
  const [formValues, setFormValues] = useState<ProductFormState>({
    id: '',
    name: '',
    price: 0,
    category: 'cakes',
    description: '',
    image: '',
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Read from localStorage (overrides) or fallback to initial statically loaded items
    const stored = localStorage.getItem('zion_menu_items');
    if (stored) {
      try {
        setProductsList(JSON.parse(stored));
      } catch (e) {
        setProductsList(menuItems);
      }
    } else {
      setProductsList(menuItems);
    }
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormValues({
      id: 'p' + (productsList.length + 1) + Math.floor(Math.random() * 100),
      name: '',
      price: 0,
      category: 'cakes',
      description: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormValues({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict schema validation mapping to menuItems structure
    const updatedProduct = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      priceString: formValues.price.toLocaleString('en-US') + ' TZS',
      category: formValues.category,
      image: formValues.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
      featured: editingProduct ? editingProduct.id.includes('c') || editingProduct.id.includes('j') : false,
      tags: editingProduct ? (editingProduct as any).tags : ['custom'],
    };

    // Optimistic UI updates
    const currentList = [...productsList];
    let nextList = [];
    if (editingProduct) {
      nextList = currentList.map(p => p.id === formValues.id ? updatedProduct : p);
    } else {
      nextList = [updatedProduct, ...currentList];
    }
    
    setProductsList(nextList);
    setIsModalOpen(false);

    startTransition(async () => {
      // Simulate slow API write & commit persistence
      await new Promise(resolve => setTimeout(resolve, 800));

      localStorage.setItem('zion_menu_items', JSON.stringify(nextList));

      // Append log entry
      const log = {
        id: String(Date.now()),
        action: editingProduct ? 'Updated Product' : 'Added Product',
        target: updatedProduct.name,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      // Overwrite static memory and refresh modules
      window.location.reload();
    });
  };

  const deleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const nextList = productsList.filter(p => p.id !== id);
      setProductsList(nextList);

      localStorage.setItem('zion_menu_items', JSON.stringify(nextList));

      // Add log
      const log = {
        id: String(Date.now()),
        action: 'Deleted Product',
        target: name,
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    }
  };

  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and action bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-600 rounded-none"
            />
          </div>

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="border border-stone-200 text-xs py-2 px-3 bg-white focus:outline-none focus:border-amber-600 rounded-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Add trigger */}
        <button
          onClick={openAddModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-950 text-white font-bold uppercase tracking-wider text-[10px] px-5 py-3 hover:bg-amber-600 transition-colors rounded-none"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Products table */}
      <div className="bg-white border border-stone-200/50 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 text-stone-400 font-bold uppercase tracking-wider text-[9px] bg-stone-50">
              <th className="p-4 w-16">ID</th>
              <th className="p-4">Name (Title)</th>
              <th className="p-4 w-32">Price</th>
              <th className="p-4 w-28">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-stone-50/40 transition-colors">
                  <td className="p-4 font-mono text-stone-400 font-bold">{product.id}</td>
                  <td className="p-4 font-semibold text-stone-900">{product.name}</td>
                  <td className="p-4 font-medium text-stone-950">
                    {product.priceString || formatCurrency(product.price)}
                  </td>
                  <td className="p-4">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2 py-0.5 border border-amber-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs truncate text-stone-500">{product.description}</td>
                  <td className="p-4 text-right space-x-1 shrink-0">
                    <button
                      onClick={() => openEditModal(product)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-amber-600 hover:text-amber-700 text-stone-500 bg-white transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id, product.name)}
                      className="inline-flex items-center justify-center p-2 border border-stone-200 hover:border-red-600 hover:text-red-700 text-stone-500 bg-white transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-400">
                  No products matched the active filters.
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
        title={editingProduct ? 'Edit Catalog Item' : 'New Catalog Item'}
      >
        {isModalOpen && (
          <form onSubmit={saveProduct} className="space-y-5">
            {/* Show mock conflict warnings when editing */}
            {editingProduct && <ConflictBanner resourceName="product" />}

            {/* Strict field mapping fields */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Product Code (ID)
              </label>
              <input 
                type="text" 
                name="id"
                value={formValues.id}
                disabled
                className="w-full bg-stone-100 border border-stone-200 px-4 py-3 text-xs focus:outline-none rounded-none text-stone-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Title / Name
              </label>
              <input 
                type="text" 
                name="name"
                required
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                placeholder="Chocolate Dream Cake"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Price (TZS)
                </label>
                <input 
                  type="number" 
                  name="price"
                  required
                  min="0"
                  value={formValues.price}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                  placeholder="45000"
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
                  <option value="cakes">Cakes</option>
                  <option value="juices">Juices</option>
                  <option value="meals">Meals</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Unsplash Asset Image URL
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
                Description
              </label>
              <textarea 
                name="description"
                required
                rows={3}
                value={formValues.description}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none resize-none"
                placeholder="Rich, moist chocolate cake with premium cocoa ganache."
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
