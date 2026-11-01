"use client";

import React, { useState } from 'react';
import {
  AdminSearchIcon,
  AdminEyeIcon,
  AdminTrashIcon,
  AdminCloseIcon,
  AdminMessagesIcon
} from '../../components/admin/AdminIcons';
import { INITIAL_MESSAGES, AdminMessage } from '../../components/admin/adminData';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>(INITIAL_MESSAGES);
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);

  const handleOpenMessage = (msg: AdminMessage) => {
    setSelectedMessage(msg);
    setMessages(messages.map(m => m.id === msg.id ? { ...m, read: true } : m));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this contact message?')) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const filtered = messages.filter(m =>
    m.sender.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contact Inquiries & Inbox</h1>
          <p className="text-sm text-slate-500 mt-1">General inquiries submitted through the workshop contact form.</p>
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
            placeholder="Search sender, subject, keywords..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} messages</span>
      </div>

      {/* Messages List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No contact messages received yet.
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors ${
                !msg.read ? 'bg-slate-50/50 font-medium' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                  !msg.read ? 'bg-blue-600' : 'bg-transparent'
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{msg.sender}</h3>
                    <span className="text-xs text-slate-400">&bull; {msg.email}</span>
                  </div>
                  <p className="text-sm text-slate-800 font-semibold mt-0.5">{msg.subject}</p>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{msg.message}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400">{msg.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">{selectedMessage.subject}</h2>
              <button onClick={() => setSelectedMessage(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <AdminCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <p className="font-bold text-slate-900">{selectedMessage.sender}</p>
                  <p className="text-xs text-slate-500">{selectedMessage.email} &bull; {selectedMessage.phone}</p>
                </div>
                <span className="text-xs text-slate-400">{selectedMessage.date}</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                >
                  Delete Message
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Reply via Email &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

