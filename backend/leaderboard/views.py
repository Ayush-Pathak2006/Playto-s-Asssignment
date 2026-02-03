from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, F, Value, IntegerField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from likes.models import Like
from django.contrib.auth.models import User


class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        since = timezone.now() - timedelta(hours=24)

        # 🔹 Post likes → 5 karma
        post_karma = (
            Like.objects
            .filter(post__isnull=False, created_at__gte=since)
            .values(author_id=F("post__author"))
            .annotate(karma=Count("id") * Value(5))
        )

        # 🔹 Comment likes → 1 karma
        comment_karma = (
            Like.objects
            .filter(comment__isnull=False, created_at__gte=since)
            .values(author_id=F("comment__author"))
            .annotate(karma=Count("id"))
        )

        # 🔹 Merge both
        karma_map = {}

        for row in post_karma:
            karma_map[row["author_id"]] = karma_map.get(row["author_id"], 0) + row["karma"]

        for row in comment_karma:
            karma_map[row["author_id"]] = karma_map.get(row["author_id"], 0) + row["karma"]

        # 🔹 Fetch users
        users = User.objects.filter(id__in=karma_map.keys())

        leaderboard = sorted(
            [
                {
                    "id": user.id,
                    "username": user.username,
                    "karma": karma_map[user.id],
                }
                for user in users
            ],
            key=lambda x: x["karma"],
            reverse=True
        )[:5]

        return Response(leaderboard)
