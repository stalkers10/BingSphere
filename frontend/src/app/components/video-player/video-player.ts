import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements OnInit {
  movie: any;
  safeUrl!: SafeResourceUrl;
  isLoading = true;
  error: string | null = null;
  
  constructor(private route: ActivatedRoute,private api: ApiService,private sanitizer: DomSanitizer, private router:Router,private cdr: ChangeDetectorRef) { }

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'No movie ID found in URL';
      this.isLoading = false;
      return;
    }

    this.api.getMovieById(Number(id)).subscribe({
      next: (data) => {
        this.movie = data;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.video_url);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.error = `Failed to load video — ${err.status}: ${err.statusText}`;
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      }
    });
  }
  goBack() { window.history.back(); }
}
