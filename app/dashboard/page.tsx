"use client";

import { JSX, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  AppWindow,
  Users,
  Pill,
  Stethoscope,
  HeartPulse,
  Settings,
  Globe2,
} from "lucide-react";

// --- Menu, Stats, Patients ---
const menu = [
  { label: "Apps", icon: AppWindow },
  {
    label: "Dashboards",
    icon: LayoutGrid,
    children: ["Overview", "Patients", "Appointments", "Prescriptions", "Vitals"],
    active: "Overview",
  },
  { label: "Patients", icon: Users },
  { label: "Appointments", icon: Stethoscope },
  { label: "Prescriptions", icon: Pill },
];

const stats = [
  { title: "Total Patients", value: "12,430", delta: "+4%", icon: Users },
  { title: "Appointments Today", value: "328", delta: "+8%", icon: Stethoscope },
  { title: "Prescriptions Filled", value: "890", delta: "-2%", icon: Pill },
  { title: "Avg. Heart Rate", value: "78 bpm", delta: "+1%", icon: HeartPulse },
];

const patients = [
  { name: "John Carter", age: 45, condition: "Diabetes", status: "Stable" },
  { name: "Sarah Lee", age: 32, condition: "Asthma", status: "Critical" },
  { name: "Michael Chen", age: 54, condition: "Hypertension", status: "Under Observation" },
  { name: "Emma Davis", age: 28, condition: "Flu", status: "Recovered" },
];

export default function Dashboard(): JSX.Element {
  const spark = useMemo(() => {
    const pts = [4, 10, 7, 14, 9, 16, 12, 18, 15, 22, 20];
    return pts.map((y, i) => `${i === 0 ? "M" : "L"} ${i * 12} ${24 - y}`).join(" ");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-900 text-white relative overflow-hidden">
      {/* Dotted globe background with slow spin */}
      <div className="pointer-events-none absolute inset-0 opacity-40 animate-spin-slow">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <defs>
            <radialGradient id="dotFade" cx="60%" cy="55%" r="60%">
              <stop offset="0%" stopColor="rgba(0,255,255,0.8)" />
              <stop offset="70%" stopColor="rgba(0,255,255,0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {Array.from({ length: 900 }).map((_, i) => {
            const x = (i * 37) % 800;
            const y = ((i * 97) % 400) * 0.98 + Math.sin(i / 9) * 3;
            const r = (i % 7) === 0 ? 1.2 : 0.9;
            return <circle key={i} cx={x} cy={y} r={r} fill="url(#dotFade)" />;
          })}
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 grid grid-cols-12 gap-6 relative">
        {/* SIDEBAR */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3">
          <div className="sticky top-6 rounded-3xl bg-black/30 backdrop-blur-md border border-cyan-400/40 shadow-2xl p-4">
            <div className="flex items-center gap-2 px-2 py-3">
              <Globe2 className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_6px_cyan]" />
              <span className="font-extrabold tracking-tight">HealthPro Dashboard</span>
            </div>
            <nav className="mt-2 space-y-2">
              {menu.map(({ label, icon: Icon, children, active }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-3 py-3 text-cyan-100/90 hover:bg-white/5 rounded-2xl transition">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold">{label}</span>
                  </div>
                  {children && (
                    <ul className="pl-8 pr-3 pb-3 text-sm space-y-1">
                      {children.map((c) => (
                        <li
                          key={c}
                          className={`px-3 py-2 rounded-xl transition-colors duration-300 ${
                            c === active
                              ? "bg-cyan-500 text-black font-semibold"
                              : "text-cyan-100/80 hover:bg-white/5"
                          }`}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-black font-semibold py-2 hover:bg-cyan-400 transition-shadow drop-shadow-lg">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="col-span-12 md:col-span-9 lg:col-span-9">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300 drop-shadow-lg">
              Healthcare Dashboard
            </h1>
            <div className="mt-1 text-cyan-100/80">
              Live data{" "}
              <span className="mx-2 inline-block rounded-full bg-cyan-500/20 px-2 py-0.5 text-cyan-300 animate-pulse">
                Realtime
              </span>
            </div>
            <div className="mt-2 text-4xl md:text-5xl font-black drop-shadow-[0_0_15px_cyan]">
              12,430 Patients
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-black/30 border border-cyan-400/40 backdrop-blur-md p-4 shadow-xl hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-cyan-100/80">{s.title}</div>
                  <div className="rounded-xl bg-cyan-500 text-black p-2 drop-shadow-[0_0_12px_cyan]">
                    <s.icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-extrabold">{s.value}</div>
                <div
                  className={`mt-1 text-sm ${
                    s.delta.startsWith("-") ? "text-rose-300" : "text-emerald-300"
                  }`}
                >
                  {s.delta}
                </div>
                <svg viewBox="0 0 120 24" className="mt-3 w-full h-8">
                  <path
                    d={spark}
                    fill="none"
                    stroke="currentColor"
                    className="text-cyan-400"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Patients Table */}
          <div className="rounded-3xl bg-black/30 border border-cyan-400/40 backdrop-blur-md shadow-2xl overflow-hidden mb-6">
            <div className="px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Recent Patients</h3>
              <div className="text-sm text-cyan-200/80">Updated live</div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-cyan-200/70">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Age</th>
                    <th className="px-6 py-3">Condition</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, i) => (
                    <tr
                      key={p.name}
                      className={`transition-all duration-300 cursor-pointer ${
                        i % 2 === 0 ? "bg-white/5 hover:bg-cyan-400/10" : "bg-transparent hover:bg-cyan-400/10"
                      }`}
                    >
                      <td className="px-6 py-3">{p.name}</td>
                      <td className="px-6 py-3">{p.age}</td>
                      <td className="px-6 py-3">{p.condition}</td>
                      <td
                        className={`px-6 py-3 font-semibold transition-colors duration-500 ${
                          p.status === "Critical"
                            ? "bg-rose-600/10 text-rose-400 animate-pulse rounded-full px-2"
                            : p.status === "Recovered"
                            ? "bg-emerald-600/10 text-emerald-400 rounded-full px-2"
                            : "bg-cyan-600/10 text-cyan-300 rounded-full px-2"
                        }`}
                      >
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
