import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService, private router:Router) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.getMovies().subscribe({
      next: (data: any) => {
        this.movies = data.results ? data.results : data;
      },
      error: (err) => {
      if (err.status === 401) {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      }
    }
    });
  }

  playMovie(url: string) {
    window.open(url, '_blank');
  }
}