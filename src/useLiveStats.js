import { useEffect, useState } from "react";
import { profile } from "./profile";

const CACHE_KEY = "portfolio-live-stats-v1";
const TIMEOUT_MS = 9000;

const num = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

async function getJSON(url, signal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal.addEventListener("abort", onAbort);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", onAbort);
  }
}

async function getText(url, signal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal.addEventListener("abort", onAbort);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", onAbort);
  }
}

// Lets you paste a full profile link OR just the username in profile.js
export function cleanHandle(value) {
  const text = String(value || "").trim().replace(/\/+$/, "");
  if (!text.includes("/")) return text.replace(/^@/, "");
  return text.split("/").pop().replace(/^@/, "");
}

// Reads a CodeChef profile page (as plain HTML text)
export function parseCodeChefHTML(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body?.textContent || "";

  const ratingText = doc.querySelector(".rating-number")?.textContent || "";
  const rating = num(ratingText.replace(/[^0-9]/g, ""));
  if (!rating) return null;

  const starsText = doc.querySelector(".rating")?.textContent || "";
  const starsMatch = starsText.match(/(\d)/) || text.match(/(\d)\s*★/);
  const highestMatch = text.match(/Highest Rating\s*(\d+)/i);

  const rankNumbers = [...doc.querySelectorAll(".rating-ranks strong")].map((el) =>
    num(el.textContent.replace(/[^0-9]/g, ""))
  );
  const globalMatch = text.match(/(\d+)\s*Global Rank/i);
  const countryMatch = text.match(/(\d+)\s*Country Rank/i);

  return {
    rating,
    highestRating: highestMatch ? num(highestMatch[1]) : null,
    stars: starsMatch ? starsMatch[1] : null,
    globalRank: rankNumbers[0] ?? (globalMatch ? num(globalMatch[1]) : null),
    countryRank: rankNumbers[1] ?? (countryMatch ? num(countryMatch[1]) : null),
  };
}

// Try each source in order and use the first one that works.
async function firstWorking(attempts, signal) {
  for (const attempt of attempts) {
    try {
      const result = await attempt();
      if (result) return result;
    } catch (err) {
      if (signal.aborted) throw err;
    }
  }
  return null;
}

const loaders = {
  codeforces: (handle, signal) =>
    firstWorking(
      [
        async () => {
          const data = await getJSON(
            `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
            signal
          );
          const user = data?.status === "OK" ? data.result?.[0] : null;
          if (!user) return null;
          return {
            rating: num(user.rating),
            maxRating: num(user.maxRating),
            rank: user.rank ?? null,
            maxRank: user.maxRank ?? null,
          };
        },
      ],
      signal
    ),

  github: (handle, signal) =>
    firstWorking(
      [
        async () => {
          const user = await getJSON(
            `https://api.github.com/users/${encodeURIComponent(handle)}`,
            signal
          );
          if (user?.public_repos === undefined) return null;
          return {
            repos: num(user.public_repos),
            followers: num(user.followers),
            following: num(user.following),
            since: user.created_at ? new Date(user.created_at).getFullYear() : null,
          };
        },
      ],
      signal
    ),

  leetcode: (handle, signal) => {
    const user = encodeURIComponent(handle);
    const fromStats = (d) => {
      if (num(d?.totalSolved) === null) return null;
      return {
        totalSolved: num(d.totalSolved),
        easySolved: num(d.easySolved),
        mediumSolved: num(d.mediumSolved),
        hardSolved: num(d.hardSolved),
        ranking: num(d.ranking),
      };
    };
    return firstWorking(
      [
        // source 1
        async () => fromStats(await getJSON(`https://leetcode-api-faisalshohag.vercel.app/${user}`, signal)),
        // source 2
        async () => {
          const d = await getJSON(`https://alfa-leetcode-api.onrender.com/${user}/solved`, signal);
          if (num(d?.solvedProblem) === null) return null;
          return {
            totalSolved: num(d.solvedProblem),
            easySolved: num(d.easySolved),
            mediumSolved: num(d.mediumSolved),
            hardSolved: num(d.hardSolved),
            ranking: null,
          };
        },
        // source 3 (your original one)
        async () => {
          const d = await getJSON(`https://leetcode-stats-api.herokuapp.com/${user}`, signal);
          return d?.status === "success" ? fromStats(d) : null;
        },
      ],
      signal
    );
  },

  codechef: (handle, signal) => {
    const user = encodeURIComponent(handle);
    const profileUrl = `https://www.codechef.com/users/${user}`;
    return firstWorking(
      [
        // source 1: community API
        async () => {
          const d = await getJSON(`https://codechef-api.vercel.app/handle/${user}`, signal);
          const rating = num(d?.currentRating ?? d?.rating);
          if (rating === null || rating <= 0) return null;
          return {
            rating,
            highestRating: num(d.highestRating ?? d.highest_rating),
            stars: d.stars ?? d.starsCount ?? null,
            globalRank: num(d.globalRank ?? d.global_rank),
            countryRank: num(d.countryRank ?? d.country_rank),
          };
        },
        // source 2: read your public CodeChef profile page through a CORS helper
        async () =>
          parseCodeChefHTML(
            await getText(`https://api.allorigins.win/raw?url=${encodeURIComponent(profileUrl)}`, signal)
          ),
        // source 3: same page through another helper
        async () =>
          parseCodeChefHTML(await getText(`https://corsproxy.io/?url=${encodeURIComponent(profileUrl)}`, signal)),
      ],
      signal
    );
  },
};

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/** Returns { data, loading, liveCount }.  data.codeforces.rating etc. */
export function useLiveStats() {
  const [data, setData] = useState(readCache);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // one lookup per live platform, using the handle written in profile.js
    const targets = {};
    for (const item of profile.codingProfiles) {
      if (item.live && loaders[item.live]) targets[item.live] = cleanHandle(item.handle);
    }

    async function refresh() {
      const entries = await Promise.all(
        Object.entries(targets).map(async ([key, handle]) => {
          try {
            return [key, await loaders[key](handle, signal)];
          } catch {
            return [key, null];
          }
        })
      );
      if (signal.aborted) return;

      setData((previous) => {
        const next = { ...previous };
        for (const [key, value] of entries) {
          if (value) next[key] = { ...value, updatedAt: Date.now() };
        }
        writeCache(next);
        return next;
      });
      setLoading(false);
    }

    refresh();
    const minutes = Math.max(1, Number(profile.refreshMinutes) || 5);
    const timer = setInterval(refresh, minutes * 60 * 1000);

    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  const liveCount = Object.keys(data).length;
  return { data, loading, liveCount };
}

/** pick(data, "codeforces.rating") -> number | string | null */
export function pick(data, path) {
  if (!path) return null;
  const [platform, key] = path.split(".");
  const value = data?.[platform]?.[key];
  return value === undefined || value === null ? null : value;
}

export function formatValue(value, fallback = "—") {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "number") return value.toLocaleString("en-IN");
  return String(value);
}