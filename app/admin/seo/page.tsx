"use client";

import React, { useState } from 'react';
import {
  AdminCheckIcon,
  AdminSeoIcon
} from '../../components/admin/AdminIcons';

export default function AdminSeoPage() {
  const [siteTitle, setSiteTitle] = useState("AutoPro | Professional Automotive Diagnostics, Maintenance & Genuine Spare Parts");
  const [metaDescription, setMetaDescription] = useState("Expert vehicle servicing, mechanical repairs, OBD diagnostics, and genuine replacement spare parts. Book certified auto appointments online.");
  const [canonicalUrl, setCanonicalUrl] = useState("https://autopro-workshop.com");
  const [ogImageUrl, setOgImageUrl] = useState("https://autopro-workshop.com/og-image.jpg");
  const [enableIndexing, setEnableIndexing] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">SEO & Metadata Configuration</h1>
          <p className="text-sm text-slate-500 mt-1">Configure search engine titles, OpenGraph social cards, and crawler indexing rules.</p>
        </div>
        {saved && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <AdminCheckIcon className="w-4 h-4" /> SEO settings updated
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Search Engine Meta */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Default Search Engine Metadata</h2>
            <p className="text-xs text-slate-500">How your auto repair workshop appears on Google and Bing search results.</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">Meta Title Tag</label>
              <span className={`text-[11px] ${siteTitle.length > 60 ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                {siteTitle.length}/60 recommended
              </span>
            </div>
            <input
              type="text"
              required
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">Meta Description Tag</label>
              <span className={`text-[11px] ${metaDescription.length > 160 ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                {metaDescription.length}/160 recommended
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Canonical Base URL</label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Social OpenGraph Image (OG:Image)</label>
              <input
                type="url"
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden font-mono"
              />
            </div>
          </div>
        </div>

        {/* Search Engine Preview Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Google SERP Preview</h2>
          <p className="text-xs text-slate-500 mb-4">Simulated representation on desktop Google search results.</p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-2xl font-sans">
            <span className="text-xs text-slate-500 font-mono block mb-0.5">{canonicalUrl}</span>
            <h3 className="text-base text-blue-700 font-medium hover:underline cursor-pointer leading-snug">
              {siteTitle}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {metaDescription}
            </p>
          </div>
        </div>

        {/* Indexing Robot Directives */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Search Engine Crawlers</h2>
          <p className="text-xs text-slate-500 mb-4">Control robots.txt and indexing permissions.</p>

          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={enableIndexing}
              onChange={(e) => setEnableIndexing(e.target.checked)}
              className="rounded border-slate-300"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">Allow search engine indexing (index, follow)</p>
              <p className="text-xs text-slate-500">Uncheck to set &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;</p>
            </div>
          </label>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}

