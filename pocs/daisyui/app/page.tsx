"use client";

import { useState } from "react";

const stats = [
  { label: "Total Revenue", value: "$48,295", change: "+12.5%", up: true, icon: "💰" },
  { label: "Active Users", value: "3,842", change: "+8.1%", up: true, icon: "👥" },
  { label: "New Orders", value: "1,209", change: "-2.4%", up: false, icon: "📦" },
  { label: "Conversion", value: "5.63%", change: "+0.9%", up: true, icon: "🎯" },
];

const tasks = [
  { id: 1, title: "Design system audit", priority: "high", done: false },
  { id: 2, title: "API rate limiting", priority: "medium", done: true },
  { id: 3, title: "Write Q1 report", priority: "low", done: false },
  { id: 4, title: "Onboard new engineers", priority: "high", done: false },
  { id: 5, title: "Update dependencies", priority: "medium", done: true },
];

const team = [
  { name: "Kai Nakamura", role: "Product Lead", avatar: "KN", online: true },
  { name: "Sofia Reyes", role: "Frontend Dev", avatar: "SR", online: true },
  { name: "Marcus Bell", role: "Backend Dev", avatar: "MB", online: false },
  { name: "Aisha Okonkwo", role: "UX Designer", avatar: "AO", online: true },
];

const priorityBadge: Record<string, string> = {
  high: "badge-error",
  medium: "badge-warning",
  low: "badge-info",
};

