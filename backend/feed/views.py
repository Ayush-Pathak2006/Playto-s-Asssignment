from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Post
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404
from .services import build_comment_tree
from .models import Comment
from .serializers import CommentSerializer



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

class CommentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        content = request.data.get("content")
        post_id = request.data.get("post")
        parent_id = request.data.get("parent")

        if not content or not post_id:
            return Response(
                {"error": "post and content are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        post = get_object_or_404(Post, id=post_id)

        parent = None
        if parent_id:
            parent = get_object_or_404(Comment, id=parent_id)

        comment = Comment.objects.create(
            post=post,
            author=request.user,
            parent=parent,
            content=content
        )

        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)

        # Ownership check
        if comment.author != request.user:
            return Response(
                {"error": "You can edit only your own comment"},
                status=status.HTTP_403_FORBIDDEN
            )

        content = request.data.get("content")
        if not content:
            return Response(
                {"error": "Content is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        comment.content = content
        comment.save()

        serializer = CommentSerializer(comment)
        return Response(serializer.data)
