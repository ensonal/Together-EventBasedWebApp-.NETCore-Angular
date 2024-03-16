import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSideCardComponent } from '../components/user-side-card/user-side-card.component';
import { MainContentTabsComponent } from '../components/main-content-tabs/main-content-tabs.component';


@Component({
  selector: 'togetherapp-profile',
  standalone: true,
  imports: [CommonModule, UserSideCardComponent, MainContentTabsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent { }
