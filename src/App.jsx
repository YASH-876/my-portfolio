import { useEffect, useState } from "react";
import "./App.css";
import { Icon, Sparkle, Flower, PlatformLogo } from "./icons";
import { profile } from "./profile";
import { useLiveStats, pick, formatValue } from "./useLiveStats";

const SECTIONS = ["home", "about", "projects", "coding", "contact"];

const CATS = [
  { delay: "0s", dur: "26s" },
  { delay: "-5s", dur: "26s" },
  { delay: "-10s", dur: "26s" },
  { delay: "-15s", dur: "26s" },
  { delay: "-20s", dur: "26s" },
];

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function WalkingCat({ delay, dur }) {
  return (
    <div className="cat-walker" style={{ animationDelay: delay, animationDuration: dur }}>
      <div className="cat-sprite" />
    </div>
  );
}

function ProjectThumb({ project }) {
  if (project.image) {
    return <img className="thumb thumb-image" src={project.image} alt="" />;
  }
  if (project.thumb === "pixel") {
    return (
      <div className="thumb thumb-pixel" aria-hidden="true">
        <div className="thumb-bar"><i /><i /><i /></div>
        <div className="thumb-sky">
          <span className="sun" />
          <span className="b b1" /><span className="b b2" /><span className="b b3" /><span className="b b4" />
        </div>
      </div>
    );
  }
  return (
    <div className={`thumb thumb-icon ${project.thumb === "flower" ? "tone-pink" : "tone-lavender"}`} aria-hidden="true">
      <Icon name={project.thumb === "flower" ? "flower" : "database"} size={46} strokeWidth={1.6} />
    </div>
  );
}

