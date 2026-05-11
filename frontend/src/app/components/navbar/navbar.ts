import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  @Input() showSearch = false;
  @Input() searchQuery = '';
  @Input() userInitial = 'U';
  @Output() searchQueryChange = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSearchInput(event: Event) {
    this.searchQueryChange.emit((event.target as HTMLInputElement).value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
