from rest_framework import serializers
from .models import Post, Comment
from likes.models import Like
from django.contrib.auth.models import User

class CommentAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class CommentSerializer(serializers.ModelSerializer):
    author = CommentAuthorSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "author", "content", "like_count", "replies"]

    def get_replies(self, obj):
        return CommentSerializer(
            getattr(obj, "replies_list", []),
            many=True
        ).data

    def get_like_count(self, obj):
        return Like.objects.filter(comment=obj).count()


class PostAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class PostSerializer(serializers.ModelSerializer):
    author = PostAuthorSerializer(read_only=True)
    comments = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "author", "content", "comments", "like_count"]

    def get_comments(self, obj):
        if hasattr(obj, "comment_tree"):
            return CommentSerializer(obj.comment_tree, many=True).data
        return []

    def get_like_count(self, obj):
        return Like.objects.filter(post=obj).count()

