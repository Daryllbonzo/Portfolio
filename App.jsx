import { useEffect, useState } from "react";
import "./app.css";

const services = [
  { label: "Inbox control", title: "Email and inbox management", desc: "I organize messages, priorities, and follow-ups so important conversations do not get buried.", bullets: ["Priority filtering", "Reply drafting", "Follow-up reminders"], bars: [92, 86, 80] },
  { label: "Calendar support", title: "Calendar scheduling and follow-ups", desc: "I keep appointments, reminders, and schedule changes organized so your day runs cleaner.", bullets: ["Time-block setup", "Meeting reminders", "Schedule updates"], bars: [88, 83, 79] },
  { label: "Data accuracy", title: "Data entry and spreadsheet organization", desc: "I keep tracking sheets clear, structured, and accurate for easier reporting and decisions.", bullets: ["Clean data entry", "Sheet organization", "Consistent formatting"], bars: [94, 89, 84] },
  { label: "Research support", title: "Online research and lead generation", desc: "I gather useful information and turn it into clear summaries, lists, and lead inputs.", bullets: ["Lead sourcing", "Research summaries", "Actionable findings"], bars: [85, 82, 78] },
  { label: "Reporting", title: "Document formatting and report creation", desc: "I create polished documents and reports that are easier to scan, review, and share.", bullets: ["Report cleanup", "Document layout", "Readable summaries"], bars: [90, 84, 81] },
  { label: "Daily operations", title: "Admin support for busy founders and teams", desc: "I handle repeatable admin work so clients can focus on growth, strategy, and relationships.", bullets: ["Task tracking", "Routine admin support", "Consistent execution"], bars: [91, 86, 82] },
];

const strengths = [
  { title: "Fast learner", text: "I adapt quickly to new tools, systems, and workflows." },
  { title: "Attention to detail", text: "My research and data background helps me stay accurate." },
  { title: "Organized and reliable", text: "I keep work structured, clear, and easy to track." },
  { title: "Consistent execution", text: "I can handle repetitive admin tasks with focus and care." },
];

const workflow = [
  { step: "01", title: "Organize requests", text: "Messages, schedules, files, and tasks are sorted by priority." },
  { step: "02", title: "Handle recurring work", text: "Admin tasks move through a clean repeatable routine." },
  { step: "03", title: "Track the details", text: "Sheets, notes, and reports stay structured and visible." },
  { step: "04", title: "Keep things moving", text: "Clients get more time for strategy and growth." },
];

const tools = ["Google Sheets", "Excel", "Google Calendar", "Zoom", "Slack", "Notion", "Canva", "Google Docs", "Gmail"];

const results = [
  { title: "Lead Tracking Cleanup", stat: "+38% faster follow-ups", text: "Removed duplicate entries and built a clearer lead view.", level: "88%" },
  { title: "Inbox Workflow Setup", stat: "Less missed messages", text: "Created priority labels and follow-up reminders for better response handling.", level: "82%" },
  { title: "Research Summary Dashboard", stat: "Clearer decisions", text: "Turned scattered notes into one summary view for easier action.", level: "91%" },
];

const socials = [
  { label: "WhatsApp", short: "WA", href: "https://wa.me/639241232790", note: "Quickest way to start a client conversation." },
  { label: "LinkedIn", short: "LI", href: "https://ph.linkedin.com/in/daryll-bonzo-02a0632b0", note: "Professional background and availability." },
  { label: "Facebook", short: "FB", href: "https://www.facebook.com/daryll.l.bonzo", note: "Alternate direct message channel." },
];

