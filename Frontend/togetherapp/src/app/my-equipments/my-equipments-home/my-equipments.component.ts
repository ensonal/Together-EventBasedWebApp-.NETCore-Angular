import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddMyEquipmentsComponent } from '../add-my-equipments/add-my-equipments.components';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentCardComponent } from '../components/equipment-card.component';

@Component({
  selector: 'togetherapp-my-equipments',
  standalone: true,
  imports: [CommonModule, EquipmentCardComponent, MatButtonModule],
  templateUrl: './my-equipments.component.html',
  styleUrl: './my-equipments.component.scss',
})
export class MyEquipmentsComponent {
  constructor(public dialog: MatDialog) { }

  openAddEquipmentDialog() {
    const dialogRef = this.dialog.open(AddMyEquipmentsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
