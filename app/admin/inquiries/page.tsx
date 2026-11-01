"use client";

import React, { useState } from 'react';
import {
  AdminSearchIcon,
  AdminEyeIcon,
  AdminCloseIcon,
  AdminCheckIcon,
  AdminTrashIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_INQUIRIES, AdminInquiry } from '../../components/admin/adminData';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(INITIAL_INQUIRIES);
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);

  const handleUpdateStatus = (id: string, status: 'New' | 'Contacted' | 'Quoted' | 'Closed') => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      setInquiries(inquiries.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const filtered = inquiries.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.serviceType.toLowerCase().includes(search.toLowerCase()) ||
    i.vehicleMake.toLowerCase().includes(search.toLowerCase()) ||
    i.vehicleModel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inquiries & Quote Requests</h1>
          <p className="text-sm text-slate-500 mt-1">Review incoming service estimates, diagnostic requests, and customer vehicle specs.</p>
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
            placeholder="Search customer, vehicle, or service..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} inquiries</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Vehicle</th>
                <th className="px-5 py-3.5">Requested Service</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No customer service inquiries or quotes received yet.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-semibold text-slate-900">{inq.name}</p>
                      <p className="text-xs text-slate-400">{inq.email}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-800">
                      {inq.vehicleYear} {inq.vehicleMake} {inq.vehicleModel}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {inq.serviceType}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400">
                      {inq.date}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        inq.status === 'New'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : inq.status === 'Contacted'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : inq.status === 'Quoted'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <AdminEyeIcon className="w-3.5 h-3.5" />
                        <span>Review</span>
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
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">Inquiry & Quote Details</h2>
              <button onClick={() => setSelectedInquiry(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Status</span>
                  <p className="font-bold text-slate-900">{selectedInquiry.status}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['New', 'Contacted', 'Quoted', 'Closed'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                        selectedInquiry.status === st
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Client Details</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{selectedInquiry.name}</p>
                <p className="text-xs text-slate-600">{selectedInquiry.email} &bull; {selectedInquiry.phone}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Vehicle</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {selectedInquiry.vehicleYear} {selectedInquiry.vehicleMake} {selectedInquiry.vehicleModel}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Service Requested</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedInquiry.serviceType}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Customer Issue / Notes</p>
                <p className="text-xs text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
                  {selectedInquiry.notes}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                >
                  Delete Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

