"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  History,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Utensils,
  ShoppingBag,
  Car,
  Film,
  Zap,
  Cloud,
  Heart,
  Calendar,
  Layers,
} from "lucide-react";

interface BudgetCategory {
  id: string;
  name: string;
  subtitle: string;
  spent: number;
  allocated: number;
  percentage: number;
  statusText: string;
  statusType: "on-track" | "over" | "fixed" | "near-limit" | "healthy";
  footerLeft: string;
  footerRight: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  isBreached?: boolean;
}

const budgetCategories: BudgetCategory[] = [
  {
    id: "food",
    name: "Food & Dining",
    subtitle: "Groceries, delivery, dining out",
    spent: 6200,
    allocated: 8000,
    percentage: 77.5,
    statusText: "On Track",
    statusType: "on-track",
    footerLeft: "Remaining: ₹1,800",
    footerRight: "₹300/day safe limit",
    icon: Utensils,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "shopping",
    name: "Shopping",
    subtitle: "Apparel, electronics, lifestyle",
    spent: 5800,
    allocated: 5000,
    percentage: 116.0,
    statusText: "Over by ₹800",
    statusType: "over",
    footerLeft: "Exceeded threshold on Sep 20",
    footerRight: "Deficit ₹800",
    icon: ShoppingBag,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    isBreached: true,
  },
  {
    id: "transport",
    name: "Transport",
    subtitle: "Metro, fuel, rideshares",
    spent: 3450,
    allocated: 5000,
    percentage: 69.0,
    statusText: "On Track",
    statusType: "on-track",
    footerLeft: "Remaining: ₹1,550",
    footerRight: "₹258/day safe limit",
    icon: Car,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subtitle: "Movies, concerts, leisure",
    spent: 2100,
    allocated: 3000,
    percentage: 70.0,
    statusText: "On Track",
    statusType: "on-track",
    footerLeft: "Remaining: ₹900",
    footerRight: "1 weekend left",
    icon: Film,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: "utilities",
    name: "Bills & Utilities",
    subtitle: "Electricity, water, broadband",
    spent: 8000,
    allocated: 10000,
    percentage: 80.0,
    statusText: "Fixed paid",
    statusType: "fixed",
    footerLeft: "Remaining: ₹2,000",
    footerRight: "Gas pipeline due Sep 28",
    icon: Zap,
    iconBg: "bg-pink-100",
    iconColor: "text-[#862E64]",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    subtitle: "SaaS, cloud, streaming",
    spent: 1698,
    allocated: 2000,
    percentage: 84.9,
    statusText: "Near Limit",
    statusType: "near-limit",
    footerLeft: "Remaining: ₹302",
    footerRight: "All 5 cycles auto-debited",
    icon: Cloud,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
];

export default function BudgetsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full">
      <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
        {/* TOP BAR / BREADCRUMB & CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Spendly
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-950 font-semibold">Budgets</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 flex-wrap">
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

            {/* Add Expense Action Button */}
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#581C3F] hover:bg-[#481633] text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>

            {/* Profile Avatar */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-2xs ring-1 ring-purple-100 hidden sm:block">
              <Image src="/archita.jpg" alt="Archita Sharma Profile" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* HEADER: TITLE, MONTH NAV & ACTIONS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8F285D] mb-1">
              <span>ALLOCATION MATRIX</span>
              <span>•</span>
              <span>FISCAL YEAR 2026-27</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
              September Budget
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 max-w-xl">
              Set monthly spending limits and monitor category progress in real-time with automated pacing alerts.
            </p>
          </div>

          {/* Action Controls */}
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

            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition-colors">
              <History className="w-4 h-4 text-gray-500" />
              <span>Budget History</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#581C3F] hover:bg-[#481633] text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              <span>Add Budget</span>
            </button>
          </div>
        </div>

        {/* OVERALL HEALTH / HERO BUDGET PACING CARD */}
        <div className="bg-gradient-to-b from-[#FAF8FA] to-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs space-y-6">
          {/* Top 4 Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* Metric 1: Total Monthly Budget */}
            <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                TOTAL MONTHLY BUDGET
              </span>
              <div className="mt-1.5 flex items-baseline">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                  ₹35,000
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                <span>7 Managed Limits</span>
              </div>
            </div>

            {/* Metric 2: Spent So Far */}
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                SPENT SO FAR
              </span>
              <div className="mt-1.5 flex items-baseline">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#581C3F] tracking-tight">
                  ₹28,450
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#8F285D]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>81.3% consumed</span>
              </div>
            </div>

            {/* Metric 3: Remaining Surplus */}
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                REMAINING SURPLUS
              </span>
              <div className="mt-1.5 flex items-baseline">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                  ₹6,550
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>18.7% buffer intact</span>
              </div>
            </div>

            {/* Metric 4: Safe Daily Burn Rate */}
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                SAFE DAILY BURN RATE
              </span>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                  ₹1,091
                </span>
                <span className="text-xs text-gray-400 font-medium">/day</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>6 days left in cycle</span>
              </div>
            </div>
          </div>

          {/* Consumption Horizon Progress Bar Section */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-950">Overall Consumption Horizon</span>
                <span className="text-[10px] font-bold text-[#059669] bg-[#E8F7EE] px-2 py-0.5 rounded-full">
                  Standard Pace
                </span>
              </div>
              <div className="text-xs font-bold text-[#581C3F]">
                ₹28,450 <span className="font-medium text-gray-400">of ₹35,000</span>
              </div>
            </div>

            {/* Bar Track */}
            <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#581C3F] rounded-full transition-all duration-500"
                style={{ width: "81.3%" }}
              />
            </div>

            {/* Timeline Milestones */}
            <div className="relative flex items-center justify-between text-[11px] text-gray-400 font-medium pt-1">
              <span>Day 1 (Sep 1)</span>
              <span className="text-gray-500 font-medium">Optimal Expected Spend: ₹28,000</span>
              <span className="inline-flex items-center bg-[#20272C] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
                Today: Day 24 (80% cycle)
              </span>
              <span>Day 30 (Sep 30)</span>
            </div>
          </div>
        </div>

        {/* ACTIVE CATEGORIES SECTION HEADER */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-950">Active Categories</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              7 Groups
            </span>
          </div>
          <span className="text-xs font-medium text-gray-400">Sorted by highest allocation</span>
        </div>

        {/* TWO-COLUMN GRID: CATEGORIES (LEFT) & INSIGHTS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: 7 Category Cards (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-4">
            {/* 2-Columns grid for the first 6 categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetCategories.map((cat) => {
                const Icon = cat.icon;

                return (
                  <div
                    key={cat.id}
                    className={`bg-white rounded-2xl p-5 shadow-2xs transition-all hover:shadow-xs relative ${
                      cat.isBreached
                        ? "border-t-4 border-t-red-500 border border-gray-200/80"
                        : "border border-gray-200/70"
                    }`}
                  >
                    {/* Top Row: Icon, Titles, Status Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-gray-950 leading-tight">
                            {cat.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      {cat.statusType === "on-track" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-[#E8F7EE] px-2 py-0.5 rounded-full shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          {cat.statusText}
                        </span>
                      )}

                      {cat.statusType === "over" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#DC2626] bg-[#FEECEE] px-2 py-0.5 rounded-full shrink-0">
                          <AlertTriangle className="w-3 h-3" />
                          {cat.statusText}
                        </span>
                      )}

                      {cat.statusType === "fixed" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-gray-500" />
                          {cat.statusText}
                        </span>
                      )}

                      {cat.statusType === "near-limit" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                          {cat.statusText}
                        </span>
                      )}
                    </div>

                    {/* Spend Value & Percentage */}
                    <div className="mt-4 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                            cat.isBreached ? "text-[#DC2626]" : "text-gray-950"
                          }`}
                        >
                          ₹{cat.spent.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          / ₹{cat.allocated.toLocaleString()}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          cat.isBreached ? "text-[#DC2626]" : "text-gray-900"
                        }`}
                      >
                        {cat.percentage}%
                      </span>
                    </div>

                    {/* Category Progress Bar */}
                    <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          cat.isBreached ? "bg-[#EF4444]" : "bg-[#581C3F]"
                        }`}
                        style={{ width: `${Math.min(100, cat.percentage)}%` }}
                      />
                    </div>

                    {/* Footer Info */}
                    <div className="mt-3 flex items-center justify-between text-[11px] font-medium pt-1">
                      <span className={cat.isBreached ? "text-[#DC2626] font-semibold" : "text-gray-500"}>
                        {cat.footerLeft}
                      </span>
                      <span className={cat.isBreached ? "text-[#DC2626] font-bold" : "text-gray-400"}>
                        {cat.footerRight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 7th Category Card: Health & Personal Care (Full Width horizontal card) */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Icon, Details, and Healthy Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#862E64] flex items-center justify-center shrink-0 shadow-2xs">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-gray-950">
                        Health & Personal Care
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-[#E8F7EE] px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        Healthy
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Supplements, pharmacy, grooming
                    </p>
                  </div>
                </div>

                {/* Right: Numbers, Progress Bar, Footers */}
                <div className="flex-1 max-w-sm sm:pl-4">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-extrabold text-gray-950 tracking-tight">
                        ₹1,202
                      </span>
                      <span className="text-xs text-gray-400 font-medium">/ ₹2,000</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900">60.1%</span>
                  </div>

                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#10B981] rounded-full" style={{ width: "60.1%" }} />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                    <span>Remaining: ₹798</span>
                    <span>Optimal expenditure profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Budget Insights AI AUDITOR Card (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-2xs space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#581C3F]" />
                  <h3 className="text-sm font-bold text-gray-950">Budget Insights</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5EEF8] text-[#862E64] uppercase tracking-wider">
                  AI AUDITOR
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Real-time analysis based on velocity and historical burn benchmarks.
              </p>
            </div>

            {/* Insight 1: Shopping Limit Breached */}
            <div className="bg-[#FFF5F5] border border-[#FED7D7]/80 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span>Shopping Limit Breached</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed pl-6">
                Exceeded its ₹5,000 threshold by 16% on 20 Sep. Suggested action: trim dining allowance by ₹500.
              </p>
            </div>

            {/* Insight 2: Food & Dining Discipline */}
            <div className="bg-[#F0FFF4] border border-[#C6F6D5]/80 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Food & Dining Discipline</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed pl-6">
                You have saved ₹1,800 compared to your usual monthly burn rate at this interval.
              </p>
            </div>

            {/* Insight 3: Positive Month-End Forecast */}
            <div className="bg-[#FAF5FF] border border-[#E9D8FD]/80 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <TrendingUp className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Positive Month-End Forecast</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed pl-6">
                You are projected to close the month at ₹31,200, well within your ₹35,000 ceiling.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
