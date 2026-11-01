"use client";

import React, { useState } from 'react';
import {
  AdminPlusIcon,
  AdminTrashIcon,
  AdminCloseIcon,
  AdminCheckIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_COUPONS, AdminCoupon } from '../../components/admin/adminData';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(INITIAL_COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AdminCoupon>>({
    code: '',
    discountType: 'Percentage',
    value: 10,
    minSpend: 50,
    usageLimit: 100,
    expiryDate: '2026-12-31',
    status: 'Active'
  });

  const handleToggleStatus = (id: string, current: string) => {
    const next = current === 'Active' ? 'Disabled' : 'Active';
    setCoupons(coupons.map(c => c.id === id ? { ...c, status: next as any } : c));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this coupon code?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.value) return;

    setCoupons([
      ...coupons,
      {
        id: `cp-${Date.now()}`,
        code: formData.code.toUpperCase().trim(),
        discountType: formData.discountType || 'Percentage',
        value: Number(formData.value) || 0,
        minSpend: Number(formData.minSpend) || 0,
        usageCount: 0,
        usageLimit: Number(formData.usageLimit) || 100,
        expiryDate: formData.expiryDate || '2026-12-31',
        status: 'Active'
      }
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Coupons & Promo Codes</h1>
          <p className="text-sm text-slate-500 mt-1">Configure promotional discount codes for spare parts checkout and workshop bookings.</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              code: '',
              discountType: 'Percentage',
              value: 10,
              minSpend: 50,
              usageLimit: 100,
              expiryDate: '2026-12-31',
              status: 'Active'
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
        >
          <AdminPlusIcon className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Promo Code</th>
                <th className="px-5 py-3.5">Discount</th>
                <th className="px-5 py-3.5">Min Spend</th>
                <th className="px-5 py-3.5">Usage & Limit</th>
                <th className="px-5 py-3.5">Expiration</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    No promotional coupons or discount codes configured yet.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 whitespace-nowrap font-mono font-bold text-slate-900 text-base">
                      {coupon.code}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap font-semibold text-slate-900">
                      {coupon.discountType === 'Percentage' ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-700">
                      ${coupon.minSpend.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-900">{coupon.usageCount}</span>
                      <span className="text-slate-400"> / {coupon.usageLimit} uses</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-600">
                      {coupon.expiryDate}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(coupon.id, coupon.status)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                          coupon.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {coupon.status}
                      </button>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                        title="Delete"
                      >
                        <AdminTrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">Create New Coupon</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCoupon} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SUMMER25"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Value *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.value ?? ''}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                    placeholder="15"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min Spend ($)</label>
                  <input
                    type="number"
                    value={formData.minSpend ?? ''}
                    onChange={(e) => setFormData({ ...formData, minSpend: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Max Usages</label>
                  <input
                    type="number"
                    value={formData.usageLimit ?? ''}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value, 10) })}
                    placeholder="100"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expiration Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

