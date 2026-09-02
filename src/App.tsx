import { useState, useEffect } from "react";

// ─── tiny helpers ───────────────────────────────────────────────────────────

function clsx(...args: (string | boolean | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

// ─── nav ────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-zinc-200/70 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 4h4M2 7h6M2 10h3M9 6l3 1-3 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-bold text-zinc-900 tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: 17 }}
          >
            AiVibeBoard
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Roadmap", "Integrations", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Sign in
          </a>
          <a
            href="#"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Start free
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── hero ────────────────────────────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700"
      style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </span>
  );
}

const KANBAN_COLS = [
  {
    title: "Backlog",
    color: "bg-zinc-100 text-zinc-500",
    dot: "bg-zinc-400",
    cards: [
      { title: "Set up CI/CD pipeline", tag: "Infra", priority: "P2", avatar: "AS" },
      { title: "Write API docs", tag: "Docs", priority: "P3", avatar: "MK" },
    ],
  },
  {
    title: "In Progress",
    color: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
    cards: [
      { title: "Connect Stripe payments", tag: "Backend", priority: "P1", avatar: "MR", progress: 65 },
      { title: "Design onboarding flow", tag: "Design", priority: "P2", avatar: "AI" },
    ],
  },
  {
    title: "Done",
    color: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
    cards: [
      { title: "User auth & permissions", tag: "Backend", priority: "P1", avatar: "DS" },
    ],
  },
];

