import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'togetherapp-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryListComponent {}
