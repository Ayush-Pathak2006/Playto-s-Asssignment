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

  if (loading)
    return (
      <div className="text-sm text-gray-500">
        Loading leaderboard...
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🏆 Leaderboard <span className="text-sm text-gray-500">(Last 24h)</span>
      </h3>

      {users.length === 0 && (
        <p className="text-sm text-gray-500">No activity yet</p>
      )}

      <div className="space-y-2">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex justify-between items-center text-sm"
          >
            <span className="font-medium">
              #{index + 1} {user.username}
            </span>

            <span className="text-blue-600 font-semibold">
              {user.karma} karma
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
