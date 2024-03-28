import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { EventListComponent } from './components/event-list/event-list.component';

@Component({
  selector: 'togetherapp-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SearchBarComponent, CategoryListComponent, EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
