from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, RegisterView, WatchlistViewSet
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'watchlist', WatchlistViewSet, basename='watchlist')
urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='auth_register'),
]

