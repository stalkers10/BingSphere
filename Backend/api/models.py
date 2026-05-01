from django.db import models

from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    genres = models.ManyToManyField(Genre, related_name='movies')
    video_url = models.URLField(max_length=500) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlist')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True) 
    added_date = models.DateTimeField(auto_now_add=True)
    #Fix 1: Remove unique_together and add a unique constraint on the combination
    class Meta:
        unique_together = ('user', 'movie')
        constraints = [
            models.UniqueConstraint(fields=['user', 'movie'], name='unique_user_movie')
        ]

    def __str__(self):
        return f"{self.user.username}'s Watchlist"