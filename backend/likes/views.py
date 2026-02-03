from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from django.db import transaction

from .models import Like
from feed.models import Post


class ToggleLikePostView(APIView):
    def post(self, request, post_id):
        user = request.user

        with transaction.atomic():
            like = Like.objects.filter(user=user, post_id=post_id).first()

            if like:
                like.delete()
                liked = False
            else:
                Like.objects.create(user=user, post_id=post_id)
                liked = True

            like_count = Like.objects.filter(post_id=post_id).count()

        return Response(
            {
                "liked": liked,
                "like_count": like_count
            },
            status=status.HTTP_200_OK
        )


class ToggleLikeCommentView(APIView):
    def post(self, request, comment_id):
        user = request.user

        with transaction.atomic():
            like = Like.objects.filter(
                user=user,
                comment_id=comment_id
            ).first()

            if like:
                like.delete()
                liked = False
            else:
                Like.objects.create(
                    user=user,
                    comment_id=comment_id
                )
                liked = True

            like_count = Like.objects.filter(
                comment_id=comment_id
            ).count()

        return Response(
            {
                "liked": liked,
                "like_count": like_count
            },
            status=status.HTTP_200_OK
        )