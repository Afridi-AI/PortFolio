import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Mail,
  Menu,
  Network,
  Phone,
  Send,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { contactFeedback } from "@shared/contact";
import { portfolio as fallbackPortfolio } from "@shared/portfolio";
import { trpc } from "@/lib/trpc";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const neuralNodes = [
  { x: "16%", y: "24%", size: "h-2.5 w-2.5", delay: 0.1 },
  { x: "40%", y: "16%", size: "h-3.5 w-3.5", delay: 0.6 },
  { x: "68%", y: "30%", size: "h-2 w-2", delay: 0.3 },
  { x: "84%", y: "55%", size: "h-3 w-3", delay: 0.9 },
  { x: "54%", y: "72%", size: "h-2.5 w-2.5", delay: 0.4 },
  { x: "20%", y: "80%", size: "h-2 w-2", delay: 1.1 },
];

function SectionHeading({ number, eyebrow, title, copy }: { number: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
        <span className="font-mono text-cyan-400/70">{number}</span>
        <span className="h-px w-8 bg-cyan-400/55" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{copy}</p> : null}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.48, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function NeuralGraphic() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[490px] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#070c18]/60 shadow-[0_0_120px_-35px_rgba(34,211,238,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_72%_22%,rgba(168,85,247,0.14),transparent_28%)]" />
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
        <path d="M16 24L40 16L68 30L84 55L54 72L20 80L16 24Z" stroke="rgba(103,232,249,.33)" strokeWidth="0.38" />
        <path d="M16 24L54 72M40 16L84 55M68 30L20 80M16 24L68 30M40 16L54 72" stroke="rgba(168,85,247,.22)" strokeWidth="0.27" />
        <path d="M16 24L40 16L68 30" stroke="rgba(103,232,249,.9)" strokeWidth="0.55" strokeDasharray="2 3" className="neural-path" />
      </svg>
      {neuralNodes.map((node, index) => (
        <motion.span
          key={`${node.x}-${node.y}`}
          className={`absolute rounded-full bg-cyan-200 shadow-[0_0_18px_4px_rgba(34,211,238,.32)] ${node.size}`}
          style={{ left: node.x, top: node.y }}
          animate={shouldReduceMotion ? undefined : { y: [0, index % 2 ? -8 : 8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.2 + index * 0.35, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-x-8 bottom-8 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span>Signal map</span>
        <span className="flex items-center gap-2 text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Active</span>
      </div>
    </div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { data: remotePortfolio, isLoading } = trpc.portfolio.get.useQuery(undefined, { staleTime: Infinity });
  const data = remotePortfolio ?? fallbackPortfolio;
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setForm({ name: "", email: "", message: "" });
      setFormStatus("success");
      setFormMessage(contactFeedback.success);
    },
    onError: () => {
      setFormStatus("error");
      setFormMessage(contactFeedback.error);
    },
  });

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
      .map((element) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) setActiveSection(entry.target.id);
          },
          { rootMargin: "-32% 0px -58% 0px", threshold: 0 },
        );
        observer.observe(element);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sectionIds]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
    setMenuOpen(false);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("idle");
    setFormMessage("");
    contactMutation.mutate(form);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070a12] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_74%_12%,rgba(8,145,178,.12),transparent_27%),radial-gradient(circle_at_15%_35%,rgba(126,34,206,.10),transparent_24%)]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-[0.075] [background-image:linear-gradient(rgba(103,232,249,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.72)_1px,transparent_1px)] [background-size:42px_42px]" />

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#070a12]/78 backdrop-blur-xl">
        <div className="container flex h-[74px] items-center justify-between">
          <button onClick={() => scrollTo("top")} className="group flex items-center gap-3 text-left" aria-label="Back to top">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 font-mono text-xs font-bold text-cyan-200 transition-colors duration-200 group-hover:bg-cyan-300 group-hover:text-slate-950">IA</span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-white sm:block">Ikram Afridi</span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${activeSection === item.id ? "bg-cyan-300/10 text-cyan-200" : "text-slate-400 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={data.cvUrl} download className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 sm:flex">
              <Download className="h-3.5 w-3.5" /> CV
            </a>
            <button onClick={() => setMenuOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-200 lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-white/[0.07] bg-[#090d18] px-4 py-3 lg:hidden">
            <nav className="container grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="rounded-md px-3 py-3 text-left text-sm text-slate-300 hover:bg-white/[0.05] hover:text-white">
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main id="top" className="relative z-10">
        <section className="container grid min-h-[calc(100svh-74px)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}>
            <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />
              CV-grounded technical portfolio
            </div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{data.profile.location} · {data.profile.shortTitle}</p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
              {data.profile.name.split(" ").slice(0, 2).join(" ")}<br />
              <span className="text-cyan-300">{data.profile.name.split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">{data.profile.tagline}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={data.cvUrl} download className="group inline-flex items-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition-transform duration-200 hover:bg-cyan-200 active:scale-[0.97]">
                Download CV <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
              <button onClick={() => scrollTo("contact")} className="group inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08] active:scale-[0.97]">
                Start a conversation <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-400">
              <span><span className="font-mono text-cyan-300">01</span> AI-related work</span>
              <span><span className="font-mono text-cyan-300">02</span> Cloud community leadership</span>
              <span><span className="font-mono text-cyan-300">03</span> Network infrastructure</span>
            </div>
          </motion.div>
          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}>
            <NeuralGraphic />
          </motion.div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-white/[0.07] bg-white/[0.018] py-24 sm:py-32">
          <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal><SectionHeading number="01" eyebrow="Profile" title="From systems engineering to intelligent systems." /></Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-2xl text-xl leading-9 text-slate-200 sm:text-2xl">{data.profile.summary}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0b101c]/80 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Academic focus</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">Computer Systems Engineering at MUST, AJK</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0b101c]/80 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Working languages</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">{data.profile.languages.join(" · ")}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${data.profile.email}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"><Mail className="h-4 w-4" /> Email</a>
                <a href={`tel:${data.profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"><Phone className="h-4 w-4" /> Call</a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="container scroll-mt-24 py-24 sm:py-32">
          <Reveal><SectionHeading number="02" eyebrow="Technical map" title="A foundation designed for practical systems." copy="Skills are grouped from the tools, technologies, and areas of exposure documented in the CV—without percentage claims or unsupported proficiency levels." /></Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {data.skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05}>
                <article className="group h-full rounded-2xl border border-white/[0.09] bg-[#0b101c]/75 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#0d1424]">
                  <div className="flex items-center justify-between gap-5">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-white">{group.title}</h3>
                    <Code2 className="h-5 w-5 text-cyan-300/70" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{group.detail}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => <span key={skill} className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 font-mono text-[11px] text-slate-200">{skill}</span>)}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-24 border-y border-white/[0.07] bg-[#080d18] py-24 sm:py-32">
          <div className="container">
            <Reveal><SectionHeading number="03" eyebrow="Selected work" title="Applied experience, not invented case studies." copy="The CV does not list publicly titled software projects or repository links. This section therefore presents the documented applied experiences without representing them as independent published products." /></Reveal>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {data.featuredWork.map((work, index) => (
                <Reveal key={work.index} delay={index * 0.06}>
                  <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c1220] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300/35">
                    <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[4rem] bg-cyan-300/[0.055]" />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="font-mono text-xs text-cyan-300">{work.index}</span>
                      <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-200">{work.signal}</span>
                    </div>
                    <h3 className="relative mt-10 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">{work.name}</h3>
                    <p className="relative mt-2 text-xs font-medium text-slate-400">{work.organization}</p>
                    <p className="relative mt-5 text-sm leading-6 text-slate-300">{work.description}</p>
                    <div className="relative mt-auto flex flex-wrap gap-2 pt-7">
                      {work.tags.map((tag) => <span key={tag} className="rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-slate-300">{tag}</span>)}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="container scroll-mt-24 py-24 sm:py-32">
          <Reveal><SectionHeading number="04" eyebrow="Experience" title="A record of learning by doing." /></Reveal>
          <div className="mt-14 max-w-5xl border-l border-cyan-300/25 pl-6 sm:pl-10">
            {data.experience.map((item, index) => (
              <Reveal key={`${item.organization}-${item.role}`} delay={index * 0.05} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-[#070a12] bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.45)] sm:-left-[47px]" />
                <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-10 last:border-b-0 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-white">{item.role}</h3><span className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">{item.type}</span></div>
                    <p className="mt-1.5 text-sm font-semibold text-cyan-200">{item.organization}</p>
                    <ul className="mt-6 space-y-3">
                      {item.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300"><ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan-300" />{highlight}</li>)}
                    </ul>
                  </div>
                  <p className="shrink-0 font-mono text-xs text-slate-500">{item.dates}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="education" className="scroll-mt-24 border-y border-white/[0.07] bg-white/[0.018] py-24 sm:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal><SectionHeading number="05" eyebrow="Education" title="Engineering fundamentals, continually applied." /></Reveal>
            <div className="space-y-4">
              {data.education.map((item, index) => (
                <Reveal key={item.degree} delay={index * 0.06}>
                  <article className="rounded-2xl border border-white/[0.1] bg-[#0b101c]/75 p-6 sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div><h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-white">{item.degree}</h3><p className="mt-2 text-sm font-semibold text-cyan-200">{item.institution}</p><p className="mt-4 text-sm text-slate-400">{item.detail}</p></div>
                      <span className="font-mono text-xs text-slate-500">{item.dates}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="credentials" className="container scroll-mt-24 py-24 sm:py-32">
          <Reveal><SectionHeading number="06" eyebrow="Credentials" title="Continuous learning, independently validated." copy="Certificates and recognition listed in the CV, presented without adding unlisted credential URLs. No research papers or publications are listed in the available CV." /></Reveal>
          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {data.certifications.map((credential, index) => (
              <Reveal key={credential} delay={index * 0.035}>
                <div className="flex h-full items-start gap-4 rounded-xl border border-white/[0.08] bg-[#0b101c]/60 p-5 transition-colors duration-200 hover:border-cyan-300/25 hover:bg-[#0d1424]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <p className="text-sm leading-6 text-slate-200">{credential}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-white/[0.07] bg-[#080d18] py-24 sm:py-32">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading number="07" eyebrow="Contact" title="Let’s make the next technical conversation useful." copy="For AI, cloud-community, and systems-oriented opportunities, use the form or contact Ikram directly." />
              <div className="mt-9 space-y-4">
                <a href={`mailto:${data.profile.email}`} className="group flex items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.025] p-4 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200"><Mail className="h-4 w-4" /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Email</span><span className="mt-1 block text-sm font-semibold text-white">{data.profile.email}</span></span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                </a>
                <a href={`tel:${data.profile.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.025] p-4 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200"><Phone className="h-4 w-4" /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Phone</span><span className="mt-1 block text-sm font-semibold text-white">{data.profile.phone}</span></span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <form onSubmit={submitContact} className="rounded-2xl border border-white/[0.1] bg-[#0b101c] p-6 shadow-[0_24px_80px_-45px_rgba(34,211,238,.22)] sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-300">Name</span><input required minLength={2} maxLength={80} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15" placeholder="Your name" /></label>
                  <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-300">Email</span><input required type="email" maxLength={320} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15" placeholder="you@example.com" /></label>
                </div>
                <label className="mt-5 block"><span className="mb-2 block text-xs font-semibold text-slate-300">Message</span><textarea required minLength={10} maxLength={2000} rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15" placeholder="Tell me about the opportunity or project you have in mind." /></label>
                {formStatus !== "idle" ? <p role="status" className={`mt-4 text-sm ${formStatus === "success" ? "text-cyan-200" : "text-rose-300"}`}>{formMessage}</p> : null}
                <button disabled={contactMutation.isPending} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3.5 text-sm font-bold text-slate-950 transition-all duration-200 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]">
                  {contactMutation.isPending ? "Sending message…" : "Send message"} <Send className="h-4 w-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.07] bg-[#070a12] py-7">
        <div className="container flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {data.profile.name}. Built around CV-verified information.</p>
          <a href={data.cvUrl} download className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-200">View CV <ExternalLink className="h-3 w-3" /></a>
        </div>
      </footer>
      {isLoading ? <div className="sr-only" role="status">Loading portfolio content</div> : null}
    </div>
  );
}
