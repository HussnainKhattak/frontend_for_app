"use client";

import React, { useState } from 'react';
import {
  AdminEditIcon,
  AdminCheckIcon,
  AdminPlusIcon,
  AdminCloseIcon
} from '../../components/admin/AdminIcons';

interface BannerItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  active: boolean;
}

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  closingHours: string;
  workingDays: string;
}

interface ContactErrors {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  closingHours?: string;
  workingDays?: string;
}

export default function AdminHomepagePage() {
  const [banners, setBanners] = useState<BannerItem[]>([
    {
      id: "b1",
      badge: "Dealership Quality, Fair Prices",
      title: "Automotive Precision & Genuine Spare Parts",
      subtitle: "Certified mechanics, computerized vehicle diagnostics, and high-quality replacement parts backed by our workshop warranty.",
      primaryBtnText: "Book Service",
      primaryBtnLink: "/book-service",
      active: true
    }
  ]);

  const [announcementText, setAnnouncementText] = useState("Seasonal Offer: 15% off full synthetic oil changes this month with code WINTER15");
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  // ── Contact Information ──────────────────────────────────────────────────
  const emptyContact: ContactInfo = {
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    openingHours: '',
    closingHours: '',
    workingDays: '',
  };

  const [contact, setContact] = useState<ContactInfo>(emptyContact);
  const [contactDraft, setContactDraft] = useState<ContactInfo>(emptyContact);
  const [contactEditing, setContactEditing] = useState(false);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [contactSavedNotice, setContactSavedNotice] = useState(false);

  const validateContact = (data: ContactInfo): ContactErrors => {
    const errors: ContactErrors = {};
    const phoneRe = /^[+\d\s\-()]{7,20}$/;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.phone.trim()) errors.phone = 'Phone number is required.';
    else if (!phoneRe.test(data.phone.trim())) errors.phone = 'Enter a valid phone number.';
    if (data.whatsapp.trim() && !phoneRe.test(data.whatsapp.trim()))
      errors.whatsapp = 'Enter a valid WhatsApp number.';
    if (!data.email.trim()) errors.email = 'Email address is required.';
    else if (!emailRe.test(data.email.trim())) errors.email = 'Enter a valid email address.';
    if (!data.address.trim()) errors.address = 'Workshop address is required.';
    if (!data.openingHours.trim()) errors.openingHours = 'Opening hours are required.';
    if (!data.closingHours.trim()) errors.closingHours = 'Closing hours are required.';
    if (!data.workingDays.trim()) errors.workingDays = 'Working days are required.';
    return errors;
  };

  const handleContactEdit = () => {
    setContactDraft({ ...contact });
    setContactErrors({});
    setContactEditing(true);
  };

  const handleContactCancel = () => {
    setContactDraft({ ...contact });
    setContactErrors({});
    setContactEditing(false);
  };

  const handleContactSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateContact(contactDraft);
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    // Persist to state (backend integration via FastAPI will replace this)
    setContact({ ...contactDraft });
    setContactErrors({});
    setContactEditing(false);
    setContactSavedNotice(true);
    setTimeout(() => setContactSavedNotice(false), 3000);
  };

  const setDraftField = (field: keyof ContactInfo, value: string) => {
    setContactDraft(prev => ({ ...prev, [field]: value }));
    if (contactErrors[field]) {
      setContactErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Homepage Content Management</h1>
          <p className="text-sm text-slate-500 mt-1">Configure the hero banner, top announcement ticker, and featured catalog spotlights.</p>
        </div>
        {savedNotice && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <AdminCheckIcon className="w-4 h-4" /> Changes saved to homepage preview
          </span>
        )}
      </div>

      <form onSubmit={handleSaveHomepage} className="space-y-6">
        {/* Top Announcement Bar Configuration */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Top Notice / Promotional Ticker</h2>
              <p className="text-xs text-slate-500">Appears at the very top of the public website for special promotions.</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="rounded border-slate-300"
              />
              Enable Top Ticker
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Copy</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. Workshop open 7 days a week — Free battery inspection with every full service"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>
        </div>

        {/* Hero Banner Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-base font-bold text-slate-900">Hero Section Content</h2>
            <p className="text-xs text-slate-500">Primary headline, value proposition subtitle, and call-to-action buttons.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Top Pill / Badge Text</label>
              <input
                type="text"
                value={banners[0]?.badge || ''}
                onChange={(e) => {
                  const updated = [...banners];
                  updated[0].badge = e.target.value;
                  setBanners(updated);
                }}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Main Heading</label>
              <input
                type="text"
                value={banners[0]?.title || ''}
                onChange={(e) => {
                  const updated = [...banners];
                  updated[0].title = e.target.value;
                  setBanners(updated);
                }}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sub-heading Description</label>
              <textarea
                rows={3}
                value={banners[0]?.subtitle || ''}
                onChange={(e) => {
                  const updated = [...banners];
                  updated[0].subtitle = e.target.value;
                  setBanners(updated);
                }}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={banners[0]?.primaryBtnText || ''}
                  onChange={(e) => {
                    const updated = [...banners];
                    updated[0].primaryBtnText = e.target.value;
                    setBanners(updated);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA Link URL</label>
                <input
                  type="text"
                  value={banners[0]?.primaryBtnLink || ''}
                  onChange={(e) => {
                    const updated = [...banners];
                    updated[0].primaryBtnLink = e.target.value;
                    setBanners(updated);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Sections Toggles */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-base font-bold text-slate-900">Featured Sections Visibility</h2>
            <p className="text-xs text-slate-500">Toggle display of modular home page blocks.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <div>
                <p className="font-semibold text-slate-900">Popular Workshop Services</p>
                <p className="text-xs text-slate-500">Show top diagnostic & maintenance cards</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <div>
                <p className="font-semibold text-slate-900">Featured Genuine Spare Parts</p>
                <p className="text-xs text-slate-500">Display verified products from catalog</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <div>
                <p className="font-semibold text-slate-900">Supported Car Brands Strip</p>
                <p className="text-xs text-slate-500">Display OEM manufacturer badges</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <div>
                <p className="font-semibold text-slate-900">Client Reviews Carousel</p>
                <p className="text-xs text-slate-500">Show approved testimonials</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
          >
            Save Homepage Settings
          </button>
        </div>
      </form>

      {/* ── Contact Information ──────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Contact Information</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Workshop contact details displayed on the public Contact page, footer, and contact sections.{' '}
              <span className="text-amber-600 font-medium">
                (Persistence will be handled via FastAPI when backend integration is ready.)
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {contactSavedNotice && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <AdminCheckIcon className="w-4 h-4" /> Saved
              </span>
            )}
            {!contactEditing && (
              <button
                type="button"
                onClick={handleContactEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <AdminEditIcon className="w-3.5 h-3.5" /> Edit
              </button>
            )}
          </div>
        </div>

        {!contactEditing ? (
          /* ── Read-only view ── */
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {[
              { label: 'Phone Number',    value: contact.phone },
              { label: 'WhatsApp Number', value: contact.whatsapp },
              { label: 'Email Address',   value: contact.email },
              { label: 'Full Address',    value: contact.address },
              { label: 'Opening Hours',   value: contact.openingHours },
              { label: 'Closing Hours',   value: contact.closingHours },
              { label: 'Working Days',    value: contact.workingDays },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</dt>
                <dd className="mt-0.5 text-slate-800">
                  {value || <span className="italic text-slate-400">Not set</span>}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          /* ── Edit form ── */
          <form onSubmit={handleContactSave} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contactDraft.phone}
                  onChange={e => setDraftField('phone', e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden ${contactErrors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
                {contactErrors.phone && <p className="mt-1 text-xs text-red-600">{contactErrors.phone}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={contactDraft.whatsapp}
                  onChange={e => setDraftField('whatsapp', e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden ${contactErrors.whatsapp ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
                {contactErrors.whatsapp && <p className="mt-1 text-xs text-red-600">{contactErrors.whatsapp}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={contactDraft.email}
                  onChange={e => setDraftField('email', e.target.value)}
                  placeholder="e.g. info@workshop.com"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden ${contactErrors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
                {contactErrors.email && <p className="mt-1 text-xs text-red-600">{contactErrors.email}</p>}
              </div>

              {/* Opening Hours */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Opening Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactDraft.openingHours}
                  onChange={e => setDraftField('openingHours', e.target.value)}
                  placeholder="e.g. 8:00 AM"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden ${contactErrors.openingHours ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
                {contactErrors.openingHours && <p className="mt-1 text-xs text-red-600">{contactErrors.openingHours}</p>}
              </div>

              {/* Closing Hours */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Closing Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactDraft.closingHours}
                  onChange={e => setDraftField('closingHours', e.target.value)}
                  placeholder="e.g. 6:00 PM"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden ${contactErrors.closingHours ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
                {contactErrors.closingHours && <p className="mt-1 text-xs text-red-600">{contactErrors.closingHours}</p>}
              </div>

              {/* Working Days */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Working Days <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactDraft.workingDays}
                  onChange={e => setDraftField('workingDays', e.target.value)}
                  placeholder="e.g. Monday – Saturday"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden ${contactErrors.workingDays ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
                {contactErrors.workingDays && <p className="mt-1 text-xs text-red-600">{contactErrors.workingDays}</p>}
              </div>
            </div>

            {/* Full Address — full width */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Workshop Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={contactDraft.address}
                onChange={e => setDraftField('address', e.target.value)}
                placeholder="e.g. Shop 12, Auto Market, Main GT Road, Lahore"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-hidden resize-none ${contactErrors.address ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              />
              {contactErrors.address && <p className="mt-1 text-xs text-red-600">{contactErrors.address}</p>}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleContactCancel}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <AdminCloseIcon className="w-4 h-4" /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                <AdminCheckIcon className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

