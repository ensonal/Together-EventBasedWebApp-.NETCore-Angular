import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'togetherapp-user-side-card',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatCardModule, MatIconModule],
  templateUrl: './user-side-card.component.html',
  styleUrl: './user-side-card.component.scss',
})
export class UserSideCardComponent {}
