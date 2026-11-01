"use client";

import React, { useState } from 'react';
import {
  AdminSearchIcon,
  AdminEyeIcon,
  AdminCloseIcon,
  AdminDownloadIcon,
  AdminCheckIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_ORDERS, AdminOrder, OrderStatus } from '../../components/admin/adminData';

const ALL_STATUSES: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Ready for Pickup',
  'Dispatched',
  'Delivered',
  'Completed',
  'Cancelled',
  'Refund / Return Requested'
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, fulfillmentStatus: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, fulfillmentStatus: newStatus });
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.fulfillmentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders & Fulfillment</h1>
          <p className="text-sm text-slate-500 mt-1">Manage automotive part purchases, workshop pickup dispatch, and returns.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <AdminSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order #, customer, email..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-700"
          >
            <option value="All">All 9 Statuses</option>
            {ALL_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-xs text-slate-500 font-medium ml-auto md:ml-0">
            {filteredOrders.length} orders
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Order Details</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Fulfillment Type</th>
                <th className="px-5 py-3.5">Total & Payment</th>
                <th className="px-5 py-3.5">Fulfillment Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-900 block">{order.orderNumber}</span>
                      <span className="text-xs text-slate-400">{order.date} &bull; {order.items.length} item(s)</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900">{order.customerName}</div>
                      <div className="text-xs text-slate-400">{order.customerPhone}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                        order.deliveryMethod === 'Workshop Pickup'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {order.deliveryMethod}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">${order.total.toFixed(2)}</div>
                      <span className={`text-[11px] font-medium ${
                        order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={order.fulfillmentStatus}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
                      >
                        {ALL_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <AdminEyeIcon className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-base font-bold text-slate-900">Order #{selectedOrder.orderNumber}</h2>
                <p className="text-xs text-slate-500">Placed on {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-sm">
              {/* Status Bar */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="text-xs font-medium text-slate-500 uppercase">Current Status</span>
                  <p className="text-base font-bold text-slate-900">{selectedOrder.fulfillmentStatus}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Change:</span>
                  <select
                    value={selectedOrder.fulfillmentStatus}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {ALL_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer and Delivery info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-xl">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Details</h3>
                  <p className="font-semibold text-slate-900">{selectedOrder.customerName}</p>
                  <p className="text-xs text-slate-600 mt-1">{selectedOrder.customerEmail}</p>
                  <p className="text-xs text-slate-600">{selectedOrder.customerPhone}</p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery & Address</h3>
                  <p className="font-semibold text-slate-900">{selectedOrder.deliveryMethod}</p>
                  <p className="text-xs text-slate-600 mt-1">{selectedOrder.shippingAddress}</p>
                  <p className="text-xs font-medium text-emerald-600 mt-1">Payment: {selectedOrder.paymentStatus}</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Items</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-2.5">Item</th>
                        <th className="px-4 py-2.5">Part #</th>
                        <th className="px-4 py-2.5">Qty</th>
                        <th className="px-4 py-2.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedOrder.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2.5 font-medium text-slate-900">{it.name}</td>
                          <td className="px-4 py-2.5 font-mono text-slate-500">{it.partNumber}</td>
                          <td className="px-4 py-2.5">{it.quantity}</td>
                          <td className="px-4 py-2.5 text-right font-semibold text-slate-900">
                            ${(it.price * it.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-slate-900">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right">Order Grand Total:</td>
                        <td className="px-4 py-3 text-right">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert(`Print Invoice for #${selectedOrder.orderNumber}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                <AdminDownloadIcon className="w-3.5 h-3.5" />
                <span>Print Packing Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

