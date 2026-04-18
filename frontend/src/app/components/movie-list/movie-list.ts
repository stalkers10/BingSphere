import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';

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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
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

  playMovie(url: string) {
    window.open(url, '_blank');
  }
}