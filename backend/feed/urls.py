from django.urls import path
from .views import (
    PostListView,
    PostDetailView,
    CommentCreateView,
    CommentUpdateView,
)

urlpatterns = [
    path("posts/", PostListView.as_view()),
    path("posts/<int:pk>/", PostDetailView.as_view()),

    # COMMENTS
    path("comments/", CommentCreateView.as_view()),
    path("comments/<int:pk>/", CommentUpdateView.as_view()),
]
