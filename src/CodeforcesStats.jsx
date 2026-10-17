
import { useEffect, useState } from "react";

const API_URL =
  "https://codeforces.com/api/user.info?handles=Trikoo";

export default function CodeforcesStats() {
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
          throw new Error("Request failed");
        }

        const result = await response.json();

        if (result.status !== "OK" || !result.result?.length) {
          throw new Error("Invalid response");
        }

        const user = result.result[0];

        setStats({
          rating: user.rating ?? null,
          maxRating: user.maxRating ?? null,
          rank: user.rank ?? "Unrated",
          maxRank: user.maxRank ?? "Unrated",
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
    <article className="live-stat-card codeforces-card">
      <div className="stat-card-header">
        <span className="stat-logo cf-logo">CF</span>
        <span className="stat-platform">Codeforces</span>
      </div>

      {error ? (
        <div className="stat-unavailable">
          <p>Stats unavailable right now.</p>
          <a
            href="https://codeforces.com/profile/Trikoo"
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
            {stats.rating ?? "Unrated"}
          </div>

          <p className="stat-caption">Current rating</p>

          <div className="stat-details">
            <div className="stat-detail">
              <span>Max rating</span>
              <strong>{stats.maxRating ?? "—"}</strong>
            </div>

            <div className="stat-detail">
              <span>Current rank</span>
              <strong className="stat-rank">{stats.rank}</strong>
            </div>

            <div className="stat-detail">
              <span>Best rank</span>
              <strong className="stat-rank">{stats.maxRank}</strong>
            </div>
          </div>

          <a
            className="stat-profile-link"
            href="https://codeforces.com/profile/Trikoo"
            target="_blank"
            rel="noreferrer"
          >
            Open Codeforces ↗
          </a>
        </>
      )}
    </article>
  );
}
