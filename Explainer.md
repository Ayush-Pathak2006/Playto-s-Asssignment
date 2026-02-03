# 📘 EXPLAINER.md  
**Playto Engineering Challenge — Technical Explanation**

---

## 1️⃣ The Tree — Nested Comments Design

### How are nested comments modeled?

Nested comments are implemented using an **adjacency list model**.

Each comment stores:
- A reference to the post it belongs to
- A reference to its author
- An optional reference to a **parent comment**

This allows:
- Top-level comments (`parent = NULL`)
- Unlimited depth of replies
- Simple writes and deletes
- Efficient querying compared to deeply nested schemas

This structure is commonly used for Reddit-style discussion threads and balances flexibility with performance.

---

### How are nested comments fetched without N+1 queries?

Recursive database queries were explicitly avoided.

Instead, the system follows a **three-step strategy**:

1. **Fetch all comments for a post in a single query**
2. **Construct the entire comment tree in memory**
3. **Serialize the pre-built tree**

The tree is assembled in a service layer using an in-memory map, linking each comment to its parent.  
The serializer then reads from this precomputed structure rather than hitting the database again.

#### Result
- Constant number of queries per post
- No recursive database access
- Scales efficiently even with deeply nested threads (50+ comments)

---

## 2️⃣ The Math — Karma & Leaderboard (Last 24 Hours)

### Karma rules

| Action | Karma |
|------|------|
| Like on a Post | +5 |
| Like on a Comment | +1 |

---

### How is “last 24 hours” karma calculated?

Karma is **not stored** on the User model.

Instead, it is calculated dynamically from the **Like activity history**, using the timestamp of each like. This ensures correctness and avoids stale or cached values.

The leaderboard query:
- Considers only likes created in the **last rolling 24 hours**
- Separates post likes and comment likes
- Applies different karma weights
- Aggregates results per user

---

### How are results combined?

- Karma from post likes and comment likes is aggregated per user
- Results are sorted by total karma (descending)
- Only the **Top 5 users** are returned

This approach avoids:
- Storing “daily karma” fields
- Scheduled reset jobs
- Complex materialized views

The leaderboard automatically updates as time passes because all calculations are time-based.

---

### What if multiple users have equal karma?

Tie-breaking follows a stable rule:
1. Higher karma ranks higher
2. If karma is equal, the user who achieved it earlier appears first

---

### How does the leaderboard reset every 24 hours?

There is **no reset logic**.

Because all leaderboard queries only consider activity from the last 24 hours, the system naturally reflects a rolling time window.

---

## 3️⃣ Concurrency — Preventing Double Likes

### How is double-liking prevented?

Protection is enforced at the **database level** using conditional unique constraints:
- A user can like a post only once
- A user can like a comment only once

This guarantees correctness even under concurrent requests or race conditions.

---

### How are race conditions handled?

Like/unlike actions are wrapped in **atomic transactions**:
- If a like exists → it is removed
- If it does not exist → it is created

This makes the operation:
- Idempotent
- Race-condition safe
- Consistent under high concurrency

---

## 4️⃣ The AI Audit — Where AI Was Wrong

### The problem

The initial AI-generated solution attempted to serialize nested comments using recursive ORM calls.  
This caused an **N+1 query problem**, where each reply triggered additional database queries.

---

### How it was fixed

- Identified the query explosion during review
- Moved tree construction to a dedicated service layer
- Built the full hierarchy in memory
- Made serializers read from precomputed data

#### Outcome
- Reduced query count from **O(n)** to **O(1)**
- Significantly improved performance
- Preserved clean separation of concerns

---

## 5️⃣ Why This Architecture Works

| Challenge | Solution |
|--------|---------|
| Nested comments | Adjacency list + in-memory tree |
| N+1 queries | Bulk fetch + service layer |
| Double likes | Database constraints |
| Race conditions | Atomic transactions |
| 24-hour leaderboard | Time-based aggregation |
| Scalability | Stateless computation |

---

## 6️⃣ Final Notes

- AI-assisted, but fully reviewed and corrected
- No cached or stored karma values
- Clean separation between models, services, and serializers
- Optimized for correctness, performance, and clarity
---

✅ All core Playto requirements satisfied  
🚀 Designed for real-world scalability by Ayush Pathak