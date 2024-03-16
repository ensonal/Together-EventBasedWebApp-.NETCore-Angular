import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditMySportComponent } from '../../edit-my-sport/edit-my-sport.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'togetherapp-sport-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './sport-card.component.html',
  styleUrl: './sport-card.component.scss',
})
export class SportCardComponent implements OnInit {
  @Input() header: string | undefined;
  @Input() description: string | undefined;
  @Input() icon: string | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log('SportCardComponent initialized');
  }

  openEditSportDialog() {
    const dialogRef = this.dialog.open(EditMySportComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteSport() {
    console.log('Delete sport');
  }
}
