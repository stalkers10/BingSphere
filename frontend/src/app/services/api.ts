import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomePageResponse } from '../models/home';
import { Movie } from '../models/movie';
import { ChangePasswordPayload, UserProfile } from '../models/profile';
import { WatchlistItem } from '../models/watchlist';

export interface PaginatedMovieResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: Movie[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private moviesUrl = '/api/movies/';
  private homeUrl = '/api/home/';
  private watchlistUrl = '/api/watchlist/';
  private profileUrl = '/api/profile/';
  private passwordUrl = '/api/profile/password/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[] | PaginatedMovieResponse> {
    return this.http.get<Movie[] | PaginatedMovieResponse>(this.moviesUrl);
  }

  getHomePage(): Observable<HomePageResponse> {
    return this.http.get<HomePageResponse>(this.homeUrl);
  }

  getWatchlist(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>(this.watchlistUrl);
  }

  removeFromWatchlist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.watchlistUrl}${id}/`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.moviesUrl}${id}/`);
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileUrl);
  }

  updateProfileAvatar(formData: FormData): Observable<UserProfile> {
    return this.http.patch<UserProfile>(this.profileUrl, formData);
  }

  removeProfileAvatar(): Observable<UserProfile> {
    return this.http.patch<UserProfile>(this.profileUrl, { remove_avatar: true });
  }

  changePassword(payload: ChangePasswordPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.passwordUrl, payload);
  }
}
