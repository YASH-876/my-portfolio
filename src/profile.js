// ============================================================
//  profile.js  —  EDIT ONLY THIS FILE to change your website.
//  Everything on the page (text, projects, links, stats) comes
//  from here. Save the file and the page updates instantly.
// ============================================================

export const profile = {
  // ---------- Basics ----------
  siteName: "yash.cp",
  name: "Yash",
  badge: "CS student from India",
  tagline: ["CS student", "problem solving", "backend curious"],

  // Short intro shown under your name in the hero section
  bio: "i like solving problems, building things, and exploring how systems work under the hood. this is my little corner on the internet where i document my journey :)",

  // Text inside the speech bubble next to Shinchan (one line per item)
  speech: ["good", "code", "better", "days", "<3"],

  // Hero buttons
  primaryButton: { label: "view my projects", href: "#projects" },
  secondaryButton: { label: "say hi", href: "#contact" },

  // ---------- Top stats row (4 tiles) ----------
  // `live` pulls a number from the live data (see list at the bottom).
  // If the live data is unavailable, `fallback` is shown instead.
  // Use `value` instead of `live` for a fixed text tile.
  stats: [
    { icon: "code", tone: "lavender", label: "Problems Solved", live: "leetcode.totalSolved", fallback: "—" },
    { icon: "bars", tone: "blue", label: "Current Rating", live: "codeforces.rating", fallback: "—" },
    { icon: "trophy", tone: "yellow", label: "Max Rating", live: "codeforces.maxRating", fallback: "—" },
    { icon: "book", tone: "pink", label: "Currently Learning", value: "System Design" },
  ],

  // ---------- About ----------
  about: {
    title: "about me",
    moreLabel: "more about me",
    text: "I'm a Computer Science student who enjoys problem solving, backend development, and learning how scalable systems work. I'm interested in building useful products, exploring system design, and constantly improving through coding and projects.",
    // tones: pink, blue, green, lavender, yellow, rose, sky
    skills: [
      { label: "C++", tone: "pink" },
      { label: "Java", tone: "blue" },
      { label: "Spring Boot", tone: "green" },
      { label: "PostgreSQL", tone: "lavender" },
      { label: "System Design", tone: "yellow" },
      { label: "Problem Solving", tone: "rose" },
      { label: "Git", tone: "sky" },
    ],
  },

  // ---------- Featured projects ----------
  // thumb: "pixel" | "database" | "flower" — or set `image: "/images/my-shot.png"`
  // `url` makes the arrow button open your project (leave "" to hide it).
  projects: [
    {
      title: "Portfolio Website",
      status: "Building",
      description: "My personal corner on the internet, built to showcase my coding journey and projects.",
      tags: [
        { label: "React", tone: "blue" },
        { label: "JavaScript", tone: "yellow" },
        { label: "CSS", tone: "lavender" },
      ],
      thumb: "pixel",
      url: "",
    },
    {
      title: "System Design Project",
      status: "Coming soon",
      description: "An upcoming backend project focused on scalable architecture, APIs, databases, and system design.",
      tags: [
        { label: "Java", tone: "pink" },
        { label: "Spring Boot", tone: "green" },
        { label: "PostgreSQL", tone: "lavender" },
      ],
      thumb: "database",
      url: "",
    },
  ],

  // ---------- Coding profiles ----------
  // `metric` = which live number to show big on the tile (optional).
  // `fallback` = what to show if the live number can't be loaded.
  // `live` must be one of: codeforces | codechef | leetcode | github
  // (needed on every profile that uses live numbers; the handle is used for the lookup).
  // `handle` can be just the username OR the full profile link — both work for live tiles.
  codingProfiles: [
    {
      name: "Codeforces",
      handle: "Trikoo",
      url: "https://codeforces.com/profile/Trikoo",
      logo: "codeforces",
      live: "codeforces",
      metric: "codeforces.rating",
      unit: "rating",
      fallback: "—",
    },
    {
      name: "CodeChef",
      handle: "blaze_spark_73",
      url: "https://www.codechef.com/users/blaze_spark_73",
      logo: "codechef",
      live: "codechef",
      metric: "codechef.rating",
      unit: "rating",
      fallback: "—",
    },
    {
      name: "LeetCode",
      handle: "BPbXbDxhjL",
      url: "https://leetcode.com/u/BPbXbDxhjL/",
      logo: "leetcode",
      live: "leetcode",
      metric: "leetcode.totalSolved",
      unit: "solved",
      fallback: "—",
    },
    {
      name: "CSES",
      handle: "434542",
      url: "https://cses.fi/user/434542",
      logo: "cses",
    },
    {
      name: "AtCoder",
      handle: "Trikoo",
      url: "https://atcoder.jp/users/Trikoo",
      logo: "atcoder",
    },
    {
      name: "GitHub",
      handle: "YASH-876",
      url: "https://github.com/YASH-876",
      logo: "github",
      live: "github",
      metric: "github.repos",
      unit: "repos",
      fallback: "—",
    },
  ],

  // How often the live numbers refresh while the page is open (minutes)
  refreshMinutes: 5,

  // ---------- Contact / socials ----------
  // icon: github | linkedin | x | instagram | mail | link
  contact: {
    title: "let's connect",
    text: "Have an interesting project or idea? Feel free to say hi!",
    email: "", // e.g. "you@example.com" — shown as a button when filled
  },
  socials: [
    { name: "GitHub", handle: "YASH-876", url: "https://github.com/YASH-876", icon: "github" },
    { name: "LinkedIn", handle: "Yashwardhan Rathod", url: "https://www.linkedin.com/in/yashwardhan-rathod-9ab331355/", icon: "linkedin" },
    { name: "X", handle: "YR_876", url: "https://x.com/YR_876", icon: "x" },
    { name: "Instagram", handle: "mera__yashu__yashu", url: "https://www.instagram.com/mera__yashu__yashu/", icon: "instagram" },
  ],

  // ---------- Footer ----------
  footerText: "Built with ♥ and lots of chai.",
  footerSign: "keep grinding!!",
};

/*
  LIVE VALUES YOU CAN USE in `live` / `metric`:
    codeforces.rating  codeforces.maxRating  codeforces.rank  codeforces.maxRank
    codechef.rating    codechef.highestRating  codechef.stars  codechef.globalRank  codechef.countryRank
    leetcode.totalSolved  leetcode.easySolved  leetcode.mediumSolved  leetcode.hardSolved  leetcode.ranking
    github.repos  github.followers  github.following  github.since
*/