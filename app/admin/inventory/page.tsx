"use client";

import React, { useState } from 'react';
import {
  AdminSearchIcon,
  AdminAlertIcon,
  AdminCheckIcon,
  AdminEditIcon,
  AdminCloseIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_PRODUCTS, AdminProduct } from '../../components/admin/adminData';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState<'All' | 'Low' | 'Out'>('All');
  const [adjustingProduct, setAdjustingProduct] = useState<AdminProduct | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState('Restock received');

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    if (stockFilter === 'Low') {
      return matchesSearch && p.stock > 0 && p.stock <= p.lowStockThreshold;
    }
    if (stockFilter === 'Out') {
      return matchesSearch && p.stock <= 0;
    }
    return matchesSearch;
  });

  const handleOpenAdjust = (prod: AdminProduct) => {
    setAdjustingProduct(prod);
    setNewStockVal(prod.stock);
    setAdjustmentReason('Restock shipment');
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;

    setProducts(products.map(p => {
      if (p.id === adjustingProduct.id) {
        return {
          ...p,
          stock: Math.max(0, newStockVal),
          status: newStockVal <= 0 ? 'Out of Stock' : (p.status === 'Out of Stock' ? 'Published' : p.status)
        };
      }
      return p;
    }));

    setAdjustingProduct(null);
  };

  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const outOfStockCount = products.filter(p => p.stock <= 0).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventory & Stock Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">Audit warehouse quantities, adjust units, and monitor replenishment alerts.</p>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <p className="text-xs font-medium text-slate-500">Total Units in Stock</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalUnits} units</p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <p className="text-xs font-medium text-amber-600">Low Stock Warnings</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{lowStockCount} items</p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <p className="text-xs font-medium text-rose-600">Out of Stock</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{outOfStockCount} items</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKU or Part..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStockFilter('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              stockFilter === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Inventory
          </button>
          <button
            onClick={() => setStockFilter('Low')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              stockFilter === 'Low' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setStockFilter('Out')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              stockFilter === 'Out' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">SKU & Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Units in Hand</th>
                <th className="px-5 py-3.5">Alert Level</th>
                <th className="px-5 py-3.5">Stock Status</th>
                <th className="px-5 py-3.5 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No inventory records found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-400 font-mono">SKU: {item.sku} &bull; P/N: {item.partNumber}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-700">
                      {item.category}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap font-bold text-slate-900 text-base">
                      {item.stock}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                      Low threshold: &le; {item.lowStockThreshold}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {item.stock <= 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          Out of Stock
                        </span>
                      ) : item.stock <= item.lowStockThreshold ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          Low Stock Alert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          Optimal
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleOpenAdjust(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <AdminEditIcon className="w-3.5 h-3.5 text-slate-500" />
                        <span>Adjust Stock</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Modal */}
      {adjustingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">Adjust Inventory Units</h2>
              <button onClick={() => setAdjustingProduct(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveStock} className="p-6 space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Product</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{adjustingProduct.name}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">SKU: {adjustingProduct.sku}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Total Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Adjustment</label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                >
                  <option value="Restock received">Restock shipment received</option>
                  <option value="Physical count discrepancy">Physical warehouse audit correction</option>
                  <option value="Damaged goods">Damaged / Written off</option>
                  <option value="Customer Return">Customer return to inventory</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdjustingProduct(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

