import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'togetherapp-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {}
