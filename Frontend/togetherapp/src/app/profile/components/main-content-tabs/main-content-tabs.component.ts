import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MySportsComponent } from '../../../my-sports/my-sports-home/my-sports.component';


@Component({
  selector: 'togetherapp-main-content-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatDividerModule, MySportsComponent],
  templateUrl: './main-content-tabs.component.html',
  styleUrl: './main-content-tabs.component.scss',
})
export class MainContentTabsComponent {}
