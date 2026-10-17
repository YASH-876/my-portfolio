
import { useEffect, useState } from "react";

const API_URL =
  "https://codechef-api.vercel.app/handle/blaze_spark_73";

export default function CodeChefStats() {
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
          throw new Error("Could not fetch CodeChef stats");
        }

        const data = await response.json();

        const rating = Number(
          data.currentRating ?? data.rating
        );

        if (!Number.isFinite(rating) || rating <= 0) {
          throw new Error("Rating unavailable");
        }

        const highestRating = Number(
          data.highestRating ?? data.highest_rating
        );

        setStats({
          rating,
          highestRating: Number.isFinite(highestRating)
            ? highestRating
            : null,
          stars: data.stars ?? data.starsCount ?? "—",
          globalRank: data.globalRank ?? data.global_rank ?? "—",
          countryRank: data.countryRank ?? data.country_rank ?? "—",
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
    <article className="live-stat-card codechef-card">
      <div className="stat-card-header">
        <span className="stat-logo codechef-logo">CC</span>
        <span className="stat-platform">CodeChef</span>
      </div>

      {error ? (
        <div className="stat-unavailable">
          <p>Stats unavailable right now.</p>
          <a
            href="https://www.codechef.com/users/blaze_spark_73"
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
            {stats.rating}
          </div>

          <p className="stat-caption">Current rating</p>

          <div className="stat-details">
            <div className="stat-detail">
              <span>Highest rating</span>
              <strong>{stats.highestRating ?? "—"}</strong>
            </div>

            <div className="stat-detail">
              <span>Stars</span>
              <strong>{stats.stars}</strong>
            </div>

            <div className="stat-detail">
              <span>Global rank</span>
              <strong>{stats.globalRank}</strong>
            </div>

            <div className="stat-detail">
              <span>Country rank</span>
              <strong>{stats.countryRank}</strong>
            </div>
          </div>

          <a
            className="stat-profile-link"
            href="https://www.codechef.com/users/blaze_spark_73"
            target="_blank"
            rel="noreferrer"
          >
            Open CodeChef ↗
          </a>
        </>
      )}
    </article>
  );
}
