"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AdminOrdersIcon,
  AdminPartsIcon,
  AdminInquiriesIcon,
  AdminAlertIcon,
  AdminEyeIcon
} from '../components/admin/AdminIcons';
import { INITIAL_ORDERS, INITIAL_INQUIRIES, INITIAL_PRODUCTS, INITIAL_CUSTOMERS, INITIAL_SERVICES } from '../components/admin/adminData';

export default function AdminDashboardPage() {
  const [orders] = useState(INITIAL_ORDERS);
  const [inquiries] = useState(INITIAL_INQUIRIES);
  const [products] = useState(INITIAL_PRODUCTS);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [services] = useState(INITIAL_SERVICES);

  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrdersCount = orders.filter(o => o.fulfillmentStatus === 'Pending').length;
  const pickupOrdersCount = orders.filter(o => o.fulfillmentStatus === 'Ready for Pickup').length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Workshop Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time store performance, inquiries, and inventory status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/spare-parts"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <span>+ Add New Part</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>View All Orders</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Sales</span>
            <span className="p-2 bg-slate-100 text-slate-700 rounded-lg">
              <AdminOrdersIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 font-normal">
              <span>0% vs last period</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Orders</span>
            <span className="p-2 bg-slate-100 text-slate-700 rounded-lg">
              <AdminOrdersIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">{orders.length}</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="font-medium text-amber-600">{pendingOrdersCount} Pending</span>
              <span>&bull;</span>
              <span className="font-medium text-blue-600">{pickupOrdersCount} Pickup</span>
            </div>
          </div>
        </div>

        {/* Service Inquiries */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Service Inquiries</span>
            <span className="p-2 bg-slate-100 text-slate-700 rounded-lg">
              <AdminInquiriesIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">{inquiries.length}</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 font-medium">
              <span>0 New action needed</span>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Inventory Alerts</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <AdminAlertIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">{lowStockCount} items</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 font-medium">
              <span>No low-stock alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 font-medium">Active Spare Parts Listings</p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-xl font-bold text-slate-900">{products.length} Products</h3>
            <Link href="/admin/spare-parts" className="text-xs font-medium text-slate-600 hover:text-slate-900">
              Manage &rarr;
            </Link>
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 font-medium">Active Customer Accounts</p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-xl font-bold text-slate-900">{customers.length} Customers</h3>
            <Link href="/admin/customers" className="text-xs font-medium text-slate-600 hover:text-slate-900">
              View Directory &rarr;
            </Link>
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 font-medium">Active Workshop Services</p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-xl font-bold text-slate-900">{services.length} Published</h3>
            <Link href="/admin/services" className="text-xs font-medium text-slate-600 hover:text-slate-900">
              Configure &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest transactions across delivery and workshop pickup.</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              All Orders
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Order #</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                      No recent orders recorded yet.
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-900 whitespace-nowrap">
                        {order.orderNumber}
                        <span className="block text-[11px] text-slate-400 font-normal">{order.date}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-slate-900 font-medium">{order.customerName}</div>
                        <div className="text-[11px] text-slate-400">{order.customerEmail}</div>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-slate-900 whitespace-nowrap">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {order.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/orders`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
                        >
                          <AdminEyeIcon className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Inquiries & Low Stock alerts */}
        <div className="space-y-6">
          {/* Recent Inquiries Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">Latest Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                View all
              </Link>
            </div>
            {inquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No new customer inquiries yet.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900">{inq.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-800">{inq.vehicleYear} {inq.vehicleMake} {inq.vehicleModel}</span> — {inq.serviceType}
                    </p>
                    <p className="text-slate-400 text-[11px] truncate">{inq.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">Low Stock Notice</h2>
              <Link href="/admin/inventory" className="text-xs font-medium text-slate-600 hover:text-slate-900">
                Adjust
              </Link>
            </div>
            {lowStockCount === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                All inventory levels are currently sufficient.
              </div>
            ) : (
              <div className="space-y-3">
                {products
                  .filter((p) => p.stock <= p.lowStockThreshold)
                  .map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2.5 bg-rose-50/50 border border-rose-100 rounded-lg">
                      <div className="truncate pr-2">
                        <p className="text-xs font-semibold text-slate-900 truncate">{prod.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">SKU: {prod.sku}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${
                          prod.stock === 0 ? 'bg-rose-200 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {prod.stock === 0 ? 'Out of Stock' : `${prod.stock} left`}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
