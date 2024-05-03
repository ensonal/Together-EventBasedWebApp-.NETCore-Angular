import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateNewEventComponent } from '../create-new-event/create-new-event.component';
import { MatDialog } from '@angular/material/dialog';
import { EventCardComponent } from '../components/event-card/event-card.component';


@Component({
  selector: 'togetherapp-my-events-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, EventCardComponent],
  templateUrl: './my-events-home.component.html',
  styleUrl: './my-events-home.component.scss',
})
export class MyEventsHomeComponent {
  constructor(public dialog: MatDialog) { }
  
  openAddEventDialog() {
    const dialogRef = this.dialog.open(CreateNewEventComponent, {
      width: '750px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
