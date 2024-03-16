import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'togetherapp-my-events-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './my-events-home.component.html',
  styleUrl: './my-events-home.component.scss',
})
export class MyEventsHomeComponent {
  
  openAddEventDialog() {
    console.log('openAddEventDialog');
  }
}
