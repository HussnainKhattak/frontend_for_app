"use client";

import React, { useState } from 'react';
import {
  AdminPlusIcon,
  AdminEditIcon,
  AdminTrashIcon,
  AdminCloseIcon,
  AdminSearchIcon
} from '../../components/admin/AdminIcons';
import {
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  AdminCategory,
  AdminBrand
} from '../../components/admin/adminData';

export default function AdminCategoriesBrandsPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'brands'>('categories');
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES);
  const [brands, setBrands] = useState<AdminBrand[]>(INITIAL_BRANDS);

  // Category Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: '', slug: '', description: '', subCategories: '' });
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  // Brand Modal
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandFormData, setBrandFormData] = useState({ name: '', origin: '', website: '' });
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);

  // Search
  const [search, setSearch] = useState('');

  const handleOpenCategoryModal = (cat?: AdminCategory) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryFormData({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        subCategories: cat.subCategories.join(', ')
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({ name: '', slug: '', description: '', subCategories: '' });
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.name) return;

    const subCats = categoryFormData.subCategories
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? {
        ...c,
        name: categoryFormData.name,
        slug: categoryFormData.slug || categoryFormData.name.toLowerCase().replace(/\s+/g, '-'),
        description: categoryFormData.description,
        subCategories: subCats
      } : c));
    } else {
      setCategories([
        ...categories,
        {
          id: `cat-${Date.now()}`,
          name: categoryFormData.name,
          slug: categoryFormData.slug || categoryFormData.name.toLowerCase().replace(/\s+/g, '-'),
          description: categoryFormData.description,
          itemCount: 0,
          subCategories: subCats
        }
      ]);
    }
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Delete this category? Associated parts will remain in inventory.')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleOpenBrandModal = (br?: AdminBrand) => {
    if (br) {
      setEditingBrand(br);
      setBrandFormData({ name: br.name, origin: br.origin, website: br.website || '' });
    } else {
      setEditingBrand(null);
      setBrandFormData({ name: '', origin: '', website: '' });
    }
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandFormData.name) return;

    if (editingBrand) {
      setBrands(brands.map(b => b.id === editingBrand.id ? {
        ...b,
        name: brandFormData.name,
        origin: brandFormData.origin,
        website: brandFormData.website
      } : b));
    } else {
      setBrands([
        ...brands,
        {
          id: `br-${Date.now()}`,
          name: brandFormData.name,
          origin: brandFormData.origin || 'International',
          itemCount: 0,
          website: brandFormData.website
        }
      ]);
    }
    setIsBrandModalOpen(false);
  };

  const handleDeleteBrand = (id: string) => {
    if (confirm('Delete this brand?')) {
      setBrands(brands.filter(b => b.id !== id));
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBrands = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.origin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Categories & Brands</h1>
          <p className="text-sm text-slate-500 mt-1">Organize spare parts taxonomy, subcategories, and manufacturer profiles.</p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'categories' ? (
            <button
              onClick={() => handleOpenCategoryModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <AdminPlusIcon className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          ) : (
            <button
              onClick={() => handleOpenBrandModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <AdminPlusIcon className="w-4 h-4" />
              <span>Add Brand</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'categories'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Categories ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab('brands')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'brands'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manufacturers & Brands ({brands.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${activeTab}...`}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400"
        />
      </div>

      {/* Categories View */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl">
              No categories created yet.
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                      <span className="text-xs font-mono text-slate-400">/{cat.slug}</span>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                      {cat.itemCount} items
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{cat.description}</p>
                  {cat.subCategories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cat.subCategories.map((sub, i) => (
                        <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenCategoryModal(cat)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
                    title="Edit"
                  >
                    <AdminEditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                    title="Delete"
                  >
                    <AdminTrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Brands View */}
      {activeTab === 'brands' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBrands.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl">
              No brands registered yet.
            </div>
          ) : (
            filteredBrands.map((brand) => (
              <div key={brand.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{brand.name}</h3>
                      <span className="text-xs text-slate-500">Origin: {brand.origin}</span>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                      {brand.itemCount} parts
                    </span>
                  </div>
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-xs text-slate-500 hover:text-slate-900 underline truncate max-w-full"
                    >
                      {brand.website}
                    </a>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenBrandModal(brand)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
                    title="Edit"
                  >
                    <AdminEditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(brand.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                    title="Delete"
                  >
                    <AdminTrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                  placeholder="e.g. Steering & Transmission"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={categoryFormData.slug}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })}
                  placeholder="steering-transmission"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                  placeholder="Parts relating to rack, tie rods, transmission fluid..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subcategories (comma separated)</label>
                <input
                  type="text"
                  value={categoryFormData.subCategories}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, subCategories: e.target.value })}
                  placeholder="Power Steering Pumps, Tie Rods, Gear Fluid"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Modal */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">
                {editingBrand ? 'Edit Brand' : 'Add Brand'}
              </h2>
              <button onClick={() => setIsBrandModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBrand} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brandFormData.name}
                  onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
                  placeholder="e.g. Denso"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country of Origin</label>
                <input
                  type="text"
                  value={brandFormData.origin}
                  onChange={(e) => setBrandFormData({ ...brandFormData, origin: e.target.value })}
                  placeholder="e.g. Japan"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={brandFormData.website}
                  onChange={(e) => setBrandFormData({ ...brandFormData, website: e.target.value })}
                  placeholder="https://denso.com"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

