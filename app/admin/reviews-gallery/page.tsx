"use client";

import React, { useState } from 'react';
import {
  AdminPlusIcon,
  AdminTrashIcon,
  AdminCheckIcon,
  AdminCloseIcon
} from '../../components/admin/AdminIcons';
import {
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  AdminReview,
  AdminGalleryItem
} from '../../components/admin/adminData';

export default function AdminReviewsGalleryPage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'gallery'>('reviews');
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [gallery, setGallery] = useState<AdminGalleryItem[]>(INITIAL_GALLERY);

  // Gallery Modal
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Workshop Bay', imageUrl: '/images/workshop-1.jpg' });

  const handleToggleReviewStatus = (id: string, current: 'Approved' | 'Pending' | 'Hidden') => {
    const next = current === 'Approved' ? 'Hidden' : 'Approved';
    setReviews(reviews.map(r => r.id === id ? { ...r, status: next } : r));
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Delete this customer review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title) return;

    setGallery([
      ...gallery,
      {
        id: `gal-${Date.now()}`,
        title: galleryForm.title,
        category: galleryForm.category,
        imageUrl: galleryForm.imageUrl,
        dateAdded: new Date().toISOString().split('T')[0]
      }
    ]);
    setIsGalleryModalOpen(false);
    setGalleryForm({ title: '', category: 'Workshop Bay', imageUrl: '/images/workshop-1.jpg' });
  };

  const handleDeleteGallery = (id: string) => {
    if (confirm('Remove this photo from workshop gallery?')) {
      setGallery(gallery.filter(g => g.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reviews & Workshop Gallery</h1>
          <p className="text-sm text-slate-500 mt-1">Moderate customer testimonials and manage facility showcase images.</p>
        </div>
        {activeTab === 'gallery' && (
          <button
            onClick={() => setIsGalleryModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <AdminPlusIcon className="w-4 h-4" />
            <span>Add Workshop Photo</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'reviews'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Customer Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'gallery'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Workshop Facility Gallery ({gallery.length})
        </button>
      </div>

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-400">
              No customer reviews submitted yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">{rev.customerName}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{rev.serviceOrProduct} &bull; {rev.date}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                        {'★'.repeat(rev.rating)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-3 italic">&ldquo;{rev.comment}&rdquo;</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      rev.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {rev.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleReviewStatus(rev.id, rev.status)}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
                      >
                        {rev.status === 'Approved' ? 'Hide from site' : 'Approve & Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <AdminTrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
              <div className="h-44 bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs border-b border-slate-200">
                [ Workshop Photo Preview: {item.title} ]
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Uploaded: {item.dateAdded}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleDeleteGallery(item.id)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Gallery Photo Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">Add Workshop Photo</h2>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveGallery} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Clean Hydraulic Lift Station 4"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                >
                  <option value="Workshop Bay">Workshop Bay</option>
                  <option value="Equipment">Diagnostic Equipment</option>
                  <option value="Team & Technicians">Team & Technicians</option>
                  <option value="Customer Lounge">Customer Lounge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  placeholder="/images/workshop-photo.jpg"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

