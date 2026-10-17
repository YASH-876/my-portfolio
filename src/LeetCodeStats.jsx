
import { useEffect, useState } from "react";

const API_URL =
  "https://leetcode-stats-api.herokuapp.com/BPbXbDxhjL";

export default function LeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not fetch LeetCode stats");
        }

        const data = await response.json();

        if (
          data.status !== "success" ||
          !Number.isFinite(Number(data.totalSolved))
        ) {
          throw new Error("LeetCode stats unavailable");
        }

        setStats({
          totalSolved: Number(data.totalSolved),
          easySolved: Number(data.easySolved ?? 0),
          mediumSolved: Number(data.mediumSolved ?? 0),
          hardSolved: Number(data.hardSolved ?? 0),
          ranking: data.ranking ?? "—",
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(true);
        }
      }
    }

    fetchStats();

    return () => controller.abort();
  }, []);

  return (
    <article className="live-stat-card leetcode-card">
      <div className="stat-card-header">
        <span className="stat-logo leetcode-logo">LC</span>
        <span className="stat-platform">LeetCode</span>
      </div>

      {error ? (
        <div className="stat-unavailable">
          <p>Stats unavailable right now.</p>
          <a
            href="https://leetcode.com/u/BPbXbDxhjL/"
            target="_blank"
            rel="noreferrer"
          >
            View profile ↗
          </a>
        </div>
      ) : !stats ? (
        <p className="stat-loading">Loading stats...</p>
      ) : (
        <>
          <div className="stat-main-value">
            {stats.totalSolved}
          </div>

          <p className="stat-caption">Problems solved</p>

          <div className="stat-details">
            <div className="stat-detail">
              <span>Easy</span>
              <strong>{stats.easySolved}</strong>
            </div>

            <div className="stat-detail">
              <span>Medium</span>
              <strong>{stats.mediumSolved}</strong>
            </div>

            <div className="stat-detail">
              <span>Hard</span>
              <strong>{stats.hardSolved}</strong>
            </div>

            <div className="stat-detail">
              <span>Global ranking</span>
              <strong>
                {Number(stats.ranking).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <a
            className="stat-profile-link"
            href="https://leetcode.com/u/BPbXbDxhjL/"
            target="_blank"
            rel="noreferrer"
          >
            Open LeetCode ↗
          </a>
        </>
      )}
    </article>
  );
}
