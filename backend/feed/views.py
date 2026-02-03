from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Post
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404
from .services import build_comment_tree
from .models import Comment



class PostListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.select_related("author").order_by("-created_at")
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        content = request.data.get("content")

        if not content:
            return Response(
                {"error": "Content is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        post = Post.objects.create(
            author=request.user,
            content=content
        )

        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class PostDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        post = Post.objects.select_related("author").get(pk=pk)

        comments = Comment.objects.filter(
            post=post
        ).select_related("author")

        post.comment_tree = build_comment_tree(comments)

        serializer = PostSerializer(post)
        return Response(serializer.data)
