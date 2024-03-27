import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'togetherapp-create-new-event',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDatepickerModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDividerModule],
  templateUrl: './create-new-event.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create-new-event.component.scss',
})
export class CreateNewEventComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateNewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { any: string },
  ) { }

  onCancelDialog(): void {
    this.dialogRef.close();
  }

  addEvent() {
    this.dialogRef.close();
  }
}
