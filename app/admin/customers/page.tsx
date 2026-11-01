"use client";

import React, { useState } from 'react';
import {
  AdminSearchIcon,
  AdminEyeIcon,
  AdminCloseIcon,
  AdminCustomersIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_CUSTOMERS, AdminCustomer } from '../../components/admin/adminData';

export default function AdminCustomersPage() {
  const [customers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Customer Directory</h1>
          <p className="text-sm text-slate-500 mt-1">View registered workshop clients, lifetime orders, and transaction history.</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
        <div className="relative w-full max-w-sm">
          <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or city..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} customers</span>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Lifetime Orders</th>
                <th className="px-5 py-3.5">Total Spent</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No registered customers found.
                  </td>
                </tr>
              ) : (
                filtered.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                          {cust.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{cust.name}</p>
                          <span className="text-xs text-emerald-600 font-medium">Status: {cust.status}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-slate-900 text-sm">{cust.email}</p>
                      <p className="text-xs text-slate-400">{cust.phone}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-700">
                      {cust.city}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-900">{cust.totalOrders} orders</span>
                      <span className="block text-[11px] text-slate-400">Last: {cust.lastOrderDate}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap font-bold text-slate-900">
                      ${cust.totalSpend.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <AdminEyeIcon className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">Customer Profile</h2>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-500">Verified Workshop Client</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Revenue</span>
                  <p className="text-lg font-bold text-slate-900">${selectedCustomer.totalSpend.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Completed Orders</span>
                  <p className="text-lg font-bold text-slate-900">{selectedCustomer.totalOrders}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <p><strong className="text-slate-900">Email:</strong> {selectedCustomer.email}</p>
                <p><strong className="text-slate-900">Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong className="text-slate-900">Primary City:</strong> {selectedCustomer.city}</p>
                <p><strong className="text-slate-900">Last Active:</strong> {selectedCustomer.lastOrderDate}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

