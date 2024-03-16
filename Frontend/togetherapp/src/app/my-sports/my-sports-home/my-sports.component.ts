import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportCardComponent } from '../components/sport-card/sport-card.component';
import { MatButtonModule } from '@angular/material/button';
import { AddMySportsComponent } from '../add-my-sports/add-my-sports.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'togetherapp-my-sports',
  standalone: true,
  imports: [CommonModule, SportCardComponent, MatButtonModule],
  templateUrl: './my-sports.component.html',
  styleUrl: './my-sports.component.scss',
})
export class MySportsComponent {
  constructor(public dialog: MatDialog) { }

  openAddSportDialog() {
    const dialogRef = this.dialog.open(AddMySportsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
