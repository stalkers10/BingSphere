import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute,private api: ApiService,private sanitizer: DomSanitizer) { }
  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id');
    // You'll need to add a getMovieById(id) method to your ApiService
    this.api.getMovieById(Number(id)).subscribe(data => {
      this.movie = data;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.video_url);
    });
  }
  goBack() { window.history.back(); }
}