function FooterText({ text }) {
  const parts = String(text).split("♥");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="copy-heart">♥</span>}
        </span>
      ))}
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [active, setActive] = useState("home");
  const { data, liveCount } = useLiveStats();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // highlight the nav link of the section you are looking at
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id) => (event) => {
    event.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jump = (href) => (href?.startsWith("#") ? go(href.slice(1)) : undefined);

  return (
    <div className="page">
      <div className="container">
        {/* NAV */}
        <header className="nav card">
          <a className="brand" href="#home" onClick={go("home")}>
            <Icon name="cat" size={30} />
            <span className="brand-text">
              {profile.siteName} <span className="brand-prompt">&gt;_</span>
            </span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={go(id)}>
                {id}
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Icon name={theme === "light" ? "sun" : "moon"} size={20} />
          </button>
        </header>

        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="badge">
              <i className="dot" />
              {profile.badge}
            </span>
            <h1>
              hi, i’m <span className="accent">{profile.name.toLowerCase()}!</span>
              <svg className="h1-spark" width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
                <path d="M4 20 9 14M12 11l2-6M18 12l6-2" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </h1>
            <p className="tagline">
              {profile.tagline.map((t, i) => (
                <span key={t}>
                  {i > 0 && <b className="sep">•</b>}
                  {t}
                </span>
              ))}
            </p>
            <p className="intro">{profile.bio}</p>
            <div className="cta">
              <a className="btn btn-primary" href={profile.primaryButton.href} onClick={jump(profile.primaryButton.href)}>
                {profile.primaryButton.label} <Icon name="arrow-right" size={16} />
              </a>
              <a className="btn btn-ghost" href={profile.secondaryButton.href} onClick={jump(profile.secondaryButton.href)}>
                <Icon name="chat" size={18} /> {profile.secondaryButton.label}
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="speech">
              {profile.speech.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
            <img className="shin" src="/images/shinchan.png" alt="Shinchan carrying a basket" />
            <div className="ground-shadow" />
          </div>

          <Sparkle color="#c9a0f0" size={26} style={{ left: "-1.5%", top: "17%" }} />
          <Sparkle color="#ff8fcf" size={24} style={{ left: "64%", top: "2%" }} />
          <Sparkle color="#7aa8ff" size={20} style={{ left: "88%", top: "4%" }} />
          <Sparkle color="#7aa8ff" size={20} style={{ left: "-2%", top: "77%" }} />
          <Sparkle color="#ffc46b" size={22} style={{ left: "58%", top: "42%" }} />
          <Sparkle color="#ff8fcf" size={22} style={{ left: "96%", top: "45%" }} />
          <Sparkle color="#ffc46b" size={26} style={{ left: "93%", top: "68%" }} />
          <Flower style={{ left: "-40px", bottom: "-2px" }} />
          <Flower petal="#f58fd0" style={{ right: "-36px", bottom: "-2px" }} />
        </section>

        {/* STATS */}
        <section className="stats" aria-label="Quick overview">
          {profile.stats.map((stat) => {
            const live = stat.live ? pick(data, stat.live) : null;
            const text = stat.live ? formatValue(live, stat.fallback ?? "—") : stat.value;
            return (
              <div className="stat card" key={stat.label}>
                <span className={`stat-icon tone-${stat.tone}`}>
                  <Icon name={stat.icon} size={24} />
                </span>
                <span className="stat-text">
                  <b className={String(text).length > 6 ? "long" : ""}>{text}</b>
                  <small>{stat.label}</small>
                </span>
                {stat.live && live !== null && <i className="live-dot" title="live" />}
              </div>
            );
          })}
        </section>

        {/* ABOUT */}
        <section className="about card section-card" id="about">
          <div className="section-head">
            <h2>
              <span className="slashes">//</span> {profile.about.title} <span className="leaf">🌿</span>
            </h2>
            <a className="more" href="#coding" onClick={go("coding")}>
              {profile.about.moreLabel} <Icon name="arrow-right" size={14} />
            </a>
          </div>
          <div className="about-body">
            <p>{profile.about.text}</p>
            <div className="chips">
              {profile.about.skills.map((skill) => (
                <span key={skill.label} className={`chip tone-${skill.tone}`}>
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
          <img className="kitty" src="/images/hello-kitty.png" alt="" aria-hidden="true" />
        </section>

        {/* PROJECTS */}
        <section className="projects card section-card" id="projects">
          <div className="section-head">
            <h2>
              <Icon name="folder" size={26} className="head-icon" /> featured projects
            </h2>
            <a className="more" href="#contact" onClick={go("contact")}>
              more coming soon <Icon name="arrow-right" size={14} />
            </a>
          </div>
          <div className="project-grid">
            {profile.projects.map((project, index) => (
              <article className="project card" key={project.title}>
                <ProjectThumb project={project} />
                <div className="project-body">
                  <span className="project-eyebrow">
                    project {String(index + 1).padStart(2, "0")}
                    {project.status ? ` · ${project.status}` : ""}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag.label} className={`chip small tone-${tag.tone}`}>
                        {tag.label}
                      </span>
                    ))}
                    {project.url && (
                      <a
                        className="open"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                      >
                        <Icon name="arrow-up-right" size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CODING PROFILES */}
        <section className="coding card section-card" id="coding">
          <img className="shin-laying" src="/images/shinchan-laying.png" alt="" aria-hidden="true" />
          <div className="section-head">
            <h2>
              <Icon name="bars" size={24} className="head-icon" /> coding profiles
              {liveCount > 0 && (
                <span className="live-pill" title="Ratings update automatically">
                  <i className="live-dot" /> live
                </span>
              )}
            </h2>
            <span className="more static">where i solve problems →</span>
          </div>
          <div className="profile-grid">
            {profile.codingProfiles.map((item) => {
              const live = item.metric ? pick(data, item.metric) : null;
              const hasMetric = Boolean(item.metric);
              return (
                <a
                  className="profile-card"
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={`profile-icon ${["github", "leetcode"].includes(item.logo) ? "plain" : ""} logo-${item.logo}`}>
                    <PlatformLogo name={item.logo} />
                  </span>
                  <span className="profile-text">
                    <span className="profile-name">
                      {item.name}
                      {hasMetric && live !== null && <i className="live-dot" title="live" />}
                    </span>
                    {hasMetric ? (
                      <span className="profile-value">
                        {formatValue(live, item.fallback ?? "—")} {item.unit && <small>{item.unit}</small>}
                      </span>
                    ) : (
                      <span className="profile-value handle">@{item.handle}</span>
                    )}
                  </span>
                  <Icon name="arrow-right" size={16} className="profile-arrow" />
                </a>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact card section-card" id="contact">
          <div className="contact-copy">
            <h2>
              <span className="slashes">//</span> {profile.contact.title} <Icon name="heart" size={20} className="head-heart" />
            </h2>
            <p>{profile.contact.text}</p>
          </div>
          <div className="contact-links">
            {profile.contact.email && (
              <a href={`mailto:${profile.contact.email}`} className="social">
                <Icon name="mail" size={17} /> email
              </a>
            )}
            {profile.socials.map((social) => (
              <a
                key={social.name}
                className="social"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.name} profile`}
                title={social.handle ? `@${social.handle}` : social.name}
              >
                <Icon name={social.icon || "link"} size={17} /> {social.name}
                <Icon name="arrow-up-right" size={13} className="social-arrow" />
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="container footer-inner">
          <p className="copy">
            © {new Date().getFullYear()} {profile.name}. <FooterText text={profile.footerText} />
          </p>
          <div className="cat-lane" aria-hidden="true">
            {CATS.map((cat, i) => (
              <WalkingCat key={i} delay={cat.delay} dur={cat.dur} />
            ))}
          </div>
          <div className="grind">
            <span className="grind-bubble">{profile.footerSign}</span>
            <span className="sign">
              <Icon name="heart" size={12} />
            </span>
          </div>
        </div>
        <div className="grass" />
      </footer>
    </div>
  );
}