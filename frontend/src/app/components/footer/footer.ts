import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly footerColumns = [
    ['Audio Description', 'Help Center', 'Gift Cards', 'Media Center'],
    ['Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'],
    ['Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
  ];
}
