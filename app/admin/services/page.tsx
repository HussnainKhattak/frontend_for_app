"use client";

import React, { useState } from 'react';
import {
  AdminPlusIcon,
  AdminEditIcon,
  AdminTrashIcon,
  AdminCloseIcon,
  AdminSearchIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_SERVICES, AdminService } from '../../components/admin/adminData';

export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminService[]>(INITIAL_SERVICES);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);

  const [formData, setFormData] = useState<Partial<AdminService>>({
    name: '',
    category: 'Diagnostics',
    price: 90,
    duration: '1 hour',
    status: 'Active',
    description: '',
    symptoms: ['Check Engine Light'],
    steps: ['OBD2 Diagnostic Scan'],
    warranty: '30 Days'
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'Diagnostics',
      price: 85,
      duration: '1 hour',
      status: 'Active',
      description: '',
      symptoms: ['Squeaking', 'Vibration'],
      steps: ['Inspection', 'Repair', 'Testing'],
      warranty: '6 Months / 10,000 km'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: AdminService) => {
    setEditingService(srv);
    setFormData({ ...srv });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this workshop service offering?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } as AdminService : s));
    } else {
      const newSrv: AdminService = {
        id: `srv-${Date.now()}`,
        name: formData.name || '',
        category: formData.category || 'General Maintenance',
        price: Number(formData.price) || 0,
        duration: formData.duration || '1 hour',
        status: formData.status || 'Active',
        description: formData.description || '',
        symptoms: formData.symptoms || [],
        steps: formData.steps || [],
        warranty: formData.warranty || 'Standard Warranty'
      };
      setServices([newSrv, ...services]);
    }
    setIsModalOpen(false);
  };

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Workshop Services</h1>
          <p className="text-sm text-slate-500 mt-1">Configure diagnostic packages, labor rates, repair steps, and service warranties.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
        >
          <AdminPlusIcon className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
        <div className="relative w-full max-w-sm">
          <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service name or category..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} services</span>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl">
            No workshop service packages configured yet.
          </div>
        ) : (
          filtered.map((srv) => (
            <div key={srv.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {srv.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    srv.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {srv.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mt-2">{srv.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Est. Duration</span>
                    <span className="font-semibold text-slate-800">{srv.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Labor & Base Fee</span>
                    <span className="font-bold text-slate-900">${srv.price.toFixed(2)}</span>
                  </div>
                </div>

                {srv.warranty && (
                  <div className="mt-3 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-medium text-slate-700">Warranty:</span> {srv.warranty}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
                  title="Edit"
                >
                  <AdminEditIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">
                {editingService ? 'Edit Workshop Service' : 'Add New Service Offering'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Complete Brake Pad & Rotor Replacement"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category || 'Diagnostics'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  >
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Braking">Braking</option>
                    <option value="Engine & Mechanical">Engine & Mechanical</option>
                    <option value="Electrical & Battery">Electrical & Battery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Status</label>
                  <select
                    value={formData.status || 'Active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  >
                    <option value="Active">Active / Bookable</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Labor Fee ($)</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 1.5 hours"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail scope of work, labor steps, and customer vehicle safety checks..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Warranty Term</label>
                <input
                  type="text"
                  value={formData.warranty || ''}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  placeholder="e.g. 1 Year / 20,000 km warranty"
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

