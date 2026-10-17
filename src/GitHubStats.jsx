
import { useEffect, useState } from "react";

const API_URL = "https://api.github.com/users/YASH-876";

export default function GitHubStats() {
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
          throw new Error("Could not fetch GitHub stats");
        }

        const user = await response.json();

        setStats({
          repositories: user.public_repos,
          followers: user.followers,
          following: user.following,
          createdAt: user.created_at
            ? new Date(user.created_at).getFullYear()
            : "—",
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
    <article className="live-stat-card github-card">
      <div className="stat-card-header">
        <span className="stat-logo github-logo">GH</span>
        <span className="stat-platform">GitHub</span>
      </div>

      {error ? (
        <div className="stat-unavailable">
          <p>Stats unavailable right now.</p>
          <a
            href="https://github.com/YASH-876"
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
            {stats.repositories}
          </div>

          <p className="stat-caption">Public repositories</p>

          <div className="stat-details">
            <div className="stat-detail">
              <span>Followers</span>
              <strong>{stats.followers}</strong>
            </div>

            <div className="stat-detail">
              <span>Following</span>
              <strong>{stats.following}</strong>
            </div>

            <div className="stat-detail">
              <span>Joined GitHub</span>
              <strong>{stats.createdAt}</strong>
            </div>
          </div>

          <a
            className="stat-profile-link"
            href="https://github.com/YASH-876"
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub ↗
          </a>
        </>
      )}
    </article>
  );
}
