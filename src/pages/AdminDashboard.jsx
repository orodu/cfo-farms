import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, BarChart2, ArrowLeft, UserPlus, CheckCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCerealPrices, addCerealPrice, updateCerealPrice, deleteCerealPrice } from "@/lib/cerealPrices";
import { useAuth } from "@/lib/AuthContext";

const MARKETS = ["Benue", "Kano", "Lagos", "Port Harcourt"];
const CEREALS = ["Maize", "Rice", "Sorghum", "Millet", "Wheat"];
const TRENDS  = ["up", "down", "stable"];

const EMPTY_FORM = { cereal: "Maize", market: "Benue", price_per_100kg: "", trend: "stable", notes: "" };

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [prices, setPrices]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [editing, setEditing]       = useState(null);   // null=closed | {}=new | {id,...}=edit
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saving, setSaving]         = useState(false);
  const [filterMarket, setFilterMarket] = useState("All");
  const [inviteEmail, setInviteEmail]   = useState("");
  const [inviting, setInviting]         = useState(false);
  const [inviteSent, setInviteSent]     = useState(false);
  const [showInvite, setShowInvite]     = useState(false);

  /* ── Auth check ── */
  useEffect(() => {
    if (user?.role === "admin") {
      setAuthChecked(true);
      loadPrices();
    } else {
      setAuthChecked(true);
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  /* ── Data ── */
  const loadPrices = async () => {
    setLoading(true);
    const data = getCerealPrices();
    setPrices(data);
    setLoading(false);
  };

  const openNew  = () => { setForm(EMPTY_FORM); setEditing({}); };
  const openEdit = (item) => {
    setForm({ cereal: item.cereal, market: item.market, price_per_100kg: item.price_per_100kg, trend: item.trend, notes: item.notes || "" });
    setEditing(item);
  };
  const closeForm = () => setEditing(null);

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, price_per_100kg: parseFloat(form.price_per_100kg) };
    if (editing?.id) updateCerealPrice(editing.id, payload);
    else              addCerealPrice(payload);
    await loadPrices();
    setSaving(false);
    closeForm();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this price entry?")) return;
    deleteCerealPrice(id);
    await loadPrices();
  };

  /* ── Guards ── */
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F5F9F3] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F5F9F3] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    // Mock invite functionality
    setTimeout(() => {
      setInviting(false);
      setInviteSent(true);
      setInviteEmail("");
      setTimeout(() => { setInviteSent(false); setShowInvite(false); }, 3000);
    }, 1000);
  };

  const filtered = filterMarket === "All" ? prices : prices.filter(p => p.market === filterMarket);

  return (
    <div className="min-h-screen bg-[#F5F9F3]">
      {/* Header */}
      <div className="bg-green-800 text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">Cereal Prices Admin</h1>
              <p className="text-green-300 text-xs">CFO Farms Market Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-300 text-sm">Welcome, {user?.email}</span>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-green-300 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </Link>
            <button onClick={() => setShowInvite(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              <UserPlus className="w-4 h-4" /> Invite Admin
            </button>
            <button onClick={openNew}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              <Plus className="w-4 h-4" /> Add Entry
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {MARKETS.map(m => {
            const count = prices.filter(p => p.market === m).length;
            return (
              <div key={m} className="bg-white rounded-xl border border-green-100 px-4 py-3 shadow-sm">
                <p className="text-green-900 font-bold text-lg">{count}</p>
                <p className="text-gray-500 text-xs">{m}</p>
              </div>
            );
          })}
        </div>

        {/* Market filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", ...MARKETS].map(m => (
            <button key={m} onClick={() => setFilterMarket(m)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filterMarket === m
                  ? "bg-green-700 text-white"
                  : "bg-white border border-green-200 text-green-800 hover:bg-green-50"
              }`}>
              {m}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="mb-2 font-medium">No entries yet.</p>
            <p className="text-sm">Click "Add Entry" to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-green-50 text-green-700 text-xs uppercase tracking-widest border-b border-green-100">
                  <th className="text-left px-5 py-3 font-semibold">Cereal</th>
                  <th className="text-left px-5 py-3 font-semibold">Market</th>
                  <th className="text-right px-5 py-3 font-semibold">Price / 100kg</th>
                  <th className="text-center px-5 py-3 font-semibold">Trend</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Notes</th>
                  <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Updated</th>
                  <th className="text-center px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-green-50/40 transition-colors">
                    <td className="px-5 py-3 text-gray-800 font-medium text-sm">{p.cereal}</td>
                    <td className="px-5 py-3 text-gray-600 text-sm">{p.market}</td>
                    <td className="px-5 py-3 text-right text-green-900 font-bold text-sm">
                      ₦{p.price_per_100kg?.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        p.trend === "up"   ? "bg-red-100 text-red-600" :
                        p.trend === "down" ? "bg-green-100 text-green-700" :
                                             "bg-gray-100 text-gray-600"
                      }`}>{p.trend}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell max-w-[160px] truncate">
                      {p.notes || "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs hidden lg:table-cell whitespace-nowrap">
                      {new Date(p.updated_date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg hover:bg-green-100 text-green-700 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Admin Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-green-900">Invite Admin User</h2>
              <button onClick={() => setShowInvite(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            {inviteSent ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-green-800 font-semibold text-center">Invitation sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="e.g. admin@cfofarms.com"
                    className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">They will receive an email with login instructions and admin access.</p>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowInvite(false)}
                    className="flex-1 border border-green-200 text-green-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={inviting}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    {inviting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    {inviting ? "Sending..." : "Send Invite"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-green-900">
                {editing?.id ? "Edit Entry" : "Add New Entry"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Cereal</label>
                <select value={form.cereal} onChange={e => setForm({ ...form, cereal: e.target.value })}
                  className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {CEREALS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Market</label>
                <select value={form.market} onChange={e => setForm({ ...form, market: e.target.value })}
                  className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {MARKETS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Price per 100kg (₦)</label>
                <input type="number" value={form.price_per_100kg}
                  onChange={e => setForm({ ...form, price_per_100kg: e.target.value })}
                  placeholder="e.g. 45000"
                  className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Trend</label>
                <select value={form.trend} onChange={e => setForm({ ...form, trend: e.target.value })}
                  className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {TRENDS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Notes (optional)</label>
                <input type="text" value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Seasonal shortage"
                  className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={closeForm}
                className="flex-1 border border-green-200 text-green-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || !form.price_per_100kg}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                {saving
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Save className="w-4 h-4" />}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}