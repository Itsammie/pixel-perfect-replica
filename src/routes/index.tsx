import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Award, Bot, Flame, Lightbulb, RefreshCw, Send, Target, User } from "lucide-react";
import { DOMAINS, TIPS, getTutorReply, type Msg } from "@/lib/tutor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElimuCloud — Localized AZ-900 AI Study Buddy" },
      { name: "description", content: "Learn Azure AZ-900 with matatu, M-Pesa and market analogies. Unofficial study tool." },
      { property: "og:title", content: "ElimuCloud — Localized AZ-900 AI Study Buddy" },
      { property: "og:description", content: "Learn Azure AZ-900 with relatable African analogies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function renderText(t: string) {
  return t.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") ? <strong key={j} className="text-primary">{p.slice(2, -2)}</strong> : p,
    );
    if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc">{parts.slice(0).map((x, k) => (typeof x === "string" && k === 0 ? x.slice(2) : x))}</li>;
    return line ? <p key={i}>{parts}</p> : <div key={i} className="h-2" />;
  });
}

function Index() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "w", role: "assistant", text: "Karibu! 👋 I'm your **Local Analogy Tutor**. Ask me any AZ-900 concept and I'll explain it with matatus, M-Pesa and markets." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sheng, setSheng] = useState(true);
  const [tip, setTip] = useState(0);
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "assistant", text: getTutorReply(q, sheng) }]);
      setMastered((s) => new Set(s).add(q.toLowerCase()));
      setTyping(false);
      inputRef.current?.focus();
    }, 900 + Math.random() * 600);
  };

  const readiness = Math.min(100, 12 + mastered.size * 8);
  const stats = [
    { icon: Award, label: "Concepts Mastered", value: mastered.size },
    { icon: Flame, label: "Daily Streak", value: "3 days" },
    { icon: Target, label: "Exam Readiness", value: `${readiness}%` },
  ];

  return (
    <div className="min-h-screen bg-background bg-hero font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">ElimuCloud ☁️</h1>
            <p className="text-sm text-muted-foreground">Unofficial AZ-900 Localized AI Tutor</p>
          </div>
          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            AZ-900 Exam Prep Edition #1MillionDevs
          </span>
        </header>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card/70 p-3 backdrop-blur">
              <s.icon className="h-4 w-4 text-accent" />
              <div className="mt-1 font-display text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="flex h-[70vh] flex-col rounded-2xl border border-border bg-card shadow-glow">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2 font-display font-semibold">
                <Bot className="h-5 w-5 text-primary" /> The Local Analogy Tutor
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                Sheng flair 🇰🇪
                <button
                  role="switch"
                  aria-checked={sheng}
                  onClick={() => setSheng((v) => !v)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${sheng ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-all ${sheng ? "left-4" : "left-0.5"}`} />
                </button>
              </label>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {msgs.map((m) => (
                <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "assistant" && <Bot className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary/15 p-1 text-primary" />}
                  <div
                    className={`max-w-[85%] space-y-1 text-sm leading-relaxed ${
                      m.role === "user" ? "rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground" : ""
                    }`}
                  >
                    {m.role === "user" ? m.text : renderText(m.text)}
                  </div>
                  {m.role === "user" && <User className="mt-1 h-6 w-6 shrink-0 rounded-full bg-secondary p-1" />}
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 rounded-full bg-primary/15 p-1 text-primary" />
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                {DOMAINS.map((d) => (
                  <button
                    key={d.label}
                    onClick={() => send(d.prompt)}
                    className="shrink-0 rounded-full border border-border bg-secondary px-3 py-1 text-xs transition hover:border-primary hover:text-primary"
                  >
                    {d.emoji} {d.label}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. What is a Region Pair?"
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ring"
                />
                <button disabled={!input.trim() || typing} className="rounded-xl bg-primary px-4 text-primary-foreground transition hover:opacity-90 disabled:opacity-40" aria-label="Send">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-accent/40 bg-card p-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display font-semibold"><Lightbulb className="h-4 w-4 text-accent" /> Exam Tip</h2>
                <button onClick={() => setTip((t) => (t + 1) % TIPS.length)} className="rounded-lg p-1 text-muted-foreground hover:text-accent" aria-label="Next tip">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-3 font-semibold text-accent">⚠️ {TIPS[tip].title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{TIPS[tip].body}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <h2 className="font-display font-semibold">All traps to watch</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {TIPS.map((t, i) => (
                  <li key={t.title}>
                    <button onClick={() => setTip(i)} className={`text-left hover:text-primary ${i === tip ? "text-primary" : "text-muted-foreground"}`}>
                      • {t.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <footer className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Disclaimer: ElimuCloud is an independent, unofficial study tool built for the #1Million Devs Movement and is not affiliated with Microsoft.
        </footer>
      </div>
    </div>
  );
}
