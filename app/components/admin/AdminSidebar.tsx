"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AdminDashboardIcon,
  AdminPartsIcon,
  AdminCategoryIcon,
  AdminInventoryIcon,
  AdminOrdersIcon,
  AdminCustomersIcon,
  AdminServicesIcon,
  AdminInquiriesIcon,
  AdminHomepageIcon,
  AdminReviewsIcon,
  AdminCouponsIcon,
  AdminMessagesIcon,
  AdminReportsIcon,
  AdminSeoIcon,
  AdminCloseIcon
} from './AdminIcons';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: AdminDashboardIcon },
  { name: 'Spare Parts', href: '/admin/spare-parts', icon: AdminPartsIcon },
  { name: 'Categories & Brands', href: '/admin/categories-brands', icon: AdminCategoryIcon },
  { name: 'Inventory', href: '/admin/inventory', icon: AdminInventoryIcon },
  { name: 'Orders', href: '/admin/orders', icon: AdminOrdersIcon },
  { name: 'Customers', href: '/admin/customers', icon: AdminCustomersIcon },
  { name: 'Services', href: '/admin/services', icon: AdminServicesIcon },
  { name: 'Inquiries & Quotes', href: '/admin/inquiries', icon: AdminInquiriesIcon },
  { name: 'Homepage Management', href: '/admin/homepage', icon: AdminHomepageIcon },
  { name: 'Reviews & Gallery', href: '/admin/reviews-gallery', icon: AdminReviewsIcon },
  { name: 'Coupons & Discounts', href: '/admin/coupons', icon: AdminCouponsIcon },
  { name: 'Contact Messages', href: '/admin/messages', icon: AdminMessagesIcon },
  { name: 'Reports', href: '/admin/reports', icon: AdminReportsIcon },
  { name: 'SEO Settings', href: '/admin/seo', icon: AdminSeoIcon },
];

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
}

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapse
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out lg:static lg:z-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } ${collapsed ? 'lg:w-20' : 'w-72 lg:w-72'}`}
      >
        {/* Header / Brand identity */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 text-white font-bold shrink-0 shadow-xs">
              AP
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-slate-900 text-base leading-tight tracking-tight">AutoPro Admin</span>
                <span className="text-xs text-slate-500 font-medium">Workshop Portal</span>
              </div>
            )}
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-500 rounded-md hover:bg-slate-100 hover:text-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <AdminCloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                {!collapsed && (
                  <span className="flex-1 truncate">{item.name}</span>
                )}
                {!collapsed && item.badge && (
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom admin account section */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-sm shrink-0">
              AD
            </div>
            {!collapsed && (
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-slate-900 truncate">Workshop Manager</p>
                <p className="text-xs text-slate-500 truncate">admin@autopro.com</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 px-2">
              <Link href="/" target="_blank" className="hover:text-slate-900 font-medium">
                View Live Website &rarr;
              </Link>
              <span>v1.0.0</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