function KanbanCard({
  title,
  tag,
  priority,
  avatar,
  progress,
}: {
  title: string;
  tag: string;
  priority: string;
  avatar: string;
  progress?: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-3 space-y-2 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-zinc-800 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
          {title}
        </p>
        <span className={clsx(
          "shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded",
          priority === "P1" ? "bg-rose-50 text-rose-500" :
          priority === "P2" ? "bg-amber-50 text-amber-500" :
          "bg-zinc-100 text-zinc-400"
        )} style={{ fontFamily: "JetBrains Mono, monospace" }}>
          {priority}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-600"
          style={{ fontFamily: "Inter, sans-serif" }}>
          {tag}
        </span>
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center text-[8px] font-bold text-white">
          {avatar}
        </div>
      </div>
      {progress !== undefined && (
        <div className="h-1 rounded-full bg-zinc-100">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function AIAssistantPanel() {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-4 space-y-3 shadow-2xl">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 5h8M5 1v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-zinc-300" style={{ fontFamily: "Inter, sans-serif" }}>
          AI Assistant
        </span>
        <span className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-900/50 text-emerald-400">
          Active
        </span>
      </div>
      {[
        { role: "user", text: "Launch a new developer portal by Q3" },
        {
          role: "ai",
          text: "Breaking this into 8 subtasks across 3 phases. Assigning based on team capacity...",
        },
      ].map((msg, i) => (
        <div
          key={i}
          className={clsx(
            "text-[11px] leading-relaxed rounded-lg px-3 py-2",
            msg.role === "user"
              ? "bg-zinc-800 text-zinc-300 self-end"
              : "bg-violet-900/40 text-violet-300 border border-violet-800/40"
          )}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {msg.text}
        </div>
      ))}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {[
          { label: "8 tasks created", color: "bg-blue-900/50 text-blue-400" },
          { label: "3 assigned", color: "bg-violet-900/50 text-violet-400" },
          { label: "Phase 1 starts Mon", color: "bg-emerald-900/50 text-emerald-400" },
        ].map(({ label, color }) => (
          <span
            key={label}
            className={clsx("text-[9px] font-semibold px-2 py-0.5 rounded-full", color)}
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-violet-100/60 via-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 left-1/4 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center space-y-6 mb-16">
          <Badge>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Now in public beta
          </Badge>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-600 leading-[1.05]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Turn goals into an
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-green-500 to-pink-500 bg-clip-text text-transparent">
              actionable plan
            </span>{" "}
            with AI.
          </h1>

          <p
            className="max-w-xl mx-auto text-lg text-zinc-500 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Describe any goal. AiVibeBoard breaks it into tasks, assigns your
            team, sets priorities, and keeps everything on track — automatically.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#"
              className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Start for free
            </a>
       
            <a
              href="#"
              className="px-6 py-3 rounded-xl bg-[#E8D5B7] border border-[#D4BC96] text-[#5C4A32] font-semibold text-sm hover:bg-[#DFC9A8] hover:border-[#C9AD88] transition-all flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#5C4A32" strokeWidth="1.5" />
                <path d="M6 5.5l5 2.5-5 2.5V5.5z" fill="#5C4A32" />
              </svg>
              Watch demo
            </a>
          </div>

          <p className="text-xs text-zinc-400" style={{ fontFamily: "Inter, sans-serif" }}>
            No credit card required · 14-day free trial
          </p>
        </div>

        {/* product preview */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="md:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-rose-300" />
                <div className="w-3 h-3 rounded-full bg-amber-300" />
                <div className="w-3 h-3 rounded-full bg-emerald-300" />
              </div>
              <span className="text-xs text-zinc-400 ml-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                developer-portal-q3
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {KANBAN_COLS.map((col) => (
                <div key={col.title} className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className={clsx("w-1.5 h-1.5 rounded-full", col.dot)} />
                    <span
                      className={clsx("text-[10px] font-semibold px-2 py-0.5 rounded-full", col.color)}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {col.title}
                    </span>
                  </div>
                  {col.cards.map((card) => (
                    <KanbanCard key={card.title} {...card} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <AIAssistantPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI task breakdown ───────────────────────────────────────────────────────

const BREAKDOWN_TASKS = [
  {
    id: "T-01",
    title: "Design API architecture",
    owner: { name: "Alex S.", initials: "AS", color: "from-violet-500 to-blue-400" },
    deadline: "Jun 10",
    priority: "P1",
    deps: [],
  },
  {
    id: "T-02",
    title: "Implement auth middleware",
    owner: { name: "Dana K.", initials: "DK", color: "from-emerald-500 to-teal-400" },
    deadline: "Jun 13",
    priority: "P1",
    deps: ["T-01"],
  },
  {
    id: "T-03",
    title: "Write OpenAPI spec",
    owner: { name: "Maria R.", initials: "MR", color: "from-rose-500 to-pink-400" },
    deadline: "Jun 14",
    priority: "P2",
    deps: ["T-01"],
  },
  {
    id: "T-04",
    title: "Build developer dashboard",
    owner: { name: "Ivan P.", initials: "IP", color: "from-amber-500 to-orange-400" },
    deadline: "Jun 18",
    priority: "P2",
    deps: ["T-02", "T-03"],
  },
  {
    id: "T-05",
    title: "Set up sandbox environment",
    owner: { name: "Alex S.", initials: "AS", color: "from-violet-500 to-blue-400" },
    deadline: "Jun 20",
    priority: "P3",
    deps: ["T-04"],
  },
];

function TaskRow({
  task,
  index,
}: {
  task: (typeof BREAKDOWN_TASKS)[number];
  index: number;
}) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 bg-white hover:border-violet-200 hover:shadow-sm transition-all group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span
        className="text-[10px] font-semibold text-zinc-400 w-10 shrink-0"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {task.id}
      </span>
      <p
        className="flex-1 text-sm font-medium text-zinc-800"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {task.title}
      </p>
      <div className="flex items-center gap-1.5 shrink-0">
        <div
          className={clsx(
            "w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center text-[9px] font-bold text-white shadow-sm",
            task.owner.color
          )}
        >
          {task.owner.initials}
        </div>
        <span className="text-xs text-zinc-500 hidden sm:block" style={{ fontFamily: "Inter, sans-serif" }}>
          {task.owner.name}
        </span>
      </div>
      <span
        className="text-xs text-zinc-400 shrink-0 hidden sm:block"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {task.deadline}
      </span>
      <span
        className={clsx(
          "text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0",
          task.priority === "P1"
            ? "bg-rose-50 text-rose-500"
            : task.priority === "P2"
            ? "bg-amber-50 text-amber-500"
            : "bg-zinc-100 text-zinc-400"
        )}
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {task.priority}
      </span>
      {task.deps.length > 0 && (
        <div className="flex gap-1 shrink-0 hidden sm:flex">
          {task.deps.map((d) => (
            <span
              key={d}
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-500"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              → {d}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function AIBreakdown() {
  const [animating, setAnimating] = useState(false);
  const [shown, setShown] = useState(2);

  function runBreakdown() {
    setShown(0);
    setAnimating(true);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setShown(i);
      if (i >= BREAKDOWN_TASKS.length) {
        clearInterval(iv);
        setAnimating(false);
      }
    }, 280);
  }

  return (
    <section className="py-24 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge>AI Task Breakdown</Badge>
              <h2
                className="text-4xl font-bold tracking-tight text-zinc-900"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                One big goal.
                <br />
                <span className="text-zinc-400">Zero guesswork.</span>
              </h2>
            </div>
            <p
              className="text-zinc-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Describe any initiative in plain language. AiVibeBoard maps it
              into a structured task graph: subtasks, owners, deadlines, and
              dependencies — ready to execute in seconds.
            </p>
            <ul className="space-y-3">
              {[
                "Understands project context and team roles",
                "Sets realistic deadlines based on complexity",
                "Maps task dependencies automatically",
                "Re-plans when blockers arise",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-zinc-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" className="fill-violet-100" />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* right */}
          <div className="space-y-3">
            {/* goal input */}
            <div className="bg-white rounded-xl border border-zinc-200 p-4 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p
                className="text-sm text-zinc-700 font-medium flex-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                "Launch a developer portal with sandbox environment by Q3"
              </p>
              <button
                onClick={runBreakdown}
                disabled={animating}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-50 shrink-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {animating ? "Planning…" : "Break down"}
              </button>
            </div>

            {/* arrow */}
            <div className="flex items-center justify-center gap-2 py-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-200" />
              <span
                className="text-xs text-violet-500 font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                AI → {BREAKDOWN_TASKS.length} tasks
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-200" />
            </div>

            {/* tasks */}
            <div className="space-y-2">
              {BREAKDOWN_TASKS.slice(0, shown).map((task, i) => (
                <TaskRow key={task.id} task={task} index={i} />
              ))}
              {shown === 0 && (
                <div className="text-center py-8 text-sm text-zinc-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  Click "Break down" to see AI in action
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── smart assignment ────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    name: "Alex Sorokin",
    role: "Backend Eng.",
    initials: "AS",
    color: "from-violet-500 to-blue-400",
    load: 78,
    tasks: ["Design API arch.", "Sandbox setup"],
    skill: "Node.js, PostgreSQL",
  },
  {
    name: "Dana Kim",
    role: "Full-stack Eng.",
    initials: "DK",
    color: "from-emerald-500 to-teal-400",
    load: 55,
    tasks: ["Auth middleware"],
    skill: "React, Next.js",
  },
  {
    name: "Maria Ruiz",
    role: "Tech Writer",
    initials: "MR",
    color: "from-rose-500 to-pink-400",
    load: 40,
    tasks: ["OpenAPI spec"],
    skill: "Docs, Swagger",
  },
  {
    name: "Ivan Petrov",
    role: "Frontend Eng.",
    initials: "IP",
    color: "from-amber-500 to-orange-400",
    load: 62,
    tasks: ["Dev dashboard"],
    skill: "React, TypeScript",
  },
];

function MemberCard({ member }: { member: (typeof TEAM_MEMBERS)[number] }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-4 hover:shadow-md hover:border-violet-200 transition-all">
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-sm font-bold text-white shadow",
            member.color
          )}
        >
          {member.initials}
        </div>
        <div>
          <p
            className="text-sm font-semibold text-zinc-900"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {member.name}
          </p>
          <p
            className="text-xs text-zinc-400"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {member.role}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p
            className={clsx(
              "text-sm font-bold",
              member.load > 70
                ? "text-rose-500"
                : member.load > 50
                ? "text-amber-500"
                : "text-emerald-500"
            )}
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {member.load}%
          </p>
          <p className="text-[10px] text-zinc-400" style={{ fontFamily: "Inter, sans-serif" }}>
            load
          </p>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-zinc-100">
        <div
          className={clsx(
            "h-1.5 rounded-full transition-all duration-700",
            member.load > 70
              ? "bg-gradient-to-r from-rose-500 to-rose-400"
              : member.load > 50
              ? "bg-gradient-to-r from-amber-500 to-amber-400"
              : "bg-gradient-to-r from-emerald-500 to-emerald-400"
          )}
          style={{ width: `${member.load}%` }}
        />
      </div>

      <div className="space-y-1.5">
        {member.tasks.map((t) => (
          <div
            key={t}
            className="flex items-center gap-2 text-xs text-zinc-600 bg-zinc-50 rounded-lg px-3 py-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            {t}
          </div>
        ))}
      </div>

      <div
        className="text-[10px] text-zinc-400 font-medium"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {member.skill}
      </div>
    </div>
  );
}

function SmartAssignment() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-14">
          <Badge>Smart Assignment</Badge>
          <h2
            className="text-4xl font-bold tracking-tight text-zinc-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Right person, right task.
            <br />
            <span className="text-zinc-400">Every time.</span>
          </h2>
          <p
            className="max-w-lg mx-auto text-zinc-500"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            AI matches tasks to team members based on skills, current workload,
            and availability — so nobody burns out and nothing falls through the
            cracks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_MEMBERS.map((m) => (
            <MemberCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── roadmap ─────────────────────────────────────────────────────────────────

const PHASES = [
  {
    phase: "Phase 1",
    label: "Foundation",
    start: 0,
    width: 30,
    color: "bg-violet-500",
    tasks: ["API arch", "Auth"],
  },
  {
    phase: "Phase 2",
    label: "Core Product",
    start: 28,
    width: 38,
    color: "bg-blue-500",
    tasks: ["OpenAPI spec", "Dev dashboard"],
  },
  {
    phase: "Phase 3",
    label: "Launch",
    start: 64,
    width: 36,
    color: "bg-emerald-500",
    tasks: ["Sandbox", "QA", "Go-live"],
  },
];

function Roadmap() {
  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Badge>Auto Roadmap</Badge>
            <h2
              className="text-4xl font-bold tracking-tight text-white"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Timeline built
              <br />
              <span className="text-zinc-400">by the AI.</span>
            </h2>
            <p
              className="text-zinc-400 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              AiVibeBoard generates a Gantt-style timeline from your tasks and
              dependencies — and re-balances it automatically when something
              slips.
            </p>
            <ul className="space-y-3">
              {[
                "Critical path detection",
                "Dependency-aware scheduling",
                "Auto-reschedule on delays",
                "Milestone tracking",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-zinc-300"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="rgba(124,58,237,0.2)" />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="#A78BFA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* gantt */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-4 shadow-2xl">
            {/* week headers */}
            <div className="flex gap-px">
              <div className="w-20 shrink-0" />
              <div className="flex-1 grid grid-cols-4 text-center">
                {["Week 1–2", "Week 3–4", "Week 5–6", "Week 7–8"].map((w) => (
                  <span
                    key={w}
                    className="text-[10px] text-zinc-500 pb-2 border-b border-zinc-800"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {PHASES.map((phase) => (
              <div key={phase.phase} className="flex items-center gap-3">
                <div className="w-20 shrink-0 space-y-0.5">
                  <p
                    className="text-[10px] font-semibold text-zinc-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {phase.phase}
                  </p>
                  <p
                    className="text-[9px] text-zinc-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {phase.label}
                  </p>
                </div>
                <div className="flex-1 relative h-7 bg-zinc-800/50 rounded-lg overflow-hidden">
                  <div
                    className={clsx(
                      "absolute top-0 h-full rounded-lg flex items-center px-2.5 gap-2",
                      phase.color
                    )}
                    style={{
                      left: `${phase.start}%`,
                      width: `${phase.width}%`,
                      opacity: 0.9,
                    }}
                  >
                    {phase.tasks.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-semibold text-white/90 truncate"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* milestones */}
            <div className="pt-2 border-t border-zinc-800 flex items-center gap-4 flex-wrap">
              {[
                { label: "Alpha release", week: "W4", color: "text-violet-400" },
                { label: "Beta launch", week: "W6", color: "text-blue-400" },
                { label: "Public go-live", week: "W8", color: "text-emerald-400" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-current" />
                  <span
                    className={clsx("text-[10px] font-semibold", m.color)}
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {m.week}
                  </span>
                  <span
                    className="text-[10px] text-zinc-500"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── telegram integration ────────────────────────────────────────────────────

function TelegramSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* chat mockup */}
          <div className="bg-[#17212B] rounded-2xl p-5 space-y-3 shadow-2xl max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  AiVibeBoard Bot
                </p>
                <p className="text-[10px] text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
                  online
                </p>
              </div>
            </div>

            {/* messages */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2B5278] rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]">
                  <p className="text-sm text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                    Создай Максу задачу подключить Stripe до пятницы
                  </p>
                  <p className="text-[10px] text-white/40 text-right mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    14:32 ✓✓
                  </p>
                </div>
              </div>

              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  A
                </div>
                <div className="bg-[#232E3C] rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[80%] space-y-2">
                  <p className="text-sm text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
                    ✅ Task created on the board:
                  </p>
                  <div className="bg-white/5 rounded-lg p-2 space-y-1">
                    <p className="text-xs font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                      Connect Stripe payments
                    </p>
                    <div className="flex gap-2 text-[10px] text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
                      <span>👤 Max R.</span>
                      <span>📅 Friday</span>
                      <span className="text-rose-400">🔴 P1</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/40 text-right" style={{ fontFamily: "Inter, sans-serif" }}>
                    14:32
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#2B5278] rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]">
                  <p className="text-sm text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                    Show me all overdue tasks
                  </p>
                  <p className="text-[10px] text-white/40 text-right mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    14:35 ✓✓
                  </p>
                </div>
              </div>

              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  A
                </div>
                <div className="bg-[#232E3C] rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[80%]">
                  <p className="text-sm text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
                    2 overdue tasks detected. I"ll notify the owners now.
                  </p>
                  <p className="text-[10px] text-white/40 text-right mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    14:35
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* text */}
          <div className="space-y-6">
            <Badge>Telegram Integration</Badge>
            <h2
              className="text-4xl font-bold tracking-tight text-zinc-900"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Manage the board
              <br />
              <span className="text-zinc-400">from your phone.</span>
            </h2>
            <p
              className="text-zinc-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No app switching. Send a message to the AiVibeBoard bot and tasks
              appear on the board in seconds — with the right assignee, deadline,
              and priority set automatically.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: "💬",
                  title: "Natural language",
                  desc: "Just describe what needs to happen",
                },
                {
                  icon: "⚡",
                  title: "Instant sync",
                  desc: "Task appears on the board in < 2 seconds",
                },
                {
                  icon: "🔔",
                  title: "Smart alerts",
                  desc: "Get notified only when action is needed",
                },
                {
                  icon: "🌍",
                  title: "Any language",
                  desc: "Write in English, Russian, Spanish…",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-zinc-100 bg-white p-4 space-y-1 shadow-sm"
                >
                  <div className="text-lg">{item.icon}</div>
                  <p
                    className="text-sm font-semibold text-zinc-800"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs text-zinc-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── overdue alerts ──────────────────────────────────────────────────────────

function OverdueAlerts() {
  return (
    <section className="py-24 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Badge>Overdue Alerts</Badge>
            <h2
              className="text-4xl font-bold tracking-tight text-zinc-900"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Know before
              <br />
              <span className="text-zinc-400">it becomes a crisis.</span>
            </h2>
            <p
              className="text-zinc-500 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              When a task slips, managers get an AI-written Telegram summary with
              full context: who, what, how late, how many overdue tasks they have,
              their current load, and what they"re blocking.
            </p>
          </div>

          {/* alert card */}
          <div className="space-y-3 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-white rounded-2xl border border-rose-100 shadow-lg p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L1 13h14L8 1z"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6v3M8 11v.5"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-zinc-900"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Overdue Alert · AI Summary
                  </p>
                  <p
                    className="text-xs text-zinc-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    just now · via Telegram
                  </p>
                </div>
              </div>

              <div
                className="text-sm text-zinc-700 leading-relaxed bg-rose-50/50 rounded-xl p-3.5 border border-rose-100"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="font-semibold text-rose-600">Max Rykov</span> has missed
                the deadline for{" "}
                <span className="font-semibold">"Connect Stripe payments"</span> by{" "}
                <span className="font-semibold text-rose-600">2 days</span>. This is his{" "}
                <span className="font-semibold">3rd overdue task</span> this month.
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Load", value: "94%", alert: true },
                  { label: "Overdue", value: "3", alert: true },
                  { label: "Blocking", value: "2 tasks", alert: false },
                ].map(({ label, value, alert }) => (
                  <div
                    key={label}
                    className={clsx(
                      "rounded-lg p-2.5 text-center",
                      alert ? "bg-rose-50" : "bg-zinc-50"
                    )}
                  >
                    <p
                      className={clsx(
                        "text-sm font-bold",
                        alert ? "text-rose-600" : "text-zinc-700"
                      )}
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {value}
                    </p>
                    <p
                      className="text-[10px] text-zinc-400 mt-0.5"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 text-xs font-semibold py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Reassign task
                </button>
                <button
                  className="flex-1 text-xs font-semibold py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Message Max
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── dashboard ───────────────────────────────────────────────────────────────

const DASHBOARD_METRICS = [
  { label: "Active tasks", value: "47", change: "+3 today", up: true },
  { label: "Overdue", value: "3", change: "↓ 2 from last week", up: false },
  { label: "At risk", value: "5", change: "2 critical", up: false },
  { label: "Done this week", value: "18", change: "+40% vs last week", up: true },
];

const AI_RECS = [
  { type: "risk", text: "Phase 2 may slip 3 days if Stripe task isn't unblocked by tomorrow." },
  { type: "balance", text: "Alex is overloaded (94%). Move 2 tasks to Dana who has capacity." },
  { type: "insight", text: "Backend tasks consistently run 20% over estimate. Adjust future planning." },
];

function Dashboard() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-14">
          <Badge>Management Dashboard</Badge>
          <h2
            className="text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Full visibility.
            <br />
            <span className="text-zinc-400">Zero surprises.</span>
          </h2>
          <p
            className="max-w-lg mx-auto text-zinc-400"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            One place to see workload, overdue tasks, blockers, project risks,
            and AI recommendations — so you can act before things go wrong.
          </p>
        </div>

        {/* metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {DASHBOARD_METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-1 hover:border-violet-800/60 transition-colors"
            >
              <p
                className="text-xs text-zinc-500"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {m.label}
              </p>
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {m.value}
              </p>
              <p
                className={clsx(
                  "text-xs font-medium",
                  m.up ? "text-emerald-400" : "text-rose-400"
                )}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {m.change}
              </p>
            </div>
          ))}
        </div>

        {/* ai recommendations */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M5 1v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className="text-sm font-semibold text-zinc-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              AI Recommendations
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {AI_RECS.map((rec, i) => (
              <div
                key={i}
                className={clsx(
                  "rounded-xl p-4 border text-sm leading-relaxed",
                  rec.type === "risk"
                    ? "bg-rose-900/20 border-rose-800/40 text-rose-300"
                    : rec.type === "balance"
                    ? "bg-amber-900/20 border-amber-800/40 text-amber-300"
                    : "bg-violet-900/20 border-violet-800/40 text-violet-300"
                )}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="font-semibold block mb-1">
                  {rec.type === "risk" ? "⚠ Risk" : rec.type === "balance" ? "⚖ Balance" : "💡 Insight"}
                </span>
                {rec.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── social proof ────────────────────────────────────────────────────────────

const QUOTES = [
  {
    quote: "We cut our weekly planning meeting from 90 minutes to zero. AiVibeBoard just handles it.",
    name: "Elena Kowalski",
    role: "CTO, Fenix Labs",
    initials: "EK",
    color: "from-violet-500 to-blue-400",
  },
  {
    quote: "The Telegram bot alone saves me 30 minutes every day. It's the fastest task creation I've ever used.",
    name: "David Chen",
    role: "Eng. Manager, Orbit",
    initials: "DC",
    color: "from-emerald-500 to-teal-400",
  },
  {
    quote: "Finally a tool that tells me about problems before they become disasters. The overdue alerts are gold.",
    name: "Sara Müller",
    role: "PM, Stackfield",
    initials: "SM",
    color: "from-rose-500 to-pink-400",
  },
];

function Quotes() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p
            className="text-zinc-400 text-sm font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Trusted by engineering teams at
          </p>
          <div className="flex items-center justify-center gap-8 mt-4 flex-wrap">
            {["Fenix Labs", "Orbit", "Stackfield", "Codewave", "Devcraft"].map((co) => (
              <span
                key={co}
                className="text-zinc-300 font-semibold text-sm"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {co}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map((q) => (
            <div
              key={q.name}
              className="bg-white border border-zinc-100 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md hover:border-violet-200 transition-all"
            >
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M0 16V10C0 4 3.33 1 10 0l1 2C7 3 5.33 5 5 8h4v8H0zm11 0V10C11 4 14.33 1 21 0l1 2C18 3 16.33 5 16 8h4v8h-9z" fill="#EDE9FE" />
              </svg>
              <p
                className="text-sm text-zinc-600 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {q.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white",
                    q.color
                  )}
                >
                  {q.initials}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold text-zinc-800"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {q.name}
                  </p>
                  <p
                    className="text-xs text-zinc-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {q.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── final CTA ───────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-blue-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-6 text-center relative space-y-8">
        <h2
          className="text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Stop managing tasks.
          <br />
          <span className="text-violet-200">Start managing outcomes.</span>
        </h2>
        <p
          className="text-lg text-violet-200/80 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Join 500+ engineering teams who replaced their planning chaos with
          AI-powered clarity. No setup required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="px-8 py-4 rounded-xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Start for free — no card needed
          </a>
          <a
            href="#"
            className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Talk to sales
          </a>
        </div>
        <p
          className="text-xs text-violet-300/60"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          14-day free trial · No credit card · Cancel anytime
        </p>
      </div>
    </section>
  );
}

// ─── footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 4h4M2 7h6M2 10h3M9 6l3 1-3 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className="font-bold text-zinc-800"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              AiVibeBoard
            </span>
          </div>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Status", "Blog", "Changelog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
          <p
            className="text-xs text-zinc-400"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2026 AiVibeBoard
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <Nav />
      <main>
        <Hero />
        <AIBreakdown />
        <SmartAssignment />
        <Roadmap />
        <TelegramSection />
        <OverdueAlerts />
        <Dashboard />
        <Quotes />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
