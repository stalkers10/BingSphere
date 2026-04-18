from django.contrib import admin
from .models import Genre, Movie, Watchlist

admin.site.register(Genre)
admin.site.register(Watchlist)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'created_at')
    list_filter = ('genres', 'release_date')
    search_fields = ('title', 'description')
    ordering = ('-created_at',)
