import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api/leaderboard.api";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;

  return (
    <div style={{ borderLeft: "1px solid #ddd", paddingLeft: "16px" }}>
      <h3>🏆 Leaderboard (Last 24h)</h3>

      {users.length === 0 && <p>No activity yet</p>}

      {users.map((user, index) => (
        <div key={user.id} style={{ marginBottom: "8px" }}>
          <strong>#{index + 1} {user.username}</strong>
          <span style={{ float: "right" }}>{user.karma} karma</span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
