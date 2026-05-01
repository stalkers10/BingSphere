import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth';
import { MovieList } from './components/movie-list/movie-list';
import { VideoPlayer } from './components/video-player/video-player';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: '', component: MovieList },
    { path: 'watch/:id', component: VideoPlayer },
    
];