export default function Dashboard() {
  const [tasks_, setTasks] = useState(tasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [progress, setProgress] = useState(68);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { }
  };

  const triggerToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-200 border-b border-base-300 px-6 sticky top-0 z-50">
        <div className="flex-1 gap-3">
          <span className="font-mono text-primary text-lg font-bold tracking-tight">
            ◈ DASH
          </span>
          <div className="hidden sm:flex gap-1">
            {["Overview", "Analytics", "Team", "Settings"].map((item) => (
              <a
                key={item}
                className={`btn btn-ghost btn-sm text-xs ${item === "Overview" ? "text-primary" : "opacity-60"}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-none gap-3">
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
            <input type="checkbox" onChange={toggleTheme} />
            <span className="swap-off text-base">🌙</span>
            <span className="swap-on text-base">☀️</span>
          </label>
          <div className="indicator">
            <span className="indicator-item badge badge-primary badge-xs">3</span>
            <button className="btn btn-ghost btn-circle btn-sm">🔔</button>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar placeholder cursor-pointer">
              <div className="bg-primary text-primary-content rounded-full w-8">
                <span className="text-xs font-mono font-bold">JD</span>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-10 w-48 p-2 shadow-xl border border-base-300 mt-2">
              <li><a>Profile</a></li>
              <li><a>Billing</a></li>
              <li><hr className="my-1 border-base-300" /></li>
              <li><a className="text-error">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Jamie 👋</h1>
            <p className="text-base-content/50 text-sm mt-1">Tuesday, March 31 · Here's what's happening.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm gap-2" onClick={triggerToast}>
              <span>↗</span> Export
            </button>
            <button className="btn btn-primary btn-sm gap-2" onClick={() => setModalOpen(true)}>
              <span>＋</span> New Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="stat bg-base-200 rounded-2xl p-4 stat-glow border border-base-300">
              <div className="stat-figure text-2xl">{s.icon}</div>
              <div className="stat-title text-xs opacity-50 font-mono uppercase tracking-widest">{s.label}</div>
              <div className="stat-value text-xl font-mono text-primary">{s.value}</div>
              <div className={`stat-desc text-xs font-semibold ${s.up ? "text-success" : "text-error"}`}>
                {s.change} vs last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 card bg-base-200 border border-base-300">
            <div className="card-body p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="card-title text-sm font-mono uppercase tracking-widest opacity-60">Tasks</h2>
                <div className="badge badge-primary badge-sm">
                  {tasks_.filter((t) => !t.done).length} pending
                </div>
              </div>
              <div className="space-y-2">
                {tasks_.map((task) => (
                  <label
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-300 cursor-pointer transition-colors group"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={`flex-1 text-sm ${task.done ? "line-through opacity-40" : ""}`}>
                      {task.title}
                    </span>
                    <span className={`badge badge-sm ${priorityBadge[task.priority]}`}>
                      {task.priority}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-5">
              <h2 className="card-title text-sm font-mono uppercase tracking-widest opacity-60 mb-2">Team</h2>
              <div className="space-y-3">
                {team.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <div className="indicator">
                      {member.online && (
                        <span className="indicator-item badge badge-success badge-xs" />
                      )}
                      <div className="avatar placeholder">
                        <div className="bg-secondary/30 text-secondary-content rounded-full w-9">
                          <span className="text-xs font-mono font-bold">{member.avatar}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs opacity-40 truncate">{member.role}</p>
                    </div>
                    <button className="btn btn-ghost btn-xs opacity-40 hover:opacity-100">
                      ✉
                    </button>
                  </div>
                ))}
              </div>
              <div className="divider my-2" />
              <button className="btn btn-outline btn-sm w-full">Invite Member</button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-5 gap-4">
              <h2 className="card-title text-sm font-mono uppercase tracking-widest opacity-60">Sprint Progress</h2>
              <div>
                <div className="flex justify-between text-xs mb-1 opacity-60">
                  <span>Q1 Goals</span>
                  <span className="font-mono">{progress}%</span>
                </div>
                <progress className="progress progress-primary w-full" value={progress} max="100" />
              </div>
              <div className="flex gap-2">
                <button className="btn btn-xs btn-ghost" onClick={() => setProgress(Math.max(0, progress - 5))}>−</button>
                <button className="btn btn-xs btn-ghost" onClick={() => setProgress(Math.min(100, progress + 5))}>+</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-5 gap-3">
              <h2 className="card-title text-sm font-mono uppercase tracking-widest opacity-60">Alerts</h2>
              <div role="alert" className="alert alert-success p-3">
                <span className="text-xs">✅ Deployment succeeded</span>
              </div>
              <div role="alert" className="alert alert-warning p-3">
                <span className="text-xs">⚠️ Storage at 80% capacity</span>
              </div>
              <div role="alert" className="alert alert-error p-3">
                <span className="text-xs">🔴 API error rate spiked</span>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-5 gap-3">
              <h2 className="card-title text-sm font-mono uppercase tracking-widest opacity-60">Quick Actions</h2>
              <div className="join join-vertical w-full">
                <button className="btn btn-sm join-item justify-start gap-2">📊 Generate Report</button>
                <button className="btn btn-sm join-item justify-start gap-2">🔑 Rotate API Key</button>
                <button className="btn btn-sm join-item justify-start gap-2">🗂 Archive Logs</button>
                <button className="btn btn-sm btn-primary join-item justify-start gap-2">⚡ Deploy Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-5">
            <h2 className="card-title text-sm font-mono uppercase tracking-widest opacity-60 mb-4">DaisyUI Component Sampler</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <button className="btn btn-primary btn-sm">Primary</button>
              <button className="btn btn-secondary btn-sm">Secondary</button>
              <button className="btn btn-accent btn-sm">Accent</button>
              <button className="btn btn-outline btn-sm">Outline</button>
              <button className="btn btn-ghost btn-sm">Ghost</button>
              <button className="btn btn-sm btn-error">Error</button>
              <span className="badge badge-primary">New</span>
              <span className="badge badge-primary btn-pill">New</span>
              <span className="badge badge-outline">Stable</span>
              <input type="checkbox" className="toggle toggle-primary toggle-sm" defaultChecked />
              <span className="loading loading-spinner loading-sm text-primary" />
              <span className="loading loading-dots loading-sm text-secondary" />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
              <div className="tooltip" data-tip="DaisyUI rocks 🎸">
                <button className="btn btn-xs btn-outline">Hover me</button>
              </div>
            </div>
            <div className="tabs tabs-bordered mt-4">
              {["Overview", "Details", "History", "Logs"].map((tab) => (
                <a key={tab} role="tab" className={`tab text-sm ${tab === "Overview" ? "tab-active" : ""}`}>
                  {tab}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box bg-base-200 border border-base-300">
          <h3 className="font-mono font-bold text-lg text-primary">＋ New Task</h3>
          <p className="text-sm opacity-50 mt-1 mb-4">Add a task to the current sprint.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Task name…" className="input input-bordered w-full" />
            <select className="select select-bordered w-full">
              <option disabled selected>Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <textarea placeholder="Description (optional)" className="textarea textarea-bordered w-full" rows={3} />
          </div>
          <div className="modal-action">
            <button className="btn btn-ghost btn-sm" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={() => { setModalOpen(false); triggerToast(); }}>
              Create Task
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <button />
        </form>
      </dialog>

      {toast && (
        <div className="toast toast-end toast-bottom z-50">
          <div className="alert alert-success shadow-lg">
            <span className="text-sm">✅ Action completed successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}