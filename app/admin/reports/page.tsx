"use client";

import React, { useState } from 'react';
import {
  AdminReportsIcon,
  AdminDownloadIcon,
  AdminOrdersIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_ORDERS, INITIAL_PRODUCTS, INITIAL_INQUIRIES } from '../../components/admin/adminData';

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState('Month');

  const totalSales = INITIAL_ORDERS.reduce((acc, o) => acc + o.total, 0);
  const avgOrderVal = INITIAL_ORDERS.length > 0 ? totalSales / INITIAL_ORDERS.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Workshop Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Key metrics for spare parts sales, revenue averages, and service quote conversions.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg shadow-xs text-slate-700 focus:outline-hidden"
          >
            <option value="Week">Last 7 Days</option>
            <option value="Month">Current Month</option>
            <option value="Quarter">Quarter to Date</option>
            <option value="Year">Year to Date</option>
          </select>

          <button
            onClick={() => alert('Exporting summary report...')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-xs"
          >
            <AdminDownloadIcon className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Row (Zero values when no data connected) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Gross Sales</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">${totalSales.toFixed(2)}</p>
          <span className="text-xs text-slate-400 font-normal block mt-1">0% from prior period</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Average Order Value</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">${avgOrderVal.toFixed(2)}</p>
          <span className="text-xs text-slate-400 block mt-1">Based on {INITIAL_ORDERS.length} completed orders</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Customer Quotes</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">{INITIAL_INQUIRIES.length} Inquiries</p>
          <span className="text-xs text-slate-400 font-medium block mt-1">0 pending quotes</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Catalog Turnover</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">{INITIAL_PRODUCTS.length} Items</p>
          <span className="text-xs text-slate-400 block mt-1">Awaiting catalog sales</span>
        </div>
      </div>

      {/* Sales Breakdown by Category & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Revenue Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Sales by Product Category</h2>
          <p className="text-xs text-slate-500 mb-4">Proportion of gross part turnover.</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Brakes & Suspension</span>
                <span>$0.00 (0%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: '0%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Ignition & Spark Plugs</span>
                <span>$0.00 (0%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '0%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Filters & Motor Oils</span>
                <span>$0.00 (0%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Fulfillment Pipeline Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Order Pipeline Overview</h2>
          <p className="text-xs text-slate-500 mb-4">Current order distribution across fulfillment stages.</p>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <span className="font-medium text-slate-700">Completed & Delivered</span>
              <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">0 Orders</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="font-medium text-slate-700">In Transit (Dispatched)</span>
              <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">0 Orders</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="font-medium text-slate-700">Awaiting Workshop Pickup</span>
              <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">0 Orders</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="font-medium text-slate-700">Pending Payment Confirmation</span>
              <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">0 Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
