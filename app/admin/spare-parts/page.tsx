"use client";

import React, { useState } from 'react';
import {
  AdminPlusIcon,
  AdminSearchIcon,
  AdminFilterIcon,
  AdminEditIcon,
  AdminTrashIcon,
  AdminCloseIcon,
  AdminAlertIcon,
  AdminCheckIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS, AdminProduct } from '../../components/admin/adminData';

export default function AdminSparePartsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form states for Add / Edit
  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: '',
    slug: '',
    partNumber: '',
    sku: '',
    oemNumber: '',
    brand: 'Brembo',
    category: 'Brakes & Suspension',
    subCategory: 'Brake Pads',
    price: 0,
    salePrice: undefined,
    costPrice: 0,
    stock: 10,
    lowStockThreshold: 5,
    condition: 'Brand New',
    warranty: '1 Year',
    status: 'Published',
    featured: false,
    images: ['/products/brake-pads.jpg'],
    description: '',
    fitment: ['Universal']
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      partNumber: '',
      sku: `SKU-${Math.floor(100 + Math.random() * 900)}`,
      oemNumber: '',
      brand: INITIAL_BRANDS[0]?.name || 'Brembo',
      category: INITIAL_CATEGORIES[0]?.name || 'Brakes & Suspension',
      subCategory: 'Brake Pads',
      price: 0,
      costPrice: 0,
      stock: 10,
      lowStockThreshold: 5,
      condition: 'Brand New',
      warranty: '1 Year',
      status: 'Published',
      featured: false,
      images: ['/products/brake-pads.jpg'],
      description: '',
      fitment: ['Toyota Corolla (2014-2022)']
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this spare part listing?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.partNumber || !formData.price) {
      alert('Please fill in required fields: Name, Part Number, and Price.');
      return;
    }

    if (editingProduct) {
      // Update
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } as AdminProduct : p));
    } else {
      // Add
      const newProduct: AdminProduct = {
        id: `prod-${Date.now()}`,
        name: formData.name || '',
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        partNumber: formData.partNumber || '',
        sku: formData.sku || `SKU-${Date.now()}`,
        oemNumber: formData.oemNumber || '',
        brand: formData.brand || 'Brembo',
        category: formData.category || 'Brakes & Suspension',
        subCategory: formData.subCategory || 'Brake Pads',
        price: Number(formData.price) || 0,
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        costPrice: Number(formData.costPrice) || 0,
        stock: Number(formData.stock) || 0,
        lowStockThreshold: Number(formData.lowStockThreshold) || 5,
        condition: formData.condition || 'Brand New',
        warranty: formData.warranty || '1 Year',
        status: formData.status || 'Published',
        featured: !!formData.featured,
        images: formData.images || ['/products/brake-pads.jpg'],
        description: formData.description || '',
        specifications: formData.specifications || {},
        fitment: formData.fitment || ['Universal']
      };
      setProducts([newProduct, ...products]);
    }

    setIsModalOpen(false);
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Spare Parts Catalog</h1>
          <p className="text-sm text-slate-500 mt-1">Manage workshop replacement parts, OEM numbers, pricing, and fitment.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
        >
          <AdminPlusIcon className="w-4 h-4" />
          <span>Add Spare Part</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search part name, OEM, or SKU..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-700"
          >
            <option value="All">All Categories</option>
            {INITIAL_CATEGORIES.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <span className="text-xs font-medium text-slate-500 ml-auto md:ml-0">
            {filteredProducts.length} items found
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Product & SKU</th>
                <th className="px-5 py-3.5">Brand / Category</th>
                <th className="px-5 py-3.5">Price / Cost</th>
                <th className="px-5 py-3.5">Stock</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No spare parts matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((part) => (
                  <tr key={part.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-400 shrink-0">
                          PARTS
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-snug">{part.name}</p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">
                            Part #: {part.partNumber} &bull; OEM: {part.oemNumber || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{part.brand}</div>
                      <div className="text-xs text-slate-400">{part.category}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">
                        ${part.price.toFixed(2)}
                        {part.salePrice && (
                          <span className="ml-1.5 text-xs text-emerald-600 font-normal">
                            Sale: ${part.salePrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">Cost: ${part.costPrice.toFixed(2)}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        part.stock <= 0
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : part.stock <= part.lowStockThreshold
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {part.stock <= 0 ? 'Out of stock' : `${part.stock} in stock`}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        part.status === 'Published'
                          ? 'bg-slate-900 text-white'
                          : part.status === 'Draft'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {part.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(part)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <AdminEditIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(part.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <AdminTrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">
                {editingProduct ? 'Edit Spare Part Listing' : 'Add New Spare Part'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Basic Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">1. Identification & Names</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Part Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ceramic Front Brake Pads Set"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Part Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.partNumber || ''}
                      onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                      placeholder="e.g. BP-TY-092"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">SKU Code</label>
                    <input
                      type="text"
                      value={formData.sku || ''}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="e.g. SKU-BRK-001"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">OEM Cross-Reference</label>
                    <input
                      type="text"
                      value={formData.oemNumber || ''}
                      onChange={(e) => setFormData({ ...formData, oemNumber: e.target.value })}
                      placeholder="e.g. 04465-02220"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Condition</label>
                    <select
                      value={formData.condition || 'Brand New'}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    >
                      <option value="Brand New">Brand New</option>
                      <option value="OEM">OEM Genuine</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Aftermarket">Aftermarket</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Categorization & Brand */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">2. Category & Brand</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
                    <select
                      value={formData.brand || 'Brembo'}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    >
                      {INITIAL_BRANDS.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category || 'Brakes & Suspension'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    >
                      {INITIAL_CATEGORIES.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subcategory</label>
                    <input
                      type="text"
                      value={formData.subCategory || ''}
                      onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                      placeholder="e.g. Brake Pads"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">3. Pricing & Inventory</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Selling Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price ?? ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sale Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.salePrice ?? ''}
                      onChange={(e) => setFormData({ ...formData, salePrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="Optional"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Cost Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.costPrice ?? ''}
                      onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Stock *</label>
                    <input
                      type="number"
                      required
                      value={formData.stock ?? ''}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value, 10) })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Warranty */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">4. Description & Warranty</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Product Description</label>
                    <textarea
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed automotive specifications, materials, and benefits..."
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Warranty Term</label>
                      <input
                        type="text"
                        value={formData.warranty || ''}
                        onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                        placeholder="e.g. 1 Year / 20,000 km"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Publish Status</label>
                      <select
                        value={formData.status || 'Published'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  {editingProduct ? 'Update Part' : 'Save & Publish Part'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

