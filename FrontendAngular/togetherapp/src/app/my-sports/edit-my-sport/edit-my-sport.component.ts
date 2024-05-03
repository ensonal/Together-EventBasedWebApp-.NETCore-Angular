import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'togetherapp-edit-my-sport',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDividerModule],
  templateUrl: './edit-my-sport.component.html',
  styleUrl: './edit-my-sport.component.scss',
})
export class EditMySportComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMySportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { any: string },
  ) { }

  onCancelDialog(): void {
    this.dialogRef.close();
  }

  saveSport() {
    this.dialogRef.close();
  }
}
