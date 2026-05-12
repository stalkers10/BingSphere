from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ChangePasswordView,
    MovieViewSet,
    ProfileView,
    RegisterView,
    WatchlistViewSet,
    home_page,
)

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'watchlist', WatchlistViewSet, basename='watchlist')
urlpatterns = [
    path('', include(router.urls)),
    path('home/', home_page, name='home-page'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/password/', ChangePasswordView.as_view(), name='profile-password'),
]

