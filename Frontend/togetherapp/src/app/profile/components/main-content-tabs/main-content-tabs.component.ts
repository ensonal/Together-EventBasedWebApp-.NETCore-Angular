import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MySportsComponent } from '../../../my-sports/my-sports-home/my-sports.component';
import { MyEventsHomeComponent } from 'src/app/my-events/my-events-home/my-events-home.component';

@Component({
  selector: 'togetherapp-main-content-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatDividerModule, MySportsComponent, MyEventsHomeComponent],
  templateUrl: './main-content-tabs.component.html',
  styleUrl: './main-content-tabs.component.scss',
})
export class MainContentTabsComponent {}
