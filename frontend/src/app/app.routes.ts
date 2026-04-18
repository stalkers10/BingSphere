import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth';
import { MovieList } from './components/movie-list/movie-list';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: '', component: MovieList },
];
