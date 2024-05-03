import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'togetherapp-equipment-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.scss',
})
export class EquipmentCardComponent implements OnInit {
  @Input() header: string | undefined;
  @Input() description: string | undefined;
  @Input() icon: string | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log('EquipmentCardComponent initialized');
  }


  deleteEquipment() {
    console.log('Delete equipment');
  }
}
