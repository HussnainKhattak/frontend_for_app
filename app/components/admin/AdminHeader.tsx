"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AdminMenuIcon,
  AdminSearchIcon,
  AdminBellIcon,
  AdminChevronDownIcon,
  AdminExternalLinkIcon
} from './AdminIcons';

interface AdminHeaderProps {
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
  collapsed: boolean;
}

export default function AdminHeader({
  onToggleMobile,
  onToggleCollapse,
  collapsed
}: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // In the future, notifications can be fetched from the FastAPI backend
  const notifications: { id: string; title: string; message: string; time: string }[] = [];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-slate-200">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobile}
          className="p-2 text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <AdminMenuIcon className="w-5 h-5" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 text-slate-600 rounded-lg hover:bg-slate-100"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label="Toggle sidebar collapse"
        >
          <AdminMenuIcon className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block w-72">
          <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, parts, customers..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400 focus:bg-white text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Link to Public Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <span>Live Site</span>
          <AdminExternalLinkIcon className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="relative p-2 text-slate-600 rounded-lg hover:bg-slate-100 focus:outline-hidden"
            aria-label="Notifications"
          >
            <AdminBellIcon className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 text-slate-800">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                <span className="font-semibold text-sm text-slate-900">Notifications</span>
                <span className="text-xs text-slate-500">{notifications.length} unread</span>
              </div>
              <div className="text-xs">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                        <p className="font-medium text-slate-900">{n.title}</p>
                        <p className="text-slate-500 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">Workshop Admin</span>
              <span className="text-[11px] text-slate-500">Super Admin</span>
            </div>
            <AdminChevronDownIcon className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-slate-700 text-sm">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900 text-xs">Signed in as</p>
                <p className="text-xs text-slate-500 truncate">admin@autopro.com</p>
              </div>
              <Link
                href="/admin/seo"
                onClick={() => setProfileOpen(false)}
                className="block px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700"
              >
                Store & SEO Settings
              </Link>
              <Link
                href="/"
                target="_blank"
                onClick={() => setProfileOpen(false)}
                className="block px-3.5 py-2 hover:bg-slate-50 text-xs text-slate-700"
              >
                Go to Public Site
              </Link>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logged out of Admin Portal.");
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs text-rose-600 font-medium"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
