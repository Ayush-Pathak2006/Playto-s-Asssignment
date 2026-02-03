from django.urls import path
from .views import ToggleLikePostView, ToggleLikeCommentView

urlpatterns = [
    path("posts/<int:post_id>/", ToggleLikePostView.as_view()),
    path("comments/<int:comment_id>/", ToggleLikeCommentView.as_view()),
]
