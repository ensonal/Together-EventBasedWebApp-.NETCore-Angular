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
  selector: 'togetherapp-add-my-equipments',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDividerModule],
  templateUrl: './add-my-equipments.component.html',
  styleUrl: './add-my-equipments.component.scss',
})
export class AddMyEquipmentsComponent {
  selectedFile: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  
  constructor(
    public dialogRef: MatDialogRef<AddMyEquipmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { any: string },
    
  ) {
    
   }

  onCancelDialog(): void {
    this.dialogRef.close();
  }

  addEquipment() {
    this.dialogRef.close();
  }
  
  
}
