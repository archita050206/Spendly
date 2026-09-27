"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  FileDown,
  SlidersHorizontal,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Receipt,
  X,
  Utensils,
  Car,
  ShoppingBag,
  Dumbbell,
  Building2,
  Tv,
  Wifi,
  Zap,
  Smartphone,
  Pencil,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface TransactionRow {
  id: string;
  ref: string;
  date: string;
  time: string;
  name: string;
  subDetails: string;
  tag?: string;
  tagColor?: string;
  category: string;
  instrument: string;
  instrumentSub: string;
  instrumentType: "upi" | "card" | "netbanking";
  classType: "Expense" | "INCOME";
  amount: number;
  tax: string;
  note: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const initialTransactions: TransactionRow[] = [
  {
    id: "1",
    ref: "#TX-99824",
    date: "24 Sep 2026",
    time: "01:15 PM",
    name: "Swiggy Gourmet",
    subDetails: "Order #SW-99824",
    tag: "Cyber Hub",
    tagColor: "bg-gray-100 text-gray-600",
    category: "Food & Dining",
    instrument: "UPI • Google Pay",
    instrumentSub: "upi-ref: 92834019",
    instrumentType: "upi",
    classType: "Expense",
    amount: -680.0,
    tax: "₹34.00 (5% IGST)",
    note: "Team lunch at DLF Cyber Hub. Expense claimable under corporate food allowance.",
    icon: Utensils,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "2",
    ref: "#TX-99823",
    date: "24 Sep 2026",
    time: "09:42 AM",
    name: "Uber Premier",
    subDetails: "Cyber Hub to Sector 54",
    tag: "Business",
    tagColor: "bg-pink-50 text-pink-700",
    category: "Transport",
    instrument: "UPI • PhonePe",
    instrumentSub: "ride-id: ub-776",
    instrumentType: "upi",
    classType: "Expense",
    amount: -320.0,
    tax: "₹16.00 (5% GST)",
    note: "Morning commute client meeting transit.",
    icon: Car,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "3",
    ref: "#TX-99822",
    date: "23 Sep 2026",
    time: "07:20 PM",
    name: "Nature's Basket Groceries",
    subDetails: "Organic Staples & Fresh Produce",
    category: "Food & Dining",
    instrument: "HDFC Regalia **4012",
    instrumentSub: "POS Contactless",
    instrumentType: "card",
    classType: "Expense",
    amount: -2140.0,
    tax: "₹107.00 (5% GST)",
    note: "Fortnight pantry supplies and fresh produce.",
    icon: ShoppingBag,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    id: "4",
    ref: "#TX-99821",
    date: "23 Sep 2026",
    time: "06:00 AM",
    name: "Cult.fit Membership",
    subDetails: "Cult Elite Pass Recurring",
    category: "Health & Fitness",
    instrument: "UPI Autopay",
    instrumentSub: "Mandate #99102",
    instrumentType: "upi",
    classType: "Expense",
    amount: -1200.0,
    tax: "₹216.00 (18% GST)",
    note: "Monthly fitness membership recurring autopay mandate.",
    icon: Dumbbell,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: "5",
    ref: "#TX-99820",
    date: "22 Sep 2026",
    time: "10:00 AM",
    name: "TechCorp India Pvt Ltd",
    subDetails: "Monthly Payroll Disbursement",
    tag: "Salary",
    tagColor: "bg-emerald-100 text-emerald-800",
    category: "Primary Income",
    instrument: "Net Banking • HDFC",
    instrumentSub: "NEFT / RTGS Ref: 8812",
    instrumentType: "netbanking",
    classType: "INCOME",
    amount: 50000.0,
    tax: "TDS Deducted at Source",
    note: "September monthly compensation credited to HDFC salary account.",
    icon: Building2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    id: "6",
    ref: "#TX-99819",
    date: "21 Sep 2026",
    time: "11:18 PM",
    name: "Netflix India UHD Plan",
    subDetails: "Monthly OTT Auto-charge",
    category: "Subscriptions",
    instrument: "ICICI Sapphiro **8891",
    instrumentSub: "Standing Mandate",
    instrumentType: "card",
    classType: "Expense",
    amount: -649.0,
    tax: "₹99.00 (18% GST)",
    note: "Monthly 4K streaming plan subscription.",
    icon: Tv,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    id: "7",
    ref: "#TX-99818",
    date: "20 Sep 2026",
    time: "04:45 PM",
    name: "Zara Phoenix Mall",
    subDetails: "Fall Collection Attire",
    category: "Shopping",
    instrument: "HDFC Regalia **4012",
    instrumentSub: "In-store POS",
    instrumentType: "card",
    classType: "Expense",
    amount: -4300.0,
    tax: "₹516.00 (12% GST)",
    note: "Wardrobe essentials and blazer for upcoming keynote.",
    icon: ShoppingBag,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "8",
    ref: "#TX-99817",
    date: "18 Sep 2026",
    time: "02:10 PM",
    name: "Airtel Xstream Fiber",
    subDetails: "300 Mbps Plan Utility Bill",
    category: "Bills & Utilities",
    instrument: "UPI • Bharat BillPay",
    instrumentSub: "BBPS Trans-762",
    instrumentType: "upi",
    classType: "Expense",
    amount: -1179.0,
    tax: "₹180.00 (18% GST)",
    note: "High-speed broadband monthly subscription.",
    icon: Wifi,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: "9",
    ref: "#TX-99816",
    date: "16 Sep 2026",
    time: "11:04 AM",
    name: "Tata Power Electricity",
    subDetails: "Home Power Cycle #0826",
    category: "Bills & Utilities",
    instrument: "Net Banking • HDFC",
    instrumentSub: "Scheduled Payment",
    instrumentType: "netbanking",
    classType: "Expense",
    amount: -3420.0,
    tax: "₹0.00 (Exempt/Duty included)",
    note: "Residential electricity bill payment for August cycle.",
    icon: Zap,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: "10",
    ref: "#TX-99815",
    date: "14 Sep 2026",
    time: "03:30 PM",
    name: "Apple BKC Mumbai",
    subDetails: "AirPods Pro Protective Case",
    category: "Shopping",
    instrument: "ICICI Sapphiro **8891",
    instrumentSub: "Apple Pay / NFC",
    instrumentType: "card",
    classType: "Expense",
    amount: -1500.0,
    tax: "₹228.00 (18% GST)",
    note: "Protective silicone case and lanyards.",
    icon: Smartphone,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

export default function TransactionsPage() {
  const [transactions] = useState<TransactionRow[]>(initialTransactions);
  const [selectedTx, setSelectedTx] = useState<TransactionRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("All Payment Methods");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Cycle: Sep 2026",
    "Status: Settled & Cleared",
    "Scope: India Ledger (INR)",
  ]);
  const [showSlipToast, setShowSlipToast] = useState(false);

  // Filter transactions
  const filteredList = transactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.subDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.instrument.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" || tx.category === selectedCategory;

    const matchesType =
      selectedType === "All Types" ||
      (selectedType === "Expense" && tx.classType === "Expense") ||
      (selectedType === "Income" && tx.classType === "INCOME");

    const matchesMethod =
      selectedPaymentMethod === "All Payment Methods" ||
      tx.instrument.toLowerCase().includes(selectedPaymentMethod.toLowerCase());

    return matchesSearch && matchesCategory && matchesType && matchesMethod;
  });

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const handleDownloadSlip = () => {
    setShowSlipToast(true);
    setTimeout(() => setShowSlipToast(false), 3000);
    window.print();
  };

  return (
    <div className="w-full">
      {/* Download Slip Notification Toast */}
      {showSlipToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#111827] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">Generating official tax & settlement slip...</span>
        </div>
      )}

      <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
        {/* TOP BAR / BREADCRUMB & CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Spendly
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-950 font-semibold">Transactions</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Month Nav Pill */}
            <div className="flex items-center bg-white border border-gray-200/90 rounded-full px-3 py-1.5 shadow-2xs text-xs font-semibold text-gray-800">
              <button
                className="p-0.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="mx-2 select-none">September 2026</span>
              <button
                className="p-0.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Next Month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Global Search Input */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-gray-200/90 rounded-full pl-8 pr-10 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 focus:border-[#581C3F] w-36 sm:w-44 shadow-2xs transition-all"
              />
              <span className="absolute right-2.5 text-[10px] text-gray-400 font-mono bg-gray-50 border border-gray-200/80 px-1 py-0.5 rounded">
                ⌘K
              </span>
            </div>

            {/* Profile Avatar */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-2xs ring-1 ring-purple-100 hidden sm:block">
              <Image src="/archita.jpg" alt="Archita Sharma Profile" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* HEADER: TITLE & ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8F285D] mb-1">
              <span>LEDGER & FISCAL STREAM</span>
              <span>•</span>
              <span>LIVE SYNC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">Transactions</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Everything you&apos;ve spent, allocated, and earned across verified rails.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <FileDown className="w-4 h-4 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <span>Filters</span>
              <span className="bg-[#F5EEF8] text-[#862E64] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                3
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#581C3F] hover:bg-[#481633] text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* 4 SUMMARY STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Volume Count */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">VOLUME COUNT</span>
              <div className="w-8 h-8 rounded-xl bg-[#F0F4F8] text-[#556987] flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">48</span>
                <span className="text-xs font-medium text-gray-400">recorded</span>
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#581C3F] rounded-full w-2/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Total Inflow */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">TOTAL INFLOW</span>
              <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] text-[#10B981] flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#10B981] tracking-tight">₹50,000</span>
                <span className="text-[11px] font-bold text-[#059669] bg-[#E8F7EE] px-2 py-0.5 rounded-full">
                  100% target
                </span>
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Total Outflow */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">TOTAL OUTFLOW</span>
              <div className="w-8 h-8 rounded-xl bg-[#FEECEE] text-[#F43F5E] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">-₹28,450</span>
                <span className="text-[11px] font-bold text-[#E11D48] bg-[#FEECEE] px-2 py-0.5 rounded-full">
                  56.9% ratio
                </span>
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E11D48] rounded-full w-[56.9%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Net Cash Flow */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">NET CASH FLOW</span>
              <div className="w-8 h-8 rounded-xl bg-[#FDF2F8] text-[#BE185D] flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">+₹21,550</span>
                <span className="text-[11px] font-bold text-[#9D174D] bg-[#FDF2F8] px-2 py-0.5 rounded-full">
                  Surplus
                </span>
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#9D174D] rounded-full w-[43.1%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER ROW */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Filter Search with shortcut and Month navigation */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex items-center w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#F8F9FA] border border-gray-200/80 rounded-xl pl-8 pr-9 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 focus:border-[#581C3F] w-full"
                />
                <span className="absolute right-2.5 text-[10px] text-gray-400 font-mono bg-white border border-gray-200/80 px-1 py-0.5 rounded">
                  ⌘F
                </span>
              </div>

              {/* Cycle Pill */}
              <div className="flex items-center bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-800 shrink-0">
                <button className="p-0.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="mx-2 select-none">September 2026</span>
                <button className="p-0.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Primary Income">Primary Income</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 cursor-pointer"
              >
                <option value="All Types">All Types</option>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>

              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 cursor-pointer"
              >
                <option value="All Payment Methods">Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="HDFC">HDFC Card / Net Banking</option>
                <option value="ICICI">ICICI Card</option>
              </select>

              <button className="bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                Date (Newest first) ▾
              </button>
            </div>
          </div>

          {/* Active Filters Row */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 flex-wrap text-xs">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mr-1">
                ACTIVE FILTERS:
              </span>
              {activeFilters.map((filter) => {
                const isScope = filter.includes("Scope");
                return (
                  <span
                    key={filter}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      isScope
                        ? "bg-[#FDF2F8] text-[#9D174D] border border-pink-200/60"
                        : "bg-white text-gray-700 border border-gray-200 shadow-2xs"
                    }`}
                  >
                    <span>{filter}</span>
                    <button
                      onClick={() => removeFilter(filter)}
                      className="hover:text-gray-950 p-0.5"
                      aria-label="Remove filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs text-gray-500 hover:text-gray-900 font-semibold underline underline-offset-2 ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* TRANSACTIONS TABLE (Without Checkbox Column as requested) */}
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold tracking-wider text-gray-400 uppercase select-none">
                  <th className="py-3.5 px-3 font-semibold">DATE & TIME</th>
                  <th className="py-3.5 px-3 font-semibold">DESCRIPTION & ENTITY</th>
                  <th className="py-3.5 px-3 font-semibold">CATEGORY</th>
                  <th className="py-3.5 px-3 font-semibold">PAYMENT INSTRUMENT</th>
                  <th className="py-3.5 px-3 font-semibold">CLASS</th>
                  <th className="py-3.5 px-3 font-semibold text-right">AMOUNT (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {filteredList.map((tx) => {
                  const Icon = tx.icon;
                  const isIncome = tx.classType === "INCOME";

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-[#F9FAFB] cursor-pointer transition-colors group"
                    >
                      {/* DATE & TIME */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <p className="font-bold text-gray-900 group-hover:text-[#581C3F] transition-colors">
                          {tx.date}
                        </p>
                        <p className="text-[11px] text-gray-400">{tx.time}</p>
                      </td>

                      {/* DESCRIPTION & ENTITY */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl ${tx.iconBg} ${tx.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-[#581C3F] transition-colors leading-tight">
                              {tx.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-gray-400">
                              <span>{tx.subDetails}</span>
                              {tx.tag && (
                                <>
                                  <span>•</span>
                                  <span
                                    className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${tx.tagColor}`}
                                  >
                                    {tx.tag}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-block bg-gray-100/90 text-gray-700 px-2.5 py-1 rounded-full text-[11px] font-medium">
                          {tx.category}
                        </span>
                      </td>

                      {/* PAYMENT INSTRUMENT */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              tx.instrumentType === "upi" ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          <span className="font-semibold text-gray-800">{tx.instrument}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 pl-4">{tx.instrumentSub}</p>
                      </td>

                      {/* CLASS */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isIncome
                              ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]/60"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tx.classType}
                        </span>
                      </td>

                      {/* AMOUNT */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-right">
                        <span
                          className={`text-sm font-extrabold tracking-tight ${
                            isIncome ? "text-[#10B981]" : "text-gray-950"
                          }`}
                        >
                          {isIncome ? "+" : "-"}₹
                          {Math.abs(tx.amount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION & FOOTER */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-500 font-medium">
            <div>
              Showing 1 to {filteredList.length} of 48 transactions
            </div>

            <div className="flex items-center gap-4 self-center sm:self-auto">
              <div className="flex items-center gap-1.5">
                <span>Rows per page:</span>
                <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 focus:outline-none">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100">
                  ‹ Previous
                </button>
                <button className="w-6 h-6 rounded-lg bg-[#581C3F] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                  1
                </button>
                <button className="w-6 h-6 rounded-lg hover:bg-gray-100 text-gray-700 font-medium text-xs flex items-center justify-center">
                  2
                </button>
                <button className="w-6 h-6 rounded-lg hover:bg-gray-100 text-gray-700 font-medium text-xs flex items-center justify-center">
                  3
                </button>
                <span className="text-gray-400 px-0.5">...</span>
                <button className="w-6 h-6 rounded-lg hover:bg-gray-100 text-gray-700 font-medium text-xs flex items-center justify-center">
                  5
                </button>
                <button className="px-2 py-1 rounded text-gray-700 hover:bg-gray-100 font-medium">
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* TRANSACTION DETAIL MODAL / DRAWER (Matching Screenshot 2 exactly) */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#FCF7FA] px-6 py-5 border-b border-purple-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#581C3F] text-white flex items-center justify-center shadow-xs">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-950">Transaction Detail</h3>
                  <p className="text-xs font-semibold text-[#8F285D]">REF: {selectedTx.ref}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              {/* Processed Amount Hero Card */}
              <div className="border border-purple-100 bg-[#FCF8FB]/50 rounded-2xl p-5 text-center shadow-2xs">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  PROCESSED AMOUNT
                </span>
                <div className="my-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#581C3F] tracking-tight">
                    {selectedTx.amount < 0 ? "-₹" : "+₹"}
                    {Math.abs(selectedTx.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#E8F7EE] text-[#059669] px-3 py-1 rounded-full text-xs font-semibold mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Settled Instantly via UPI</span>
                </div>
              </div>

              {/* Key Details Rows */}
              <div className="space-y-3.5 divide-y divide-gray-100">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-500 font-medium">Merchant / Entity</span>
                  <span className="font-bold text-gray-950 text-right">{selectedTx.name}</span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-gray-500 font-medium">Category</span>
                  <span className="font-bold text-[#8F285D]">{selectedTx.category}</span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-gray-500 font-medium">Timestamp</span>
                  <span className="font-semibold text-gray-800">
                    {selectedTx.date}, {selectedTx.time}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-gray-500 font-medium">Payment Rail</span>
                  <span className="font-semibold text-gray-800">{selectedTx.instrument}</span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-gray-500 font-medium">Tax Deducted (GST)</span>
                  <span className="font-semibold text-gray-800">{selectedTx.tax}</span>
                </div>
              </div>

              {/* NOTES & TAGS */}
              <div className="pt-2">
                <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                  NOTES & TAGS
                </p>
                <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-3.5 text-gray-600 text-[11px] leading-relaxed italic">
                  &ldquo;{selectedTx.note}&rdquo;
                </div>
              </div>

              {/* VERIFICATION RAIL */}
              <div className="pt-1">
                <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">
                  VERIFICATION RAIL
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>NPCI Verified • 256-bit Encrypted</span>
                  </div>
                  <span className="font-mono text-gray-400 text-[10px]">AUTH_OK_200</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions (Download Slip & Edit Details) */}
            <div className="bg-[#F8F9FA] px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={handleDownloadSlip}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs border border-gray-200 shadow-2xs transition-colors flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4 text-gray-500" />
                <span>Download Slip</span>
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#581C3F] hover:bg-[#481633] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
