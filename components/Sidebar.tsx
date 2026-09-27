"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/", icon: LayoutGrid, activeMatch: (p: string) => p === "/" || p === "/home" },
    { name: "Transactions", href: "/transactions", icon: CreditCard, activeMatch: (p: string) => p.startsWith("/transactions") },
    { name: "Budgets", href: "#budgets", icon: PieChart, activeMatch: (p: string) => p.startsWith("/budgets") },
    { name: "Analytics", href: "#analytics", icon: BarChart3, activeMatch: (p: string) => p.startsWith("/analytics") },
    { name: "Recurring", href: "#recurring", icon: CalendarClock, activeMatch: (p: string) => p.startsWith("/recurring") },
    { name: "Settings", href: "#settings", icon: SlidersHorizontal, activeMatch: (p: string) => p.startsWith("/settings") },
  ];

  return (
    <>
      {/* MOBILE TOP NAVIGATION BAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-950">Spendly</span>
          <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F5EEF8] text-[#862E64]">
            PRO
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/30 z-30 backdrop-blur-2xs"
        />
      )}

      {/* MAIN SIDEBAR (Desktop Fixed/Sticky & Mobile Slide) */}
      <aside
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:sticky top-0 left-0 z-40 md:z-30 w-64 bg-white border-r border-[#ECEEF2] h-screen flex flex-col justify-between shrink-0 select-none transition-transform duration-200 ease-in-out`}
      >
        <div className="p-6">
          {/* Brand Logo & Pro Badge */}
          <Link href="/" className="flex items-center gap-2 mb-8 inline-block">
            <span className="text-2xl font-bold tracking-tight text-gray-950">Spendly</span>
            <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5EEF8] text-[#862E64]">
              PRO
            </span>
          </Link>

          {/* Section: Platform */}
          <div className="mb-2">
            <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-3 px-3">
              Platform
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = item.activeMatch(pathname);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-[#581C3F] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
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
    </>
  );
}