function CursorGlow() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, hidden: true, down: false });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    let frame = 0;
    const next = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const paint = () => {
      setCursor((current) => ({ ...current, x: next.x, y: next.y, hidden: false }));
      frame = 0;
    };
    const move = (event) => {
      next.x = event.clientX;
      next.y = event.clientY;
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const leave = () => setCursor((current) => ({ ...current, hidden: true, down: false }));
    const down = () => setCursor((current) => ({ ...current, down: true, hidden: false }));
    const up = () => setCursor((current) => ({ ...current, down: false }));
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const style = { "--cursor-x": `${cursor.x}px`, "--cursor-y": `${cursor.y}px` };
  return (
    <>
      <div className={`cursor-ring${cursor.hidden ? " is-hidden" : ""}${cursor.down ? " is-down" : ""}`} style={style} />
      <div className={`cursor-core${cursor.hidden ? " is-hidden" : ""}${cursor.down ? " is-down" : ""}`} style={style} />
    </>
  );
}

function LinkButton({ href, className = "", children }) {
  const [ripples, setRipples] = useState([]);
  const external = href && !href.startsWith("#") && !href.startsWith("/");
  const onClick = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    const size = Math.max(box.width, box.height);
    const item = { id: `${Date.now()}-${Math.random()}`, x: event.clientX - box.left - size / 2, y: event.clientY - box.top - size / 2, size };
    setRipples((current) => [...current, item]);
    window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== item.id)), 650);
  };

  return (
    <a className={`button ${className}`.trim()} href={href} onClick={onClick} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>
      <span>{children}</span>
      {ripples.map((ripple) => <i className="ripple" key={ripple.id} style={{ width: ripple.size, height: ripple.size, left: ripple.x, top: ripple.y }} />)}
    </a>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(window.scrollY / max);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.18, rootMargin: "0px 0px -64px 0px" });
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  const current = services[active];

  return (
    <>
      <CursorGlow />
      <div className="shell">
        <div className="progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="bg-grid" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />

        <header className="header">
          <div className="wrap">
            <a className="brand" href="#top"><b>DB</b><span><strong>Daryll John L. Bonzo</strong><small>General Virtual Assistant</small></span></a>
            <nav className="nav"><a href="#services">Services</a><a href="#strengths">Strengths</a><a href="#tools">Tools</a><a href="#connect">Connect</a></nav>
            <LinkButton className="primary compact" href="https://wa.me/639241232790">Start a conversation</LinkButton>
          </div>
        </header>

        <aside className="dock">{socials.map((item) => <a aria-label={item.label} href={item.href} key={item.label} rel="noreferrer" target="_blank"><span>{item.short}</span><small>{item.label}</small></a>)}</aside>

        <main className="page" id="top">
          <section className="hero is-visible" data-reveal>
            <div className="copy">
              <div className="badges"><em>General Virtual Assistant</em><em className="warm">Available for remote support</em></div>
              <h1>Professional virtual support built for calm, organized client operations.</h1>
              <p>I help business owners stay organized, save time, and keep operations moving. From inbox and calendar support to research, spreadsheets, reports, and admin tasks, I provide reliable virtual assistance backed by a strong research and data-focused background.</p>
              <div className="actions"><LinkButton className="primary" href="https://wa.me/639241232790">Hire me on WhatsApp</LinkButton><LinkButton className="secondary" href="https://ph.linkedin.com/in/daryll-bonzo-02a0632b0">View LinkedIn</LinkButton></div>
              <div className="chips"><span>Fast learner</span><span>Highly organized</span><span>Research-driven</span><span>Detail-oriented</span></div>
              <div className="stats"><article><strong>Manila, Philippines</strong><p>Remote-ready support across admin, research, and reporting work.</p></article><article><strong>6 core support areas</strong><p>Focused on the repetitive work that keeps operations smooth.</p></article><article><strong>Client-friendly workflow</strong><p>Built around clarity, consistency, and reliable follow-through.</p></article></div>
            </div>

            <div className="panel">
              <span className="tag">Client Operations Board</span>
              <h2>Support flow aligned to General Virtual Assistant work.</h2>
              <div className="panel-grid">
                <article className="focus"><small>Selected service</small><h3>{current.title}</h3><p>{current.desc}</p>{current.bullets.map((item, index) => <div className="metric" key={item}><div><span>{item}</span><strong>{current.bars[index]}%</strong></div><i><b style={{ width: `${current.bars[index]}%` }} /></i></div>)}</article>
                <article className="mini"><small>Inbox and follow-ups</small><strong>Priority-based message handling</strong><p>Important requests stay visible instead of getting buried.</p></article>
                <article className="mini"><small>Scheduling rhythm</small><strong>Cleaner calendar coordination</strong><p>Appointments and reminders are managed with structure.</p></article>
                <article className="mini"><small>Research and reporting</small><strong>Clear summaries for better decisions</strong><p>Scattered information becomes output a client can act on.</p></article>
              </div>
            </div>
          </section>

          <section className="section" data-reveal id="services">
            <div className="heading"><small>Support Areas</small><h2>What I offer as a General Virtual Assistant</h2><p>My goal is to take repetitive, time-consuming work off your plate so you can focus on sales, strategy, client relationships, and growth.</p></div>
            <div className="services">
              <div className="service-grid">{services.map((item, index) => <button aria-pressed={active === index} className={`service-card${active === index ? " active" : ""}`} key={item.title} onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} type="button"><small>{item.label}</small><strong>{item.title}</strong><p>{item.desc}</p></button>)}</div>
              <div className="preview"><small>Selected service</small><h3>{current.title}</h3><p>{current.desc}</p><div className="preview-tags">{current.bullets.map((item) => <span key={item}>{item}</span>)}</div><LinkButton className="primary" href="https://wa.me/639241232790">Discuss this support area</LinkButton></div>
            </div>
          </section>

          <section className="section" data-reveal id="strengths">
            <div className="heading"><small>Why Work With Me</small><h2>Strong support habits already match the work great VAs do</h2><p>I may be transitioning into the role, but the skills behind strong VA work are already part of my experience: organization, research, data accuracy, reporting, communication, and quick adaptation.</p></div>
            <div className="insights">
              <div className="strength-grid">{strengths.map((item) => <article className="card" key={item.title}><small>{item.title}</small><p>{item.text}</p></article>)}</div>
              <div className="timeline">{workflow.map((item) => <div className="step" key={item.step}><b>{item.step}</b><div><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div>
            </div>
          </section>

          <section className="section" data-reveal id="tools">
            <div className="heading"><small>Tools and Workflow</small><h2>Comfortable with common remote support tools</h2><p>I am comfortable working with tools used in scheduling, communication, spreadsheets, task organization, documentation, and research.</p></div>
            <div className="tool-box">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            <div className="note">My previous role strengthened my ability to work with information-heavy tasks, organize data clearly, build reports, monitor details, and stay accurate under routine workflows. Those habits translate well into high-quality virtual assistance.</div>
            <div className="result-grid">{results.map((item) => <article className="card result" key={item.title}><small>{item.stat}</small><h3>{item.title}</h3><p>{item.text}</p><i><b style={{ width: item.level }} /></i></article>)}</div>
          </section>

          <section className="section contact" data-reveal id="connect">
            <div className="heading"><small>Let's Work Together</small><h2>If you need a reliable General Virtual Assistant, I am ready to help.</h2><p>If you need support with inboxes, calendars, research, reports, spreadsheets, or day-to-day admin tasks, reach out through any of the channels below.</p></div>
            <div className="contact-grid">{socials.map((item) => <a aria-label={item.label} className="card contact-card" href={item.href} key={item.label} rel="noreferrer" target="_blank"><span>{item.short}</span><strong>{item.label}</strong><p>{item.note}</p></a>)}</div>
            <div className="actions"><LinkButton className="primary" href="https://wa.me/639241232790">Message me on WhatsApp</LinkButton><LinkButton className="secondary" href="https://www.facebook.com/daryll.l.bonzo">View Facebook</LinkButton></div>
          </section>
        </main>

        <footer className="footer"><div className="wrap"><div><strong>Daryll John L. Bonzo</strong><small>General Virtual Assistant | Manila, Philippines</small></div><p>Reliable support for admin, research, reporting, and organized remote workflows.</p></div></footer>
      </div>
    </>
  );
}
