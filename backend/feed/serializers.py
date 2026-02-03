from rest_framework import serializers
from .models import Post, Comment
from likes.models import Like


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "author", "content", "replies"]

    def get_replies(self, obj):
        return CommentSerializer(obj.replies.all(), many=True).data


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "author", "content", "comments", "like_count"]

    def get_comments(self, obj):
        return CommentSerializer(
            obj.comments.filter(parent__isnull=True),
            many=True
        ).data

    def get_like_count(self, obj):
        return Like.objects.filter(post=obj).count()
