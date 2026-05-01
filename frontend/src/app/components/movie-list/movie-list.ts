import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.scss']
})
export class MovieList implements OnInit {
  movies: Movie[] = [];
  isLoading = true;
  error: string | null = null;
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient

  ) {}

  ngOnInit() {
    this.apiService.getMovies().subscribe({
      next: (data: any) => {
        console.log('Raw response:', data);
        this.movies = Array.isArray(data) ? data : (data.results ?? []);
        console.log('Movies set:', this.movies.length);
        this.isLoading = false;
        this.cdr.detectChanges(); // force view update
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = `Error ${err.status}: ${err.message}`;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  playMovie(movieId: number) {
    this.router.navigate(['/watch', movieId]);
  }

searchMovies(event: any) {
  const query = event.target.value;
  // This calls your API with the search parameter
  this.http.get(`http://127.0.0.1:8000/api/movies/?search=${query}`).subscribe((data: any) => {
    this.movies = data.results ? data.results : data;
  });
}

loadMovies() {
    this.apiService.getMovies().subscribe({
      next: (data: any) => {
        this.movies = data.results ? data.results : data;
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

addToWatchlist(movieId: number) {
    const payload = { movie: movieId };
    this.http.post(`${this.baseUrl}watchlist/`, payload).subscribe({
      next: () => alert('Added to your watchlist!'),
      error: (err) => console.error('Error adding to watchlist', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}