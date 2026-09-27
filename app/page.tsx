"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  CreditCard,
  PieChart,
  BarChart3,
  CalendarClock,
  SlidersHorizontal,
  Bell,
  Sun,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  FileDown,
  Plus,
  ArrowUpRight,
  ArrowUp,
  Wallet,
  Receipt,
  PiggyBank,
  CheckCircle2,
  TrendingUp,
  MoreHorizontal,
  Utensils,
  Car,
  Tv,
  ShoppingBag,
  Coffee,
  X,
  Menu,
} from "lucide-react";

// Types
interface Transaction {
  id: string;
  name: string;
  category: string;
  paymentMethod: string;
  amount: number;
  type: "expense" | "income";
  dateGroup: "TODAY" | "YESTERDAY" | "21 SEP 2026";
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(14); // Sep 14 default
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportToast, setShowExportToast] = useState(false);

  // Form state for adding an expense
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Food & Dining");
  const [newPaymentMethod, setNewPaymentMethod] = useState("UPI");

  // Sample transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      name: "Lunch with Colleagues",
      category: "Food & Dining",
      paymentMethod: "UPI",
      amount: 450,
      type: "expense",
      dateGroup: "TODAY",
      icon: Utensils,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      id: "2",
      name: "Uber to Cyber City",
      category: "Transport",
      paymentMethod: "UPI",
      amount: 320,
      type: "expense",
      dateGroup: "TODAY",
      icon: Car,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "3",
      name: "Netflix Premium",
      category: "Subscriptions",
      paymentMethod: "Card",
      amount: 649,
      type: "expense",
      dateGroup: "YESTERDAY",
      icon: Tv,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      id: "4",
      name: "Zara Apparel",
      category: "Shopping",
      paymentMethod: "HDFC Card",
      amount: 1200,
      type: "expense",
      dateGroup: "YESTERDAY",
      icon: ShoppingBag,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
    },
    {
      id: "5",
      name: "Blue Tokai Coffee",
      category: "Food & Dining",
      paymentMethod: "UPI",
      amount: 280,
      type: "expense",
      dateGroup: "YESTERDAY",
      icon: Coffee,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "6",
      name: "Freelance Retainer",
      category: "Income",
      paymentMethod: "Bank Transfer",
      amount: 15000,
      type: "income",
      dateGroup: "21 SEP 2026",
      icon: Wallet,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
    },
  ]);

  // Categories data matching Figma exactly
  const categories = [
    { name: "Bills & Utilities", amount: 8000, percentage: 28.1, color: "#581C3F" },
    { name: "Food & Dining", amount: 6200, percentage: 21.8, color: "#8F285D" },
    { name: "Shopping", amount: 5800, percentage: 20.4, color: "#C04882" },
    { name: "Transport", amount: 3450, percentage: 12.1, color: "#D977A6" },
    { name: "Entertainment", amount: 2100, percentage: 7.4, color: "#A5B4FC" },
    { name: "Subscriptions", amount: 1698, percentage: 6.0, color: "#C4B5FD" },
    { name: "Health & Wellness", amount: 1202, percentage: 4.2, color: "#E2E8F0" },
  ];

  // Daily spending data for Sep 01 - Sep 30
  const dailyData = [
    { day: 1, amount: 1800, note: "Grocery Restock" },
    { day: 2, amount: 1200, note: "Dining Out" },
    { day: 3, amount: 2150, note: "Fuel & Pharmacy" },
    { day: 4, amount: 1600, note: "Home Essentials" },
    { day: 5, amount: 2300, note: "Dinner Party" },
    { day: 6, amount: 1950, note: "Online Shopping" },
    { day: 7, amount: 2700, note: "Weekend Outing" },
    { day: 8, amount: 2100, note: "Groceries & Cafe" },
    { day: 9, amount: 1500, note: "Local Commute" },
    { day: 10, amount: 2400, note: "Utility Bills" },
    { day: 11, amount: 3100, note: "Gadget Repair" },
    { day: 12, amount: 1750, note: "Team Lunch" },
    { day: 13, amount: 2200, note: "Departmental Store" },
    { day: 14, amount: 3400, note: "Insurance + Travel", isPeak: true },
    { day: 15, amount: 2650, note: "Mid-month Supplies" },
    { day: 16, amount: 1850, note: "Cinema & Snacks" },
    { day: 17, amount: 2050, note: "Clothing Retail" },
    { day: 18, amount: 1400, note: "Ride Hails" },
    { day: 19, amount: 2350, note: "Health Supplements" },
    { day: 20, amount: 1900, note: "Books & Stationeries" },
    { day: 21, amount: 2500, note: "Client Dinner" },
    { day: 22, amount: 1650, note: "Pet Care" },
    { day: 23, amount: 2400, note: "Home Maintenance" },
    { day: 24, amount: 1800, note: "Supermarket" },
    { day: 25, amount: 2150, note: "Streaming & Gaming" },
    { day: 26, amount: 1300, note: "Metro & Auto" },
    { day: 27, amount: 1950, note: "Electronics Accessories" },
    { day: 28, amount: 2250, note: "Dinner with Family" },
    { day: 29, amount: 1700, note: "Gym Membership" },
    { day: 30, amount: 2000, note: "End of Month Dining" },
  ];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      name: newTitle,
      category: newCategory,
      paymentMethod: newPaymentMethod,
      amount: parseFloat(newAmount),
      type: "expense",
      dateGroup: "TODAY",
      icon: Utensils,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    };

    setTransactions([newTx, ...transactions]);
    setNewTitle("");
    setNewAmount("");
    setIsAddExpenseOpen(false);
  };

  const handleExportPDF = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
    window.print();
  };

  // Filtered transactions based on search query
  const filteredTransactions = transactions.filter((tx) =>
    tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Grouped transactions
  const groupedTx = {
    TODAY: filteredTransactions.filter((t) => t.dateGroup === "TODAY"),
    YESTERDAY: filteredTransactions.filter((t) => t.dateGroup === "YESTERDAY"),
    "21 SEP 2026": filteredTransactions.filter((t) => t.dateGroup === "21 SEP 2026"),
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col md:flex-row font-sans selection:bg-[#581C3F] selection:text-white">
      {/* Toast Notification */}
      {showExportToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#111827] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">Exporting September 2026 financial report...</span>
        </div>
      )}

      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-950">Spendly</span>
          <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F5EEF8] text-[#862E64]">
            PRO
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-64 bg-white border-r border-[#ECEEF2] h-auto md:h-screen md:sticky md:top-0 z-30 shrink-0 select-none justify-between transition-all`}
      >
        <div className="p-6">
          {/* Brand Logo & Pro Badge */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-bold tracking-tight text-gray-950">Spendly</span>
            <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5EEF8] text-[#862E64]">
              PRO
            </span>
          </div>

          {/* Section: Platform */}
          <div className="mb-2">
            <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-3 px-3">
              Platform
            </p>
            <nav className="space-y-1">
              <a
                href="#overview"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#581C3F] text-white font-medium text-sm shadow-sm transition-all"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Overview</span>
              </a>
              <a
                href="#transactions"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span>Transactions</span>
              </a>
              <a
                href="#budgets"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <PieChart className="w-4 h-4 text-gray-400" />
                <span>Budgets</span>
              </a>
              <a
                href="#analytics"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <span>Analytics</span>
              </a>
              <a
                href="#recurring"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <CalendarClock className="w-4 h-4 text-gray-400" />
                <span>Recurring</span>
              </a>
              <a
                href="#settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium text-sm transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer Section */}
        <div className="p-4 border-t border-gray-100 space-y-4">
          {/* Active Period Status Pill */}
          <div className="bg-[#F6F7F9] border border-gray-200/70 rounded-full px-3.5 py-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-semibold text-gray-800">September 2026</span>
            </div>
            <span className="text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200/60 shadow-2xs">
              Active
            </span>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-200 ring-2 ring-purple-50">
                <Image
                  src="/archita.jpg"
                  alt="Archita Sharma"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-gray-900 truncate leading-tight">Archita Sharma</p>
                <p className="text-[11px] text-gray-400 truncate leading-tight">archita@spendly.io</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <button
                className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Theme"
                aria-label="Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Settings"
                aria-label="Settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
        {/* TOP BAR / BREADCRUMB & CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span className="hover:text-gray-800 cursor-pointer">Spendly</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold">Overview</span>
          </div>

          {/* Controls: Date Picker Pill, Search, Profile */}
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

            {/* Search Input Bar */}
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

            {/* Top Right User Avatar */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-2xs ring-1 ring-purple-100 hidden sm:block">
              <Image
                src="/archita.jpg"
                alt="Archita Sharma Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* GREETINGS & ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8F285D] mb-1">
              <span>FINANCIAL PULSE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F285D]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
              Good evening, Archita
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Here&apos;s your financial overview for September 2026.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <FileDown className="w-4 h-4 text-gray-500" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => setIsAddExpenseOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#581C3F] hover:bg-[#481633] text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* 4 SUMMARY METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Income */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Total Income</span>
              <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] text-[#10B981] flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">₹</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">50,000</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#059669] bg-[#E8F7EE] px-1.5 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  4.2%
                </span>
                <span className="text-xs text-gray-400 font-medium">vs. August</span>
              </div>
            </div>
          </div>

          {/* Card 2: Total Expenses */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Total Expenses</span>
              <div className="w-8 h-8 rounded-xl bg-[#FEECEE] text-[#F43F5E] flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">₹</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">28,450</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#E11D48] bg-[#FEECEE] px-1.5 py-0.5 rounded-full">
                  <ArrowUp className="w-3 h-3" />
                  8.4%
                </span>
                <span className="text-xs text-gray-400 font-medium">Higher than usual</span>
              </div>
            </div>
          </div>

          {/* Card 3: Remaining Balance */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Remaining Balance</span>
              <div className="w-8 h-8 rounded-xl bg-[#F5EEF8] text-[#862E64] flex items-center justify-center">
                <PiggyBank className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">₹</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">21,550</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#581C3F] rounded-full" style={{ width: "43.1%" }} />
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium shrink-0">43.1% left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Savings Rate */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Savings Rate</span>
              <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-500 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#581C3F]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">43.1%</span>
                <span className="text-xs font-medium text-gray-400">/ 40% goal</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#059669] bg-[#E8F7EE] px-2 py-0.5 rounded-full">
                  Exceeded Target
                </span>
                <span className="text-[11px] text-[#059669] font-semibold">↑ 2.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SPENDING OVERVIEW (DAILY ACTIVITY) CHART CARD */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-2xs">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-950">Spending Overview</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F5EEF8] text-[#862E64]">
                  Daily Activity
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Velocity and distribution across September 2026
              </p>
            </div>

            {/* Daily / Weekly / Monthly Switcher */}
            <div className="bg-[#F1F3F5] p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
              {(["Daily", "Weekly", "Monthly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-white text-gray-950 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative pt-12 pb-4">
            {/* Y-Axis Grid Lines */}
            <div className="absolute inset-x-0 top-12 bottom-8 flex flex-col justify-between pointer-events-none text-xs text-gray-300">
              <div className="border-b border-gray-100 w-full relative">
                <span className="absolute -top-3 left-0 text-[11px] text-gray-400 font-medium">₹4k</span>
              </div>
              <div className="border-b border-gray-100 w-full relative">
                <span className="absolute -top-3 left-0 text-[11px] text-gray-400 font-medium">₹3k</span>
              </div>
              <div className="border-b border-gray-100 w-full relative">
                <span className="absolute -top-3 left-0 text-[11px] text-gray-400 font-medium">₹2k</span>
              </div>
              <div className="border-b border-gray-100 w-full relative">
                <span className="absolute -top-3 left-0 text-[11px] text-gray-400 font-medium">₹1k</span>
              </div>
            </div>

            {/* Bars Canvas */}
            <div className="relative pl-10 pr-2 h-52 flex items-end justify-between gap-1 sm:gap-2">
              {dailyData.map((item) => {
                const maxAmount = 4000;
                const heightPercent = Math.min(100, Math.max(12, (item.amount / maxAmount) * 100));
                const isSelectedPeak = item.day === 14;
                const isHovered = hoveredDay === item.day;

                return (
                  <div
                    key={item.day}
                    onMouseEnter={() => setHoveredDay(item.day)}
                    className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                  >
                    {/* Tooltip for Peak Day (Sep 14) or Hovered Day */}
                    {(isSelectedPeak || isHovered) && (
                      <div className="absolute -top-12 z-20 flex flex-col items-center pointer-events-none transition-all">
                        <div className="bg-[#20272C] text-white rounded-xl px-3 py-2 text-center shadow-xl border border-gray-700/50 whitespace-nowrap min-w-[120px]">
                          <p className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                            {item.isPeak ? "PEAK DAY • SEP 14" : `SEP ${item.day < 10 ? `0${item.day}` : item.day}`}
                          </p>
                          <p className="text-sm font-extrabold text-white leading-tight">
                            ₹{item.amount.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-300 font-medium">{item.note}</p>
                        </div>
                        {/* Downward Caret */}
                        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#20272C]" />
                      </div>
                    )}

                    {/* Bar Pill */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[14px] rounded-t-full transition-all duration-200 ${
                        isSelectedPeak
                          ? "bg-[#42122D] shadow-sm ring-2 ring-[#42122D]/20"
                          : isHovered
                          ? "bg-[#932B66]"
                          : "bg-gradient-to-t from-[#B27092]/60 to-[#E8C2D5]/80 hover:from-[#932B66]/80 hover:to-[#B27092]"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-Axis Dates */}
            <div className="pl-10 pr-2 mt-4 flex items-center justify-between text-[11px] font-semibold text-gray-400">
              <span>Sep 01</span>
              <span>Sep 05</span>
              <span>Sep 10</span>
              <span className="text-[#581C3F] font-bold">Sep 15 (Mid)</span>
              <span>Sep 20</span>
              <span>Sep 25</span>
              <span>Sep 30</span>
            </div>
          </div>

          {/* Bottom Comparison Callout Banner */}
          <div className="mt-4 bg-[#F8F9FA] border border-gray-200/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5EEF8] text-[#862E64] flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-900">Compared with August</span>
                  <span className="text-[11px] font-bold text-[#E11D48] bg-[#FEECEE] px-2 py-0.5 rounded-md">
                    +₹4,150 (+17.1%)
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Spending spiked mid-month due to annual insurance premium and festive seasonal shopping.
                </p>
              </div>
            </div>

            {/* August vs September Comparison Bars */}
            <div className="flex items-center gap-6 self-start md:self-auto shrink-0">
              <div>
                <div className="flex items-baseline justify-between gap-3 text-xs mb-1">
                  <span className="text-gray-400 font-medium">August</span>
                  <span className="font-bold text-gray-800">₹24,300</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full" />
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-3 text-xs mb-1">
                  <span className="text-[#581C3F] font-semibold">September (Current)</span>
                  <span className="font-bold text-[#581C3F]">₹28,450</span>
                </div>
                <div className="w-28 h-1.5 bg-[#581C3F] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: 2 EQUAL COLUMNS (Category Breakdown & Transactions) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Spending by Category */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-950">Spending by Category</h2>
                  <p className="text-xs text-gray-400 mt-0.5">7 expense buckets this month</p>
                </div>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Donut Chart with Centered Total */}
              <div className="flex justify-center my-6">
                <div className="relative w-44 h-44">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    {/* SVG Donut Slices */}
                    {(() => {
                      let accumulatedPercentage = 0;
                      return categories.map((cat) => {
                        const strokeDasharray = `${cat.percentage} ${100 - cat.percentage}`;
                        const strokeDashoffset = -accumulatedPercentage;
                        accumulatedPercentage += cat.percentage;
                        const isHovered = hoveredCategory === cat.name;

                        return (
                          <circle
                            key={cat.name}
                            cx="50"
                            cy="50"
                            r="36"
                            fill="transparent"
                            stroke={cat.color}
                            strokeWidth={isHovered ? "15" : "12"}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-200 cursor-pointer"
                            onMouseEnter={() => setHoveredCategory(cat.name)}
                            onMouseLeave={() => setHoveredCategory(null)}
                          />
                        );
                      });
                    })()}
                  </svg>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      TOTAL SPENT
                    </span>
                    <span className="text-xl font-extrabold text-gray-950 leading-tight">
                      ₹28,450
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">100% accounted</span>
                  </div>
                </div>
              </div>

              {/* Category Breakdown Table / List */}
              <div className="space-y-3 pt-2">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    onMouseEnter={() => setHoveredCategory(cat.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`flex items-center justify-between text-xs py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                      hoveredCategory === cat.name ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-semibold text-gray-800">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900">₹{cat.amount.toLocaleString()}</span>
                      <span className="text-gray-400 font-medium w-10 text-right">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-6">
              <button className="w-full py-2.5 px-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#581C3F] font-bold text-xs border border-gray-200/80 transition-colors flex items-center justify-center gap-1.5">
                <span>Analyze All Categories</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-950">Recent Transactions</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Logged spend & inflows for this billing cycle
                  </p>
                </div>
                <a
                  href="#transactions"
                  className="text-xs font-bold text-[#581C3F] hover:underline flex items-center gap-1"
                >
                  <span>View all</span>
                  <span>→</span>
                </a>
              </div>

              {/* Transaction Groups */}
              <div className="space-y-4 pt-1">
                {/* TODAY */}
                {groupedTx.TODAY.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                      TODAY
                    </p>
                    <div className="space-y-2.5">
                      {groupedTx.TODAY.map((tx) => {
                        const Icon = tx.icon;
                        return (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl ${tx.iconBg} ${tx.iconColor} flex items-center justify-center shrink-0`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-900 leading-tight">
                                  {tx.name}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                                  <span>{tx.category}</span>
                                  <span>•</span>
                                  <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded text-[10px] font-medium">
                                    {tx.paymentMethod}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-extrabold text-gray-900">
                              -₹{tx.amount.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* YESTERDAY */}
                {groupedTx.YESTERDAY.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                      YESTERDAY
                    </p>
                    <div className="space-y-2.5">
                      {groupedTx.YESTERDAY.map((tx) => {
                        const Icon = tx.icon;
                        return (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl ${tx.iconBg} ${tx.iconColor} flex items-center justify-center shrink-0`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-900 leading-tight">
                                  {tx.name}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                                  <span>{tx.category}</span>
                                  <span>•</span>
                                  <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded text-[10px] font-medium">
                                    {tx.paymentMethod}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-extrabold text-gray-900">
                              -₹{tx.amount.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 21 SEP 2026 (Highlight Income Row) */}
                {groupedTx["21 SEP 2026"].length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                      21 SEP 2026
                    </p>
                    <div className="space-y-2">
                      {groupedTx["21 SEP 2026"].map((tx) => {
                        const Icon = tx.icon;
                        return (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]/70"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#A7F3D0] text-[#065F46] flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-950 leading-tight">
                                  {tx.name}
                                </p>
                                <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                                  {tx.category} • {tx.paymentMethod}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-extrabold text-[#10B981]">
                              +₹{tx.amount.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Info */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>{filteredTransactions.length} transactions displayed</span>
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All cleared • Realtime sync</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ADD EXPENSE MODAL */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Add New Expense</h3>
                <p className="text-xs text-gray-400">Record a new transaction to your Spendly ledger</p>
              </div>
              <button
                onClick={() => setIsAddExpenseOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Expense Title / Merchant</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swiggy Gourmet, Metro Card recharge"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 focus:border-[#581C3F]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 focus:border-[#581C3F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 focus:border-[#581C3F] bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Payment Method</label>
                  <select
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#581C3F]/20 focus:border-[#581C3F] bg-white"
                  >
                    <option value="UPI">UPI</option>
                    <option value="HDFC Card">HDFC Card</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#581C3F] text-white hover:bg-[#481633] font-semibold transition-colors"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
